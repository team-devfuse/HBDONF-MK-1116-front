import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MusicBar from '../components/MusicBar';
import WorkBtn from '../components/WorkBtn';
import Marquee from "react-marquee-slider";
import times from "lodash/times";
import MessageBubble from '../components/MessageBubble';
import AOS from "aos";
import "aos/dist/aos.css";


const Wrapper = styled.div`
  section{
    min-height: 100vh;

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
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("assets/image/bg_ripped_paper.png") no-repeat center bottom;
    background-size: 100%;

    .inner{
      width:100%;
      height:90vh;

      &>div>div{
        display: flex;
        align-items: center;
      }

      &>div>div>div:nth-child(2n){
        align-self: flex-start;
      }

      &>div>div>div:nth-child(3n){
        align-self: flex-end;
      }
    }
  }

  .section-mk-work{
    min-height: unset;
    padding:10rem 0 20rem;

    .inner{
      outline: 1px solid red;
      display: flex;
      justify-content: space-between;

      .img-area{
        width:40%;
      }

      .info-area{
        outline: 1px solid blue;
        width:55%;

        .tab-menu{
          outline: 1px solid gold;
          width: 100%;
          display: flex;
          justify-content: space-between;

          .selected{
            button{
              color:red;
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

        .img-area, .info-area{
          width:100%;
        }
      }
    }
  }
`;

export default function Home() {
  const [message, setMessage] = useState();
  const [mkWork, setMkWork] = useState();
  const [mkWorkCate, setMkWorkCate] = useState("composed");
  const [musicData, setMusicData] = useState();
  const [scrollY, setScrollY] = useState();
  const [scrollIsUp, setScrollIsUp] = useState("none");
  const [bodyBottom, setBodyBottom] = useState();
  const [section2Top, setSection2Top] = useState();
  const [section3Top, setSection3Top] = useState();
  const [eventDoing, setEventDoing] = useState(false);
  const [pageNow, setPageNow] = useState(1);


  /** 스크롤 액션 */
  const scrollListener = () => {
    const bodyOffset = document.body.getBoundingClientRect();
    // setScrollY(-bodyOffset.top);
    setScrollY((prev) => {
      if(prev > -bodyOffset.top){
        setScrollIsUp("up");
      } else if (prev < -bodyOffset.top){
        setScrollIsUp("down");
      }
      
      return(-bodyOffset.top);
    });

    setTimeout(() => {
      setScrollIsUp("none");
      setEventDoing(false);
    }, 1000);
  };

  const getSectionTop = () => {
    if (document) {
      const section2= document.querySelector('.section-message');
      const section3= document.querySelector('.section-mk-work');
      setSection2Top(section2?.offsetTop);
      setSection3Top(section3?.offsetTop);
      setBodyBottom(document.body.offsetHeight);
    }
  };

  useEffect(() => {
    getSectionTop();
    window.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', getSectionTop);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', getSectionTop);
    };
  }, []); 

  // 스크롤 시 자동이동
  const scrollMove = (moveTo) => {
    setEventDoing(true);
    window.scrollTo({
      top: moveTo,
      left: 0,
      behavior:"smooth"
    });
  }; 


  useEffect(() => {
    if(scrollIsUp === "none"){
      setEventDoing(false);
    }

    if(pageNow == 1 && scrollIsUp === "down"){
      // 1페이지에서 내릴 시 2페이지로 이동
      console.log("1페이지에서 내릴 시 2페이지로 이동");
      !eventDoing && scrollMove(section2Top);
      !eventDoing && setPageNow(2);
      
      // setEventDoing(false);
    } else if(pageNow == 2){
      if(scrollIsUp=="up"){
        // 2페이지에서 올릴 때 1페이지로 이동
        console.log("2페이지에서 올릴 때 1페이지로 이동");
        !eventDoing && scrollMove(0);
        !eventDoing && setPageNow(1);
      } else if(scrollIsUp === "down"){
        // 2페이지에서 내릴 때 3페이지로 이동
        console.log("2페이지에서 내릴 때 3페이지로 이동");
        !eventDoing && scrollMove(bodyBottom);
        !eventDoing && setPageNow(3);
      }
    } else if(pageNow == 3 && scrollIsUp=="up"){
        // 3페이지에서 올릴 때 2페이지로 이동
        console.log("3페이지에서 올릴 때 2페이지로 이동");
        !eventDoing && scrollMove(section2Top);
        !eventDoing && setPageNow(2);
    }
  }, [scrollY]);

  /** 데이터 받아오기 */
  useEffect(() => {
    const getMessage = async () => {
      const result = await (
        await fetch('/api/message')
      ).json();
  
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

    AOS.init();
  }, []);

  return (
    <Wrapper>
      <h1 style={{"position":"fixed","zIndex":"100"}}>
        scrollY : {scrollY} / pageNow : {pageNow}<br/>
        {scrollIsUp} / {eventDoing ? "eventDoing" : "not eventDoing"}
      </h1>
      <section className='section-main-visual'>
        <h2 className='hide'>main visual</h2>
        <div className='inner'>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="assets/image/bg_main_visual_poster.png"
          >
            <source
              src="assets/video/vid_main_visual.mp4"
              type="video/mp4"
            />
          </video>
          <img src="assets/image/bg_ripped_paper.png" alt=""/>
        </div>
      </section>
      <section className='section-message'>
        <h2 className='hide'>메세지 영역</h2>
        <div className='inner'>
          <Marquee velocity={40} resetAfterTries={100}>
            {times(7, Number).map((id, index) => {
              return (
                message &&
                <div data-aos="fade-up" data-aos-duration="1000">
                  <MessageBubble key={index} level={message[id]?.level} text={message[id]?.text} />
                </div>
              );
            })}
          </Marquee>
        </div>
      </section>
      <section className='section-mk-work'>
        <h2 className='hide'>민균이 천재 자랑영역</h2>
        <div className='inner center-content'>
          <div className='img-area' data-aos="fade-up" data-aos-offset="100" data-aos-duration="1200">
            <picture>
              <source media="(min-width: 1024px)"
              srcSet="assets/image/img_who_is_mk_pc.png 769w,
              assets/image/img_who_is_mk_pc@2x.png 1538w,
              assets/image/img_who_is_mk_pc@3x.png 2307w"/>
              <source media="(max-width: 1023px)"
              srcSet="assets/image/img_who_is_mk_m.png 360w,
              assets/image/img_who_is_mk_m@2x.png 720w,
              assets/image/img_who_is_mk_m@3x.png 1080w"/>
              <img 
              src="assets/image/img_who_is_mk_pc@3x.png" alt="who_is_mk"/>
            </picture>
          </div>
          <div className='info-area' data-aos="fade-up" data-aos-offset="300" data-aos-duration="1200">
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
