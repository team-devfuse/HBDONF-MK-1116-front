import styled from "styled-components";

const Wrapper = styled.ul`
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:1rem;

    li{
        height:3rem;
        opacity: 0.2;
        transition: opacity 0.2s ease-in-out;

        img{
            height:100%;
        }

        &:last-child{
            height: 4rem;
        }

        &:nth-child(-n+${props => props.level}){
            opacity: 1;
        }
    }
`;

export default function LevelArea({level}){
    return (
        <Wrapper level={level}>
            <li><img src="/assets/image/bubble/01_default.svg"/></li>
            <li><img src="/assets/image/bubble/02_sobbing.svg"/></li>
            <li><img src="/assets/image/bubble/03_heart.svg"/></li>
            <li><img src="/assets/image/bubble/04_cat.svg"/></li>
            <li><img src="/assets/image/bubble/05_scream.svg"/></li>
        </Wrapper>
    );
}