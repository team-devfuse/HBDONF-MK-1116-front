import { useRouter } from 'next/router';
import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import MessageBubble from '../../components/MessageBubble';
import MessageNav from '../../components/MessageNav';
import { bubble_info } from '../../lib/bubble_info';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState } from 'react';


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
  const router = useRouter();
  const { level } = router.query;
  const [bubbleLevel, setBubbleLevel] = useState();

  const nextStep = () => {
    router.push({
      pathname: '/makemessage/write_message',
      query: { bubbleLevel: bubbleLevel },
    })
  };


  return (
    <Wrapper>
      <div className='inner center-content'>
        <MessageNav backPath="/makemessage/soriziller" step={2}/>
        <div className='txt-area'>
          {t("set_messagebubble.말풍선을 선택해주세요.")}
        </div>
        <div className='swipe-area'>
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            pagination={{clickable:true}}
            navigation
            >
              {
                bubble_info?.map((item, index) => {
                  if(item.level <= level){
                    return (
                      <SwiperSlide key={index}>
                        <div className='bubble-box'>
                          <MessageBubble size={45} level={item.level} text={t(`set_messagebubble.${item.title}`)}/>
                        </div>
                      </SwiperSlide>
                    );
                  }
                })
              }
              
            </Swiper>
        </div>
        <div className='btn-area'>
          <button className='default-btn' onClick={nextStep}>
            {t("soriziller.다음 단계로")}
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