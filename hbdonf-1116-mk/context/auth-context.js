import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/fbase";
import { onAuthStateChanged } from "firebase/auth";
import { setPersistence, browserLocalPersistence, signInWithPopup, signInWithRedirect, TwitterAuthProvider, signOut} from "firebase/auth";
import { API_URL } from "../lib/config";
import { getUserRegion } from "../lib/util";
import * as gtag from "../lib/gtag";

export const AuthContext = createContext(null);

function AuthProvider (props){
    const router = useRouter();
    const [fbaseInfo, setFbaseInfo] = useState();
    const [loginPopupOpend, setLoginPopupOpend] = useState(false);

    const SocialLogin = async(event) => {
        const {target:{name}} = event;

        setLoginPopupOpend(true);
    
        // 1. 로그인 방식 선택
        let provider;
        if(name === "twitter"){
            provider = new TwitterAuthProvider();
        }
    
        // 2. 로그인 팝업
        setPersistence(auth, browserLocalPersistence)
        .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.

            const user = result.user;
            let userProfileImg;
            let userdisplayName;
            
            // 3. DB에 유저 등록 / 업데이트
            if (user !== null) {
                user.providerData.forEach((profile) => {
                    userProfileImg = profile.photoURL;
                    userdisplayName = profile.displayName;
                });
            }
    
            const authInfo = {
                "method": name,
                "nickName": userdisplayName,
                "region": getUserRegion(),
                "uid": user.uid,
                "userId": user.reloadUserInfo.screenName
            };
    
            if(user){
                fetch(`${API_URL}/user/profile`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(authInfo)
                }).then((response) => response.json())
                .then((data) => {      
                    // 4. 세션은 loggedIn 체크, 단관용타이틀, 프로필 사진 넣어두는 용도!
                    const userInfo = {
                        loggedIn: true,
                        user: {
                            uid: data.payload.uid,
                            login_type: user.providerId,
                            nickname: data.payload.nickName,
                            profile_pic: userProfileImg,
                            titlename: data.payload.title
                        }
                    };
    
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
            
                    // 5. returnUrl 있으면 해당 위치, 없으면 대시보드로 이동
                    if(router.query.returnUrl){
                        router.push(router.query.returnUrl);
                    } else{
                        router.push("/dashboard");
                    }

                    //6. GA이벤트 날리기
                    const gaValue = { 
                        action :"login",
                        category : "user",
                        label :"login"
                    };

                    gtag.event(gaValue);
                });
            }        
    
            }).catch((error) => {
                // Handle Errors here
                console.log(error);
                setLoginPopupOpend(false);

                if (error.code === "auth/user-disabled"){
                    alert("관리자에 의해 사용 중지된 계정입니다.");
                }
            });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        
    };

    const Logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.clear();
            router.reload();
            router.push("/");

            //6. GA이벤트 날리기
            const gaValue = { 
                action :"logout",
                category : "user",
                label :"logout"
            };
            
            gtag.event(gaValue);
        }).catch((error) => {
            // An error happened.
        });          
    };

    // 세션에서 userInfo 꺼내쓰기
    const getLocalStorage = () => {
        if (typeof window !== 'undefined') {
            const localInfo = localStorage.getItem("userInfo", JSON.stringify(userInfo));
            const userInfo = JSON.parse(localInfo);
    
            return userInfo;
        }
        return false;
    };

    // firebase에서 auth 감지    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setFbaseInfo(user);
        } else {
            // User is signed out
            fbaseInfo && setFbaseInfo();
        }
    });

    return (
        <AuthContext.Provider value={{
            SocialLogin,
            Logout,
            getLocalStorage,
            fbaseInfo,
            loginPopupOpend
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;