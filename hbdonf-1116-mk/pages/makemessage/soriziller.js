import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  /* color:red */
  padding-top: 6rem;
`;

export default function Soriziller() {
  const router = useRouter();
  const [volume, setVolume] = useState();
  const [level, setLevel] = useState(0);
  const [time, setTime] = useState(100);

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
  
  return (
    <Wrapper>
      <h1>소리질러모드</h1>
      <h2>remain time : {time}</h2>
      <p>volume : {volume}</p>
      <p>level : {level}</p>
        <div class="svg-test">
          <svg xmlns="http://www.w3.org/2000/svg" width="366" height="366" viewBox="0 0 366 366" fill="none">
          </svg>
          <svg class="prog1" xmlns="http://www.w3.org/2000/svg" width="366" height="366" viewBox="0 0 366 366" fill="none">
            <defs>
              <mask id="mask1">
                <rect width="366" height="366" fill="#000"/>
                <circle cx="183" cy="183" r="165.5" stroke="#fff" stroke-width="35" stroke-dasharray="600" stroke-dashoffset="600"/>
              </mask>
            </defs>
            <circle mask="url(#mask1)" cx="183" cy="183" r="165.5" stroke="#303030" stroke-width="35" stroke-dasharray="10 10"/>
           </svg>
        </div>
      <button className='default-btn' onClick={nextStep}>
        다음
      </button>
    </Wrapper>
  )
}
