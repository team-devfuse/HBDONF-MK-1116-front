import styled from "styled-components";
const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .img{
        img{
            max-width:25rem;
            border-radius: 50%;
        }
    }

    .txt{
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 2;

        b{
            display: block;
            font-size: var(--font-size-max);
            font-weight: 400;
            font-family: Michroma, sans-serif !important;
            color:var(--color-point);
        }
    }
`;

export default function Custom404() {
    // TO DO : 랜덤이미지 추가 필요
    const randomNumber = Math.floor((Math.random() * 32) + 1);
    const imagePath = `/images/404/${randomNumber}.webp`;

    return (
        <Wrapper>
            <div className="inner center-content">
                <p className="img">
                    <img src="/assets/image/bg_level_3.png" alt=""/>
                </p>
                <p className="txt">
                    <b>404 ERROR</b>
                    <span>여기는 아무것도 없어요옹~</span>
                </p>
            </div>
        </Wrapper>
    );
}