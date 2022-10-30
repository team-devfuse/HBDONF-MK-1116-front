import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MessageNav from '../../components/MessageNav';
import AudioProg from '../../components/AudioProg';
import LevelArea from '../../components/LevelArea';
import { useAuth } from '../../context/auth-context';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import * as gtag from "../../lib/gtag";


const Wrapper = styled.div`
  padding-top: var(--page-padding-top);
  text-align: center;
  height: 100%;
  min-height: calc(100vh - 6rem);

  .inner{
    max-width: 720px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .txt-area{
      width: 100%;
      padding: 4rem 0;
      text-align: left;
      font-size: var(--font-size-big);
      font-weight: 600;
    }

    .level-area{
      padding-top: 4rem;
    }

    &>.btn-area{
      width:100%;
      padding: 4rem 0;
    }
  }
`;

export default function Soriziller() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [volume, setVolume] = useState();
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(10);
  const {isMobile, getIsMobile} = useAuth();

  const nextStep = () => {
    router.push({
      pathname: '/makemessage/set_bubble',
      query: { level: level },
    }, '/makemessage/set_bubble');
  };

  /** 기본세팅 : 마이크 볼륨, 카운트다운 세팅 */
  useEffect(() => {
    /** 마이크 볼륨 받아오기 */ 
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
      .then(function(stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
    
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
    
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        scriptProcessor.onaudioprocess = function() {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          const arraySum = array.reduce((a, value) => a + value, 0);
          const average = arraySum / array.length;
          // console.log(Math.round(average));
          setVolume(Math.round(average));
          // colorPids(average);
        };
      })
      .catch(function(err) {
        /* handle the error */
        const mic_confirm = confirm(t("soriziller.마이크 사용불가"));

        if(mic_confirm){
          nextStep();
        }
      });
    
    //6. GA이벤트 날리기
    const gaValue = { 
      action :"soriziller",
      category : "event",
      label :"start"
    };
    
    gtag.event(gaValue);

    /** 시간 카운트다운*/
    const counter = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  }, []);

  /** 시간 만료 시 다음단계로 이동 */
  useEffect(()=>{
    if(time===0){
      nextStep();
    }
  },[time]);

  /** 볼륨에 따라 레벨 세팅 */
  useEffect(() => {
    // 테스트용 레벨 하향
    // if(volume >= 0 && volume <= 50){level<1 && setLevel(1)} // 1
    // else if(volume >= 51 && volume <= 80){level<2 && setLevel(2)} // 2
    // else if(volume >= 81 && volume <= 100){level<3 && setLevel(3)} // 3
    // else if(volume >= 101 && volume <= 110){level<4 && setLevel(4)} // 4
    // else if(volume >= 111 && volume <= 120){level<5 && setLevel(5)} // 5
    if(volume >= 0 && volume <= 80){level<1 && setLevel(1)} // 1
    else if(volume >= 81 && volume <= 90){level<2 && setLevel(2)} // 2
    else if(volume >= 91 && volume <= 100){level<3 && setLevel(3)} // 3
    else if(volume >= 111 && volume <= 120){level<4 && setLevel(4)} // 4
    else if(volume >= 121 && volume <= 130){level<5 && setLevel(5)} // 5
  }, [volume]);
  
  /** 모바일 여부에 따라 prog-circle width 설정 */
  useEffect(() => {
    getIsMobile();

    window.onresize = (e) => {
        getIsMobile();
    };
  });
  
  return (
    <Wrapper>
      <div className='inner center-content'>
        <MessageNav backPath="/makemessage" step={1}/>
        <div className='txt-area'>
          {time}{t("soriziller.말풍선획득안내")}
        </div>
        <AudioProg width={isMobile ? 300 : 400} volume={volume} level={level}/>
        <div className='level-area'>
          <LevelArea level={level}/>
        </div>
        <div className='btn-area'>
          <button className='default-btn' onClick={nextStep}>
            {t("soriziller.다음 단계로")}
          </button>
        </div>
      </div>
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