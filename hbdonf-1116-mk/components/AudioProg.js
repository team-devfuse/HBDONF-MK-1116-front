import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .prog-area{
        transform: rotate(-90deg);
    }

    .guide-area{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .2s ease-in-out;
        overflow: hidden;
        background-image: linear-gradient(to top, rgba(0,0,0,.3) 0%, rgba(0,0,0,.3) 100%), url("/assets/image/bg_level_1.png");
        background-size: cover;
        font-weight: 600;
        font-size: var(--font-size-big);
        text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);

        &::after{
            width:80%;
            padding-top: 30%;
            content: "함성은 꺄악으로 통일할 수 있도록 합니다.";
        }

        .level-message{
            position: absolute;
            width:100%;
            height: 100%;
            padding-bottom: 20%;
            box-sizing: border-box;
            outline: 1px solid gold;
            opacity: 0;

            display: flex;
            align-items: flex-end;
            justify-content: center;
            background-size: cover;
            

            &::after{
                width:60%;
            }
        }
        
        &.level-2 .level-message{
            background-image: linear-gradient(to top, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 100%), url("/assets/image/bg_level_2.png");
            animation: level2 2s ease-in-out;
            
            &::after{
                content: "떨리는 마음 말풍선을 획득했어요!";
            }
        }
        
        &.level-3 .level-message{
            background-image: linear-gradient(to top, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 100%), url("/assets/image/bg_level_3.png");
            animation: level3 2s ease-in-out;
            
            &::after{
                content: "사랑 가득 말풍선을 획득했어요!";
            }
        }
        
        &.level-4 .level-message{
            background-image: linear-gradient(to top, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 100%), url("/assets/image/bg_level_4.png");
            animation: level4 2s ease-in-out;
            
            &::after{
                content: "내 친구 야옹이 말풍선을 획득했어요!";
            }
        }
        
        &.level-5 .level-message{
            background-image: linear-gradient(to top, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 100%), url("/assets/image/bg_level_5.png");
            animation: level5 2s ease-in-out;
            opacity: 1;
            
            &::after{
                content: "1116db 말풍선을 획득했어요!";
                /* opacity: 0; */
                /* animation: level5 2s ease-in-out; */
            }
        }

        @keyframes level2 {
            0%{opacity: 0;}
            20%{opacity: 1;}
            80%{opacity: 1;}
            100%{opacity: 0;}
        }

        @keyframes level3 {
            0%{opacity: 0;}
            20%{opacity: 1;}
            80%{opacity: 1;}
            100%{opacity: 0;}
        }

        @keyframes level4 {
            0%{opacity: 0;}
            20%{opacity: 1;}
            80%{opacity: 1;}
            100%{opacity: 0;}
        }

        @keyframes level5 {
            0%{opacity: 0;}
            20%{opacity: 1;}
        }
    }
`;

export default function AudioProg({width, volume, level}){
    const maxVolume = 150;
    const percent = parseInt((volume / maxVolume) * 100);
    const strokeWidth= 35;
    var CIRCUMFERENCE = 2 * Math.PI * (width-strokeWidth) / 2;
    var progress = percent / 100;
    var dashoffset = CIRCUMFERENCE * (1 - progress);

    // 레벨 메세지 mount 뒤 사라지기
    useEffect(()=>{},[]);

    return (
        <Wrapper>
            <svg class="prog-area" xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox={`0 0 ${width} ${width}`} fill="none">
                <defs>
                    <mask id="mask1">
                        <rect width={width} height={width} fill="#000"/>
                        <circle cx={width/2} cy={width/2} r={(width-strokeWidth)/2} stroke="#fff" stroke-width={strokeWidth} stroke-dasharray={CIRCUMFERENCE} stroke-dashoffset={dashoffset}/>
                    </mask>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#00bc9b" />
                        <stop offset="100%" stop-color="#5eaefd" />
                    </linearGradient>
                </defs>
                <circle className="circle-base" cx={width/2} cy={width/2} r={(width-strokeWidth)/2} stroke="#303030" stroke-width={strokeWidth} stroke-dasharray="10 10"/>
                <circle className="circle-prog" mask="url(#mask1)" cx={width/2} cy={width/2} r={(width-strokeWidth)/2} stroke="url(#gradient)" stroke-width={strokeWidth} stroke-dasharray="10 10"/>
            </svg>
            <div className={`guide-area level-${level}`} style={{"width":`${width-100}px`, "height":`${width-100}px`}}>
                <p className="level-message"></p>
            </div>
        </Wrapper>
    );
}