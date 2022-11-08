import { useRouter } from 'next/router';
import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import MessageBubble from '../../components/MessageBubble';
import MessageNav from '../../components/MessageNav';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { API_URL } from '../../lib/config';
import * as gtag from "../../lib/gtag";


const Wrapper = styled.div`
  padding-top: var(--page-padding-top);

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
      overflow: hidden;
      white-space:nowrap;
      text-overflow: ellipsis;
    }
  
    .swipe-area{
      width:100%;
      
      .bubble-box{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-big);
        font-weight: 600;
      }
  
      .swiper{
        padding-bottom: 5rem;
  
        .swiper-wrapper{
          align-items: center;
        }
  
        .swiper-button-next:after, .swiper-rtl .swiper-button-prev:after,
        .swiper-button-prev:after, .swiper-rtl .swiper-button-next:after{
          color:var(--color-point);
        }
      }
    }
  
    &>.btn-area{
      width:100%;
      padding: 4rem 0;
      text-align: center;
    }
  }

`;

export default function SetBubble() {
  const { t } = useTranslation('common');
  const {fbaseInfo} = useContext(AuthContext);
  const router = useRouter();
  const { bubbleLevel } = router.query;

  const complete = () => {
    // alert("complete");
    const textarea = document.getElementsByTagName("textarea");
    // alert(textarea[0].value);

    const data = {
      "uid": fbaseInfo.uid,
      "content": textarea[0].value,
      "level": bubbleLevel
    };

    fetch(`${API_URL}/message`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization:fbaseInfo?.accessToken
      },
      body: JSON.stringify(data)
    }).then(() => {
      //6. GA이벤트 날리기
      const gaValue = { 
        action :"soriziller",
        category : "event",
        label :"end"
      };
      
      gtag.event(gaValue);

      localStorage.setItem("userInfo", JSON.stringify(data));
      router.push("/mypage");
    });
  };


  return (
    <Wrapper>
      <div className='inner center-content'>
        <MessageNav backPath="/makemessage/soriziller" step={3}/>
        <div className='txt-area'>
          {t("set_messagebubble.말풍선을 선택해주세요.")}
        </div>
        <div className='write-area'>
          <MessageBubble size={45} writemode={true} level={bubbleLevel}/>
        </div>
        <div className='btn-area'>
          <button className='default-btn' onClick={complete}>
            {t("soriziller.완성")}
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