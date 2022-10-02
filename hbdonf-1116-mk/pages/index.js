import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MusicBar from '../components/MusicBar';
import WorkBtn from '../components/WorkBtn';

const Wrapper = styled.div`
  /* color:red */

  section{
    min-height: 100vh;
    outline: 1px solid floralwhite;

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
    }

    video{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .section-mk-work{
    display: flex;
    align-items: center;
    img{width:100%;}

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
  const [mkWork, setMkWork] = useState();
  const [mkWorkCate, setMkWorkCate] = useState("composed");
  const [musicData, setMusicData] = useState();

  useEffect(() => {
    const getMkWork = async () => {
      const result = await (
        await fetch('/api/mk_work')
      ).json();
  
      setMkWork(result);
      console.log(result);
    };

    getMkWork();

  }, []);

  return (
    <Wrapper>
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
        </div>
      </section>
      <section className='section-message'>
        <h2>메세지 영역</h2>
        <div className='inner center-content'></div>
      </section>
      <section className='section-mk-work'>
        <h2 className='hide'>민균이 천재 자랑영역</h2>
        <div className='inner center-content'>
          <div className='img-area'>
            <picture>
              <source media="(min-width: 1024px)"
              srcset="assets/image/img_who_is_mk_pc.png 769w,
              assets/image/img_who_is_mk_pc@2x.png 1538w,
              assets/image/img_who_is_mk_pc@3x.png 2307w"/>
              <source media="(max-width: 1023px)"
              srcset="assets/image/img_who_is_mk_m.png 360w,
              assets/image/img_who_is_mk_m@2x.png 720w,
              assets/image/img_who_is_mk_m@3x.png 1080w"/>
              <img 
              src="assets/image/img_who_is_mk_pc@3x.png" alt="who_is_mk"/>
            </picture>
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
