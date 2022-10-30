import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading';
import MusicBar from '../components/MusicBar';
import WorkBtn from '../components/WorkBtn';
import Marquee from "react-marquee-slider";
import times from "lodash/times";
import MessageBubble from '../components/MessageBubble';
import { Sticker } from '../components/Stickers';
import Link from 'next/link';
import { useAuth } from '../context/auth-context';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { API_URL } from '../lib/config';


const Wrapper = styled.div`
  overflow: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  /* scroll-padding: 0rem; */
  height: 100vh;

  section{
    min-height: 100vh;
    scroll-snap-align:start;

    .inner{
      width: 90%;
      height: 100%;
    }
  }


  /** 개별영역 style */
  .section-main-visual{
    height:100vh;

    .inner{
      width:100%;
      position: relative;

      img{
        position: absolute;
        left:0;
        bottom:0;
        transform: translateY(20%);
        width:100%;
      }
    }

    video{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .section-message{
    scroll-snap-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222222;
    background-size: 100%;
    min-height: unset;
    position: relative;
    
    &:after{
      content: "";
      display: block;
      width: 100%;
      height: 20rem;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateY(100%);
      background: url("/assets/image/bg_ripped_paper_02.png") no-repeat center top;
      background-size: 100%;
    }

    .stickers{
      position: absolute;
      width:100%;
      height: 100%;

      &>div{
        position: absolute;
      }

      .white-circle{
        right:10%;
        top:-10%;
        transform: rotate(-15deg);
      }
      
      .soriziller{
        width:25%;
        top:20%;
        left:-2rem;
      }
      
      .text-marquee{
        bottom:-20%;
        right: -10%;
        transform: rotate(-10deg);
        -webkit-mask-image: linear-gradient(-140deg, #000 30%, transparent 61%);
        z-index: 1;
      }
    }

    .inner{
      width:100%;
      /* height:80vh; */
      padding-top: 5rem;
      z-index: 2;

      &>div>div{
        display: flex;
        align-items: center;
      }

      &>div>div>div:nth-child(2n){
        align-self: flex-start;
        
        .box{
          transition-duration: 0.6s;
        }
      }
      
      &>div>div>div:nth-child(3n){
        align-self: flex-end;
      }

      .box{
        padding: 0 2rem;
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.3s ease-in-out;
      }

      .btn-area{
        padding-top:5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:1.2rem;
      }
    }
    
    &.on{
      .box{        
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  .section-mk-work{
    scroll-snap-align:top;
    min-height: unset;
    padding:30rem 0 20rem;

    .inner{
      display: flex;
      justify-content: space-between;
      max-width: 1920px;

      .img-area{
        padding-top: 5rem;
        width:40%;
        opacity: 0;
        transform: translateY(10%);
        transition: all 0.5s ease-in-out;
        position: relative;

        .txt{
          position: absolute;
          right:50%;
          top:28%;
          transform: translateX(110%);
          font-weight: 600;
          animation: txtAttention 1s ease-in-out alternate infinite;
        }

        @keyframes txtAttention {
          0%{ opacity: 1;}
          100%{ opacity: 0.5;}
        }
      }

      .info-area{
        width:55%;

        .tab-menu{
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap:2%;

          li{
            flex-grow: 1;
            text-align: center;
            opacity: 0;
            transform: translateY(-10%);
            transition: all 0.2s ease-in-out;
            
            button{
              display: block;
              width:100%;
              height: 4rem;
              border: 1px solid var(--color-point);
              color: var(--color-point);
              border-radius: 5rem;
              font-weight: 800;
            }

            &:nth-child(2){
              transition-delay: 0.1s;
            }

            &:nth-child(3){
              transition-delay: 0.2s;
            }

            &:nth-child(4){
              transition-delay: 0.3s;
            }
          }

          .selected{
            button{
              color:var(--color-light);
              border-color:var(--color-light);
            }
          }
        }

        .work-list{
          padding-top: 4rem;
          display: flex;
          flex-wrap: wrap;
          gap:1rem;

          li{
            width:calc((100% - 3rem) / 4);
            opacity: 0;
            transform: translateY(-5%);
            transition: all 0.2s ease-in-out;
            
          }
        }
      }
    }

    &.on{
      .img-area{
        opacity: 1;
        transform: translateY(0);
      }
      
      .info-area{
        .tab-menu{
          li{
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .work-list{
          li{
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
  }

  @media all and (max-width: 1023px) {
    /** 개별영역 style */
    .section-mk-work{
      .inner{
        flex-direction: column;
        align-items: center;

        .img-area{
          width:100vw;

          .txt{
            font-size: 2vw;
            right:50%;
            top:72%;
            transform: translateX(90%);
          }
        }

        .info-area{
          width:100%;
          padding-top: 2rem;

          .work-list{
            li{
              width:calc((100% - 3rem) / 3);   
            }
          }
        }
      }
    }
  }
`;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [mkWork, setMkWork] = useState();
  const [mkWorkCate, setMkWorkCate] = useState("composed");
  const [musicData, setMusicData] = useState();
  const [scrollY, setScrollY] = useState();
  const [section2Top, setSection2Top] = useState();
  const [section3Top, setSection3Top] = useState();
  const {isMobile, getIsMobile} = useAuth();
  const { t } = useTranslation('common');

  const listener = e => {
    const wrapper = document.getElementById("wrapper");
    setScrollY(wrapper.scrollTop);
  };
  
  const getScrollTop = () => {
    const vh = parseInt(document.querySelector("body").clientHeight / 100);
    const padding = 200;
    const section1Height = document.querySelector(".section-main-visual").clientHeight;
    const section2Height = document.querySelector(".section-message").clientHeight;
    setSection2Top(section1Height - padding);
    setSection3Top(section1Height + section2Height - padding);
  };
  
  useEffect(() => {
    if(!loading){
      const wrapper = document.getElementById("wrapper");
      wrapper.addEventListener("scroll", listener);
  
      getScrollTop();
      getIsMobile();
      window.addEventListener("resize", getScrollTop);
      window.addEventListener('resize', getIsMobile);
      
      return () => {
        wrapper.removeEventListener("scroll", listener);
        window.removeEventListener("resize", getScrollTop);
        window.removeEventListener('resize', getIsMobile);
      };
    }
  });

  useEffect(() => {
    const getMessage = async () => {
      const result = await (
        await fetch(`${API_URL}/message?size=12`)
      ).json();
  
      // console.log(result);
      setMessage(result);
    };

    const getMkWork = async () => {
      const result = await (
        await fetch('/api/mk_work')
      ).json();
  
      setMkWork(result);
    };

    getMessage();
    getMkWork();
    setLoading(false);
  }, []);

  return (
    loading ? <Loading/> :
    <Wrapper id="wrapper">
      <section className='section-main-visual'>
        <h2 className='hide'>main visual</h2>
        <div className='inner'>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/image/bg_main_visual_poster.png"
          >
            <source
              src="/assets/video/vid_main_visual.mp4"
              type="video/mp4"
            />
          </video>
          <img src="/assets/image/bg_ripped_paper_01.png" alt=""/>
        </div>
      </section>
      <section className={`section-message ${scrollY > section2Top && scrollY < section3Top ? "on" : ""}`}>
        <h2 className='hide'>메세지 영역</h2>
        <div className='stickers'>
          <Sticker.WhiteCircle/>
          <Sticker.Sorilziller/>
          <Sticker.TextMarquee/>
        </div>
        <div className='inner'>
          <Marquee velocity={isMobile ? 10 : 40} resetAfterTries={100}>
            {times(message?.length, Number).map((id, index) => {
              let size;

              if(message){
                if(message[id]?.level < 5){
                  size=45;
                } else{
                  size=60;
                }
              }

              return (
                message &&
                <div className='box'>
                  <MessageBubble key={index} size={size} level={message[id]?.level} text={message[id]?.content} />
                </div>
              );
            })}
          </Marquee>
          <div className='btn-area'>
            <Link href="/makemessage">
              <a className='default-btn'>{t('message.생일 축하 메세지 남기러 가기')}</a>
            </Link>
            <Link href="/allmessage">
              <a className='txt-btn'>{t('message.모든 메세지 보러가기')}</a>
            </Link>
          </div>
        </div>
      </section>
      <section className={`section-mk-work ${scrollY > section3Top ? "on" : ""}`}>
        <h2 className='hide'>민균이 천재 자랑영역</h2>
        <div className='inner center-content'>
          <div className='img-area'>
            <picture>
              <source media="(min-width: 1024px)"
              srcSet="/assets/image/img_who_is_mk_pc.png 769w,
              assets/image/img_who_is_mk_pc@2x.png 1538w,
              assets/image/img_who_is_mk_pc@3x.png 2307w"/>
              <source media="(max-width: 1023px)"
              srcSet="/assets/image/img_who_is_mk_m.png 360w,
              assets/image/img_who_is_mk_m@2x.png 720w,
              assets/image/img_who_is_mk_m@3x.png 1080w"/>
              <img 
              src="/assets/image/img_who_is_mk_pc@3x.png" alt="who_is_mk"/>
            </picture>
            <p className='txt'>Click and Play!</p>
          </div>
          <div className='info-area'>
            <ul className='tab-menu'>
              <li className={mkWorkCate === "composed" ? "selected" : ""}>
                <button onClick={() => {setMkWorkCate("composed");}}>Composed</button>
              </li>
              <li className={mkWorkCate === "lyrics" ? "selected" : ""}>
                <button onClick={() => {setMkWorkCate("lyrics");}}>Lyrics</button>
              </li>
              <li className={mkWorkCate === "cover" ? "selected" : ""}>
                <button onClick={() => {setMkWorkCate("cover");}}>Cover</button>
              </li>
              <li className={mkWorkCate === "featuring" ? "selected" : ""}>
                <button onClick={() => {setMkWorkCate("featuring");}}>Featuring</button>
              </li>
            </ul>
            <ul className='work-list'>
              {
                mkWork?.map((item, index) => {
                  if(item.category.indexOf(mkWorkCate) > -1){
                    return(
                      <li key={index}>
                        <WorkBtn data={item} onclick={setMusicData}/>
                      </li>
                    )
                  }
                })
              }
            </ul>

          </div>
        </div>
      </section>
      {
        musicData && 
          <MusicBar data={musicData} onclick={setMusicData}/>
      }
    </Wrapper>
  )
}

export async function getServerSideProps({locale}) {
  console.log(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    },
  };
}