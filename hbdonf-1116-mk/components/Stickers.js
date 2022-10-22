import styled from "styled-components";

const StyledSticker = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width:${props => props.size};
    height:${props => props.size};
    ${props => props.margin}
    @import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');

    svg{
        width:100%;
        height:100%;
        object-fit: contain;
    }

    &.white-circle{
        position: relative;

        .line{
            position: absolute;
            left:0;
            top:0;
            animation: rotate360 10s linear infinite;
        }
    }

    &.text-marquee {
        font-family: Michroma, sans-serif !important;
        color:var(--color-point);
        position: relative;
        flex-direction: column;
        overflow: hidden;
        --offset: 0vw;
        --move-initial: calc(0% + var(--offset));
        --move-final: calc(-20% + var(--offset));

        .marquee-inner {
            width: fit-content;
            display: flex;
            position: relative;
            transform: translate3d(var(--move-initial), 0, 0);
            animation: marquee 15s linear infinite;
            animation-play-state: running;
            
            span {
                flex-shrink: 0;
                font-size: 2vw;
                padding: 0 1vw;

                &:first-child{
                    /* background-color: red; */
                }
            }
            
            &:nth-child(even){
                transform: rotateY(90deg);
                animation: marquee-reverse 15s linear infinite;
            }
        }
    }

    @keyframes marquee {
        0% {
            transform: translate3d(var(--move-initial), 0, 0);
        }

        100% {
            transform: translate3d(var(--move-final), 0, 0);
        }
    }

    @keyframes marquee-reverse {
        0% {
            transform: translate3d(calc(var(--move-final)), 0, 0);
        }

        100% {
            transform: translate3d(calc(var(--move-initial)), 0, 0);
        }
    }

    @keyframes rotate360 {
        0%{transform:rotate(0deg);};
        100%{transform:rotate(360deg);};
    }
`;

const WhiteCircle = () => {
    return (
        <StyledSticker className="white-circle">
            <img className="center" src="/assets/image/sticker/white_circle_center.png" alt=""/>
            <img className="line" src="/assets/image/sticker/white_circle_line.png" alt=""/>
        </StyledSticker>
    )
};

const Sorilziller = () => {
    return (
        <StyledSticker className="soriziller">
            <img src="/assets/image/sticker/soriziller_type_line.png" alt=""/>
        </StyledSticker>
    )
};

const SorilzillerYoyo = () => {
    return (
        <StyledSticker className="soriziller-yoyo">
            <img src="/assets/image/sticker/soriziller_type_yoyo_fill.png" alt=""/>
        </StyledSticker>
    )
};

const TextMarquee = () => {
    return (
        <StyledSticker className="text-marquee">
            <div className="marquee-inner" aria-hidden="true">
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
            </div>
            <div className="marquee-inner" aria-hidden="true">
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
            </div>
            <div className="marquee-inner" aria-hidden="true">
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
                <span>My Cat Is Rockstar</span>
            </div>
        </StyledSticker>
    )
};


export const Sticker = {
    WhiteCircle,
    Sorilziller,
    SorilzillerYoyo,
    TextMarquee
};