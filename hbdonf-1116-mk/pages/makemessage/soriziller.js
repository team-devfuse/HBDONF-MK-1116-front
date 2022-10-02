import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MessageNav from '../../components/MessageNav';
import AudioProg from '../../components/AudioProg';
import LevelArea from '../../components/LevelArea';

const Wrapper = styled.div`
  padding-top: 6rem;
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
  const [volume, setVolume] = useState();
  const [level, setLevel] = useState(0);
  const [time, setTime] = useState(100);
  const [isMobile, setIsMobile] = useState();

  const nextStep = () => {
    router.push({
      pathname: '/makemessage/setmessage',
      query: { level: level },
    })
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
        const mic_confirm = confirm("마이크를 사용할 수 없습니다. 일반 모드로 이동하시겠습니까?");

        if(mic_confirm){
          nextStep();
        }
      });

    /** 시간 카운트다운*/
    const counter = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  }, []);

  /** 볼륨에 따라 레벨 세팅 */
  useEffect(() => {
    if(volume >= 0 && volume <= 30){level<1 && setLevel(1)} // 1
    else if(volume >= 31 && volume <= 60){level<2 && setLevel(2)} // 2
    else if(volume >= 61 && volume <= 90){level<3 && setLevel(3)} // 3
    else if(volume >= 91 && volume <= 120){level<4 && setLevel(4)} // 4
    else if(volume >= 121 && volume <= 150){level<5 && setLevel(5)} // 5
  }, [volume]);
  
  /** 모바일 여부에 따라 prog-circle width 설정 */
  useEffect(() => {
    getIsMobile();

    window.onresize = (e) => {
        getIsMobile();
    };
  });

  const getIsMobile = () => {
    const winW = window.innerWidth;
    
    if(winW<1024){
        setIsMobile(true);
    } else{
        setIsMobile(false);
    }
  };
  
  return (
    <Wrapper>
      <div className='inner center-content'>
        <MessageNav backPath="/makemessage" step={1}/>
        <div className='txt-area'>
          {time}초 동안 소리를 질러 말풍선을 획득해주세요
          <p>remain time : {time} / volume : {volume} / level : {level}</p>
        </div>
        <AudioProg width={isMobile ? 300 : 400} volume={volume}/>
        <div className='level-area'>
          <LevelArea level={level}/>
        </div>
        <div className='btn-area'>
          <button className='default-btn' onClick={nextStep}>
            다음
          </button>
        </div>
      </div>
    </Wrapper>
  )
}
