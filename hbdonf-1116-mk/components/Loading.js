import styled from "styled-components";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const StyledLoading = styled.div`
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:var(--color-point);
  font-size: var(--font-size-max);
  font-weight: 600;
  font-family: Michroma, sans-serif !important;
  /* font-weight: 600; */

  .inner{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .sticker{
    position: absolute;
    top:3%;
    
    p{
      position: relative;

      img{
        width:20rem;
      }
      
      img:last-child{
        position: absolute;
        left:0;
        top:0;
        animation: loadingImg 2s ease-in-out infinite both;
      }
    }
    
    p:nth-child(2){
      margin-top: -12%;
      img:last-child{
        animation-delay: 0.3s;
      }
    }
    
    p:nth-child(3){
      margin-top: -12%;
      img:last-child{
        animation-delay: 0.7s;
      }
    }
    
  }

  .img{
    padding-top: 13rem;

    img{
      max-width:25rem;
      border-radius: 50%;
    }
  }

  .txt{
    padding-top: 3rem;
  }

  .txt::after{
    content:"";
    padding-left: 1rem;
    animation: loadingDots 1.5s ease-in-out infinite;
  }

  @keyframes loadingImg {
    0%{opacity:1};
    10%{opacity:0};
    90%{opacity:0};
    100%{opacity:1};
  }

  @keyframes loadingDots {
    0%{content:""};
    33%{content:"."};
    66%{content:". ."};
    100%{content:". . ."};
  }
`;

export default function Loading(){
  const randomNumber = Math.floor((Math.random() * 4) + 1);
  const imagePath = `/assets/image/system/loading_${randomNumber}.png`;

    return (
        <StyledLoading>
          <div className="inner">
            <div className="sticker">
              <p>
                <img src="/assets/image/sticker/skrr_off.svg" alt=""/>
                <img src="/assets/image/sticker/skrr_on.svg" alt=""/>
              </p>
              <p>
                <img src="/assets/image/sticker/skrr_off.svg" alt=""/>
                <img src="/assets/image/sticker/skrr_on.svg" alt=""/>
              </p>
              <p>
                <img src="/assets/image/sticker/skrr_off.svg" alt=""/>
                <img src="/assets/image/sticker/skrr_on.svg" alt=""/>
              </p>
            </div>
            <div className="img">
              <img src={imagePath} alt={imagePath}/>
            </div>
            <p className="txt">Loading</p>
          </div>
        </StyledLoading>
    );
}

export async function getServerSideProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    },
  };
}