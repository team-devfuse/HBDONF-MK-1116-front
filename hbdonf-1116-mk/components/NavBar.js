import Link from "next/link";
import {useRouter} from "next/router"
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { Logo } from "./Icons";
import NavToggleBtn from "./NavToggleBtn";

const StyledNav = styled.nav`
    width:100%;
    height:6rem;
    position:fixed;
    z-index:11;
    transition: background 0.2s ease-in-out;
    ${props => {
        if(props.scrollY>10){
            return(`
                background-color: rgba(13,6,39,0.95);
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
        width:8rem;
        font-family: 'PyeongChangPeace', sans-serif;
        cursor: pointer;
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

const PcNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;


    ul{
        display: flex;
    }

    li a{
        transition: color .2s ease-in-out;
    }

    li:hover a,
    li:focus a{
        color:#81a3f9;
    }
    
    .main-menu li{
        padding-right: 2rem;
    }

    .main-menu li a{
        font-size: var(--font-size-big);
        font-weight: 600;
    }

    .main-menu li:first-child{
        padding-right: 4rem;
    }

    .user-menu li{
        padding-left: 2rem;
    }

    .user-menu li .default-btn{
        height:3rem;
        background-color: var(--color-light-30);
    }
    
    .user-menu li .default-btn:hover,
    .user-menu li .default-btn:focus{
        filter:none;
        background-color: var(--color-light-50);
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
    background-color: rgba(13,6,39,0.95);
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    transition: transform .4s ease-in-out;
    
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

    .main-menu li a{
        font-size: var(--font-size-big);
        font-weight: 600;
    }
`;


export default function NavBar(){
    const router = useRouter();
    const {fbaseInfo, Logout, getLocalStorage} = useContext(AuthContext);
    let [scrollY, setScrollY] = useState();
    let [isMobile, setIsMobile] = useState();
    let [isOpened, setIsOpened] = useState(false);

    const listener = e => {
        const bodyOffset = document.body.getBoundingClientRect();
        setScrollY(-bodyOffset.top);
    };
    
    useEffect(() => {
        getIsMobile();

        window.addEventListener("scroll", listener);

        window.onresize = (e) => {
            getIsMobile();
        };

        return () => {
            window.removeEventListener("scroll", listener);
        };
    });

    const getIsMobile = () => {
        const winW = window.innerWidth;
        
        if(winW<1024){
            setIsMobile(true);
        } else{
            setIsMobile(false);
            setIsOpened(false);
        }
    };

    const toggleNavMenu = () => {
        isOpened ? setIsOpened(false) : setIsOpened(true);
    };


    return (
        <StyledNav scrollY={scrollY} >
            {
                isMobile ?
                <MobileNav>
                    <h1>
                        <span className="hide">VMGO</span>
                        <Link href={getLocalStorage() ? "/dashboard" : "/"}>
                            <a title="VMGO"><Logo/></a>
                        </Link>
                    </h1>
                    <MobileNavBtn opened={isOpened}>
                        <button onClick={toggleNavMenu} aria-label="gnb button">
                            {/* {isOpened ? "X" : "="} */}
                            <NavToggleBtn isOpened={isOpened}/>
                        </button>
                    </MobileNavBtn>
                    <MobileNavLayer opened={isOpened}>
                        <ul className="main-menu">
                            {
                                getLocalStorage() &&
                                <li>
                                    <Link href={getLocalStorage() ? "/dashboard" : "/"}>
                                        <a onClick={toggleNavMenu} className={router.pathname === ("/" && "/dashboard") ? "active" : ""}>대시보드</a>
                                    </Link>
                                </li>
                            }
                            <li>
                                <Link href="/challenge">
                                    <a onClick={toggleNavMenu} className={router.pathname === "/challenge" ? "active" : ""}>챌린지</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/group_watching">
                                    <a onClick={toggleNavMenu} className={router.pathname === "/group_watching" ? "active" : ""}>단관</a>
                                </Link>
                            </li>
                        </ul>
                        <ul className="user-menu">
                            <li>
                                {
                                    getLocalStorage() ?
                                    <button className="default-btn" onClick={() => {Logout(); toggleNavMenu();}}>로그아웃</button> :
                                    <button className="default-btn" onClick={() => {router.push("/login"); toggleNavMenu();}}>로그인</button>
                                }
                            </li>
                        </ul>                  
                    </MobileNavLayer>
                </MobileNav> :
                <PcNav className="center-content">
                    <ul className="main-menu">
                        <li>
                            <h1>
                                <span className="hide">VMGO</span>
                                <Link href={getLocalStorage() ? "/dashboard" : "/"}>
                                    <a className={router.pathname === ("/" && "/dashboard") ? "active" : ""} title="VMGO">
                                        <Logo/>
                                        {/* {fbaseInfo?.displayName} */}
                                    </a>
                                </Link>
                            </h1>
                        </li>
                        {
                            getLocalStorage() &&
                            <li>
                                <Link href={getLocalStorage() ? "/dashboard" : "/"}>
                                    <a className={router.pathname === ("/" && "/dashboard") ? "active" : ""}>대시보드</a>
                                </Link>
                            </li>
                        }
                        <li>
                            <Link href="/challenge">
                                <a className={router.pathname === "/challenge" ? "active" : ""}>챌린지</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/group_watching">
                                <a className={router.pathname === "/group_watching" ? "active" : ""}>단관</a>
                            </Link>
                        </li>
                    </ul>
                    <ul className="user-menu">
                        <li>
                            {
                                getLocalStorage() ?
                                <button className="default-btn" onClick={Logout}>로그아웃</button> :
                                <button className="default-btn" onClick={() => {router.push("/login");}}>로그인</button>
                            }
                        </li>
                    </ul>                   
                </PcNav>
            }
            
        </StyledNav>
    );
}