import Link from "next/link";
import {useRouter} from "next/router"
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import NavToggleBtn from "./NavToggleBtn";
import { Icon } from "./Icons";


const StyledNav = styled.nav`
    width:100%;
    height:10rem;
    position:fixed;
    z-index:11;
    transition: background 0.2s ease-in-out;
    pointer-events: none;
    ${props => {
        if(props.scrollY>10){
            return(`
                background-color: rgba(44,44,44,0.95);
                // backdrop-filter: blur(10px);
            `)
        }
    }};

    .center-content{
        max-width: 1520px;
        height:100%;
        display: flex;
        align-items:center;
        gap:3rem;
    }

    h1{
        width:6rem;
        font-family: 'PyeongChangPeace', sans-serif;
        cursor: pointer;
        pointer-events:fill;
    }

    h1 a{
        display: block;
    }
    
    li{
        display: flex;
        align-items: center;
    }

    a{
        color:var(--color-light);
    }
    
    .active{
        color:var(--color-point);
    }
`;

const MobileNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 5%;
    box-sizing: border-box;
    position: relative;
`;

const MobileNavBtn = styled.div`
    z-index: 11;
    pointer-events:fill;
`;

const MobileNavLayer = styled.div`
    position: fixed;
    right:0;
    top:0;
    width:60%;
    max-width:50rem;
    height:100%;
    padding: 5rem 5%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
    background-color: rgba(44,44,44,0.95);
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    transition: transform .4s ease-in-out;
    pointer-events:fill;
    
    ${props => {
        if(props.opened){
            return(`
                transform: translateX(0);
            `)
        }
    }};

    .main-menu li{
        padding-bottom: 2rem;
    }

    .main-menu li a,
    .main-menu li button{
        font-size: var(--font-size-big);
        font-weight: 600;
    }
`;


export default function NavBar(){
    const router = useRouter();
    const {fbaseInfo, Logout, getLocalStorage} = useContext(AuthContext);
    let [scrollY, setScrollY] = useState();
    let [isOpened, setIsOpened] = useState(false);

    const listener = e => {
        const bodyOffset = document.body.getBoundingClientRect();
        setScrollY(-bodyOffset.top);
    };
    
    useEffect(() => {
        window.addEventListener("scroll", listener);

        return () => {
            window.removeEventListener("scroll", listener);
        };
    });

    const toggleNavMenu = () => {
        isOpened ? setIsOpened(false) : setIsOpened(true);
    };


    return (
        <StyledNav scrollY={scrollY} >
            <MobileNav>
                    <h1>
                        <Link href="/">
                            <a title="HOME">
                                <Icon.Logo/>
                            </a>
                        </Link>
                    </h1>
                    <MobileNavBtn opened={isOpened}>
                        <button onClick={toggleNavMenu} aria-label="gnb button">
                            <NavToggleBtn isOpened={isOpened}/>
                        </button>
                    </MobileNavBtn>
                    <MobileNavLayer opened={isOpened}>
                        <ul className="main-menu">
                            {
                                // 로그인시 노출. 조건 수정 필요
                                // getLocalStorage() &&
                                <li>
                                    <Link href="/mypage">
                                        <a onClick={toggleNavMenu} className={router.pathname === "/mypage" ? "active" : ""}>내 메세지 보러가기(로그인시에만 노출)</a>
                                    </Link>
                                </li>
                            }
                            <li>
                                <Link href="/makemessage">
                                    <a onClick={toggleNavMenu} className={router.pathname === "/makemessage" ? "active" : ""}>메세지 생성(삭제메뉴)</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/allmessage">
                                    <a onClick={toggleNavMenu} className={router.pathname === "/allmessage" ? "active" : ""}>모든 메세지 보러가기</a>
                                </Link>
                            </li>
                            <li>
                                {
                                    getLocalStorage() ?
                                    <button onClick={() => {Logout(); toggleNavMenu();}}>로그아웃</button> :
                                    <button onClick={() => {router.push("/login"); toggleNavMenu();}}>로그인</button>
                                }
                            </li>
                        </ul>
                        <ul className="user-menu">
                            <li>
                                언어세팅 한글 / ENG / 일본어
                            </li>
                            <li>contact dev7fuse@gmail.com</li>
                        </ul>                  
                    </MobileNavLayer>
            </MobileNav>
        </StyledNav>
    );
}