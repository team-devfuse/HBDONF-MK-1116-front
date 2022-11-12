import Link from "next/link";
import {useRouter} from "next/router"
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import NavToggleBtn from "./NavToggleBtn";
import { Icon } from "./Icons";
import { Sticker } from "./Stickers";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher";


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
    width:100%;
    height:100%;
    box-sizing: border-box;
    text-align: center;
    z-index: 10;
    transform: translateX(100%);
    transition: transform .4s ease-in-out;
    pointer-events:fill;
    background: url("/assets/image/bg_default_m.png") no-repeat center center fixed, #222222;
    background-size: cover;
    overflow: hidden;
    
    ${props => {
        if(props.opened){
            return(`
                transform: translateX(0);
            `)
        }
    }};

    .stickers{
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index:-1;

        .white-circle{
            position:absolute;
            left:-7rem;
            top:10%;
            width:25rem;
            transform:rotate(-15deg);
        }

        .soriziller-yoyo{
            position:absolute;
            right:-3rem;
            bottom:10%;
        }
    }

    .menu-area{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        position:relative;

        li{
            display:block;
        }

        .top-menu{
            padding-top:6rem;
    
            a{
                display:inline-block;
            }
    
            svg{
                width:19rem;
            }
    
            .lang{
                padding-top:1rem;
                font-weight:600;
            }
    
            a{
                color:var(--color-light);
            }
            
            .active{
                color:var(--color-point);
            }
        }
    
        .main-menu{
            padding: 3rem 5% 15rem;
            flex-grow:1;
            display:flex;
            flex-direction:column;
    
            ul{
                flex-grow:1;
                display:flex;
                flex-direction:column;
                justify-content:space-evenly;
            }
            li{
                padding-bottom: 2rem;
            }
        
            li a,
            li button{
                font-size: 5rem;
                font-weight: 800;
                transition:all .2s ease-in-out;
                
                &:not(.active){
                    color:rgba(43,43,43,0.5);
                    -webkit-text-stroke: 1px var(--color-point);
                    
                    &:hover{
                        color:var(--color-light-50);
                        -webkit-text-stroke: 1px transparent;
                    }
                }
                
                &.active{
                    color:var(--color-light-70);
                }
            }
            
            .lang{
                padding-top:5rem;

                button{
                    max-width:10rem;
                    height: 4rem;
                    border:1px solid var(--color-point);
                    background-color:#3F3F3F;
                    transition:all 0.2s ease-in-out;
                    font-weight:800;
                    margin-right:1.5rem;

                    &.on{
                        background-color:var(--color-point);
                    }

                    &:last-child{
                        margin-right:0;
                    }
                }
            }
        }

        .bottom-menu{
            position:absolute;
            bottom:0;
            left:0;
            width:100%;
            display:flex;
            align-items:flex-end;
            z-index:-1;

            img{
                height:20rem;
                object-fit:cover;
            }

            p{
                position:absolute;
                left:50%;
                bottom:2rem;
                transform:translateX(-50%);
                font-weight:600;
                color:var(--color-point);
            }
        }
    }
`;


export default function NavBar(){
    const router = useRouter();
    const { t } = useTranslation('common');
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
        <StyledNav scrollY={scrollY} className={router.locale}>
            <MobileNav>
                    <h1>
                        <Link href="/">
                            <a title="HOME" onClick={router.pathname === "/" && (() =>{document.getElementById("wrapper").scrollTo({top: 0, left: 0, behavior: 'smooth'});})}>
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
                        <div className='stickers'>
                            <Sticker.WhiteCircle/>
                            <Sticker.SorilzillerYoyo/>
                        </div>
                        <div className="menu-area">
                            <ul className="top-menu">
                                <li className="home">
                                    <Link href="/">
                                        <a title="HOME"><Icon.LogoCenter/></a>
                                    </Link>
                                </li>
                            </ul>
                            <div className="main-menu">
                                <ul>
                                    {
                                        // 로그인시 노출. 조건 수정 필요
                                        // getLocalStorage() &&
                                        fbaseInfo &&
                                        <li>
                                            <Link href="/mypage">
                                                <a onClick={toggleNavMenu} className={router.pathname === "/mypage" ? "active" : ""}>{t('nav.내 메세지 보러가기')}</a>
                                            </Link>
                                        </li>
                                    }
                                    {/* <li>
                                        <Link href="/makemessage">
                                            <a onClick={toggleNavMenu} className={router.pathname === "/makemessage" ? "active" : ""}>메세지 생성(삭제메뉴)</a>
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link href="/allmessage">
                                            <a onClick={toggleNavMenu} className={router.pathname === "/allmessage" ? "active" : ""}>{t('nav.모든 메세지 보러가기')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        {
                                            fbaseInfo ?
                                            <button onClick={() => {Logout(); toggleNavMenu();}}>{t('nav.로그아웃')}</button> :
                                            <Link href="/login">
                                                <a onClick={toggleNavMenu} className={router.pathname === "/login" ? "active" : ""}>{t('nav.로그인')}</a>
                                            </Link>
                                        }
                                    </li>
                                </ul>
                                <div className="lang">
                                    <button
                                        type="button"
                                        className={`default-btn ${router.locale=="ko" ? "on" : ""}`}
                                        onClick={()=>{
                                            router.push(router.pathname, router.pathname, {locale:"ko"});
                                        }}
                                        >
                                        한글
                                    </button>
                                    <button
                                        type="button"
                                        className={`default-btn ${router.locale=="en" ? "on" : ""}`}
                                        onClick={()=>{
                                            router.push(router.pathname, router.pathname, {locale:"en"});
                                        }}
                                    >
                                        ENG
                                    </button>
                                    <button
                                        type="button"
                                        className={`default-btn ${router.locale=="jp" ? "on" : ""}`}
                                        onClick={()=>{
                                            router.push(router.pathname, router.pathname, {locale:"jp"});
                                        }}
                                    >
                                        日本語
                                    </button>
                                </div>
                            </div>
                            <div className="bottom-menu">
                                <img src="/assets/image/bg_ripped_paper_01.png" alt=""/>
                                <p>contact team.devfuse@gmail.com</p>
                            </div>   
                        </div>
                    </MobileNavLayer>
            </MobileNav>
        </StyledNav>
    );
}


export async function getServerSideProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"]))
      },
    };
  }