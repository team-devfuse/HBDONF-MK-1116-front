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
        background-color: red;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default function AudioProg({width, volume}){
    const maxVolume = 150;
    const percent = parseInt((volume / maxVolume) * 100);
    const strokeWidth= 35;
    var CIRCUMFERENCE = 2 * Math.PI * (width-strokeWidth) / 2;
    var progress = percent / 100;
    var dashoffset = CIRCUMFERENCE * (1 - progress);

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
            <div className="guide-area" style={{"width":`${width-100}px`, "height":`${width-100}px`}}>
                test
            </div>
        </Wrapper>
    );
}