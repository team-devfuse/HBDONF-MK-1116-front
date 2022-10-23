import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading';
import MessageBubble from '../components/MessageBubble';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useAuth } from '../context/auth-context';


const Wrapper = styled.div`
  /* color:red */
  .section-main-visial{
    width:100%;
    height: 100vh;
    display: flex;
    align-items: end;
    position: relative;
    isolation: isolate;
    
    .sticker{
      position: absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      z-index: -1;

      img{
        position: absolute;

        &.tape{
          width:20rem;
          left:10%;
          top:10%;
        }

        &.mk{
          width:50rem;
          right:-10%;
          bottom:0%;
        }

        &.lemon-boy{
          width:20rem;
          top:30%;
          left:-10%;
        }

        &.skrr2{
          width:30rem;
          top:50%;
          right:-10%;
        }

        &.barcode{
          width:20rem;
          top:60%;
          right:0;
        }

        &.shout{
          width:30rem;
          bottom:0;
          right:-10%;
          z-index: 1;
        }
      }

    }

    .inner{
      padding-bottom: 15%;
      font-weight: 400;
      font-size: var(--font-size-max);

      b{
        font-weight:800;
      }
      
      i{
        font-style: normal;
        font-weight:800;
        color:var(--color-point);
      }
    }

    .ripped-paper{
      position: absolute;
      width:100%;
      z-index: -1;
    }
  }

  .section-message-list{
    padding-top: 5rem;
    background-color: #222;

    ul{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }

    li{
      /* display: inline-block; */
      padding-bottom: 4rem;

      .user-info{
        width:100%;
        padding-bottom: 2rem;

        .username{
          color:var(--color-point);
        }
      }
    }

    .load-more{
      width:100%;
      padding-top: 5rem;

      &.sub-btn{
        pointer-events: none;
      }
    }
  }

  @media all and (max-width:460px) {
    .section-message-list{
      ul{
        position: relative;
        
        /* flex-direction: column; */
      }

      li{
        .user-info{
          position: absolute;
          left:0;
        }
      }
    }
  }
`;

export default function Allmessage() {
  const { t } = useTranslation('common');
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const gsapRoot = useRef();
  const {isMobile, getIsMobile} = useAuth();
  gsap.registerPlugin(ScrollTrigger);
  
  const getMessage = useCallback(async () => {
    const result = await (
      await fetch(`/api/message?page=${page}`)
    ).json();

    setMessage(result.message);
    setLastPage(result.last);
    setLoading(false);
  }, [page]);

  useEffect(()=>{
    let ctx = gsap.context(()=>{

      gsap.to(".mk", {
        scrollTrigger: {
          trigger: ".mk",
          scrub:true,
        },
        y: -50
      });

      gsap.to(".shout", {
        scrollTrigger: {
          trigger: ".shout",
          scrub:true,
        },
        y: -100
      });

      gsap.to(".lemon-boy", {
        scrollTrigger: {
          trigger: ".lemon-boy",
          scrub:true,
        },
        y: -150
      });

    },gsapRoot);

    return () => ctx.revert();
  },[loading]);

  useEffect(() => {
    getMessage();
  }, [getMessage]);
  
  const loadMore = () => {
    if (!loading && page < lastPage) {
      setPage((prevState) => prevState + 1);
    }
  };

  /** 모바일 여부에 따라 prog-circle width 설정 */
  useEffect(() => {
    getIsMobile();

    window.onresize = (e) => {
        getIsMobile();
    };
  });

  return (
    loading ? <Loading/> :
    <Wrapper>
      <section ref={gsapRoot} className='section-main-visial'>
        <h2 className='hide'>모든 메세지</h2>
        <div className='sticker'>
          <img className='tape' src="/assets/image/sticker/tape.png"/>
          <img className='mk' src="/assets/image/bg_allmessage_mk.png"/>
          <img className='lemon-boy' src="/assets/image/sticker/lemon_boy.png"/>
          <img className='barcode' src="/assets/image/sticker/barcode.png"/>
          <img className='skrr2' src="/assets/image/sticker/skrr2.png"/>
          <img className='shout' src="/assets/image/sticker/shout.png"/>
        </div>
        <div className='inner center-content'>
          <div className='text'>
            <p dangerouslySetInnerHTML={{
              __html: t("all_messages.메세지안내").replace("nnn","1234"),
            }}/>
          </div>
        </div>
        <img className='ripped-paper' src="/assets/image/bg_ripped_paper_01.png" alt=""/>
      </section>
      <section className='section-message-list'>
        <h2 className='hide'>메세지 리스트</h2>
        <ul className='center-content'>
          {
            message?.map((data, index) => (
              <li key={index}>
                <div className='user-info'>
                  <p className='username'>@twitter</p>
                  <p className='date'>2021/02/01</p>
                </div>
                <MessageBubble key={index} size={isMobile ? 40 : 50} level={data.level} text={data.text} />
              </li>
            ))
          }
          <li className='load-more'>
            <button className={`default-btn ${page == lastPage ? "sub-btn" : ""}`} onClick={loadMore}>
              {
                page == lastPage ?
                <>
                  {page}/{lastPage} {t("all_messages.마지막 페이지입니다.")}
                </> :
                <>
                  {page}/{lastPage} {t("all_messages.더 보기")}
                </>
              }
            </button>
          </li>
        </ul>
      </section>
    </Wrapper>
  )
}

export async function getServerSideProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    },
  };
}