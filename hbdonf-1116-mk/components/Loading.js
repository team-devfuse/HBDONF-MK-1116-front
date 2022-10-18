import styled from "styled-components";

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
    top:0;
    
    p{
      position: relative;

      img{
        width:24rem;
      }
      
      img:last-child{
        position: absolute;
        left:0;
        top:0;
        animation: loadingImg 2s ease-in-out infinite both;
      }
    }
    
    p:nth-child(2){
      margin-top: -15%;
      img:last-child{
        animation-delay: 0.3s;
      }
    }
    
    p:nth-child(3){
      margin-top: -15%;
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
    return (
        <StyledLoading>
          <div className="inner">
            <div className="sticker">
              <p>
                <img src="assets/image/sticker/skrr_off.png" alt=""/>
                <img src="assets/image/sticker/skrr_on.png" alt=""/>
              </p>
              <p>
                <img src="assets/image/sticker/skrr_off.png" alt=""/>
                <img src="assets/image/sticker/skrr_on.png" alt=""/>
              </p>
              <p>
                <img src="assets/image/sticker/skrr_off.png" alt=""/>
                <img src="assets/image/sticker/skrr_on.png" alt=""/>
              </p>
            </div>
            <div className="img">
              <img src="assets/image/bg_level_3.png" alt=""/>
            </div>
            <p className="txt">Loading</p>
          </div>
        </StyledLoading>
    );
}