import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/fbase";
import { onAuthStateChanged } from "firebase/auth";
import { setPersistence, browserLocalPersistence, signInWithPopup, signInWithRedirect, TwitterAuthProvider, signOut} from "firebase/auth";
import { API_URL } from "../lib/config";
import { getUserRegion } from "../lib/util";
import * as gtag from "../lib/gtag";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export const AuthContext = createContext(null);

function AuthProvider (props){
    const router = useRouter();
    const [fbaseInfo, setFbaseInfo] = useState();
    const [loginPopupOpend, setLoginPopupOpend] = useState(false);
    const [isMobile, setIsMobile] = useState();

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
                "uid": user.uid,
                "tid": user.reloadUserInfo.screenName,
                "region": getUserRegion(),
                "tnickName": userdisplayName
            };
    
            if(user){
                // 1. 로그인 POST
                fetch(`${API_URL}/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(authInfo)
                })

                // 2. 메세지 유무 확인해 로컬에 추가
                fetch(`${API_URL}/message/user/${user.uid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:user.accessToken
                    },
                  }).then((response) => response.json())
                  .then((data) => {
                    // console.log(data);
                    if(data.payload.messageId){
                        localStorage.setItem("userInfo", JSON.stringify(data.payload));
                        router.push("/mypage");
                    } else {
                        router.push("/makemessage");
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
            router.push("/");
            localStorage.clear();
            console.log("logout");

            //6. GA이벤트 날리기
            const gaValue = { 
                action :"logout",
                category : "user",
                label :"logout"
            };
            
            gtag.event(gaValue);
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });          
    };

    // 세션에서 userInfo 꺼내쓰기
    const getLocalStorage = () => {
        if (typeof window !== 'undefined') {
            const localInfo = localStorage.getItem("userInfo");
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

    // 로그인-비로그인 상태 감지해 리디렉
    // if(getLocalStorage()){
    //     // 로그인 시 막을 페이지
    //     if(props.path=="/login"){
    //         router.push("/mypage");
    //     }
    // } else {
    //     // 비로그인 시 막을 페이지
    //     if(props.path.includes("makemessage/") || props.path.includes("mypage")){
    //         if(typeof window != "undefined"){
    //             // alert("로그인이 필요합니다");
    //             router.push("/login");
    //         }
    //     }
    // }

    // 모바일 쿼리 체크
    const getIsMobile = () => {
        const winW = window.innerWidth;
    
        if (winW < 1024) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            SocialLogin,
            Logout,
            getLocalStorage,
            fbaseInfo,
            loginPopupOpend,
            isMobile,
            getIsMobile
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error(`\`useAuth\` must be used within a \`<AuthProvider />\``);
    }
  
    return context;
}

export default AuthProvider;