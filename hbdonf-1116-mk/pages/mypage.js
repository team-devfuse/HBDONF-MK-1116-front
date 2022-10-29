import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Loading from '../components/Loading';
import MessageBubble from '../components/MessageBubble';
import { shareTwitter, shareFacebook, shareLink } from "../lib/util";
import { Icon } from '../components/Icons';
import Link from 'next/link';
import { API_URL } from '../lib/config';
import { AuthContext } from '../context/auth-context';

const Wrapper = styled.div`
  /* color:red */
  padding: var(--page-padding-default);

  .inner{
    padding-top: 3rem;
    text-align: center;
    max-width: 530px;

    h2{
      font-size: var(--font-size-big);
      font-weight: 400;
    }

    .wrap-my-message{
      padding: 5rem 0;
      height: 50vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &.empty{
        justify-content: center;

        .empty-area{
          font-size: var(--font-size-big);
          font-weight: 600;
        }
      }

      .section-my-message{
        .user-info{
          padding-bottom: 2rem;
          text-align: right;
          display: flex;
          justify-content: space-between;

          b{
            color:var(--color-point);
            font-weight: 400;
          }
        }
      }


      .section-share{
        button{
          margin:0 1rem;
        }
      }
    }

    .section-btn-area{
      display: flex;
      gap:2rem;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

export default function mepage() {
  const { t } = useTranslation('common');
  const {fbaseInfo} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [mymessage, setMymessage] = useState();
  const [shareUrl, setShareUrl] = useState();


  useEffect(()=>{
    if(fbaseInfo){
      fetch(`${API_URL}/message/user/${fbaseInfo?.uid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if(data.messageId){
          setMymessage(data);
        }
        setLoading(false);
    
        const thisLink = document.location.hostname;
        setShareUrl(thisLink);
      });
    }
  },[fbaseInfo]);

  const deleteMessage = () => {
    if(confirm("삭제한 메세지는 복구할 수 없어요. 그래도 삭제하시겠어요?")){
      alert("삭제~");
      fetch(`${API_URL}/message/${mymessage.messageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      }).then(()=>{
        setMymessage();
      });
    } else {
      alert("노삭제~");
    }
  };

  return ( loading ? <Loading/> :
    <Wrapper>
      <div className='inner center-content'>
        <h2>{t("mypage.내 말풍선 확인하기")}</h2>
        <div className={`wrap-my-message ${mymessage ? "" : "empty"}`}>
          {
            mymessage ?
            <>
              <div className='section-my-message'>
                <p className='user-info'>
                  <b>@{mymessage?.tid}</b>
                  <span>{mymessage?.date}</span>
                </p>
                <MessageBubble size={40} level={mymessage?.level} text={mymessage?.content} />
              </div>
              <div className='section-share'>
                <button type="button" onClick={() => {shareTwitter(t("mypage.트윗공유안내문구"), shareUrl);}}>
                    <Icon.TwitterLogo size="3rem"/>
                </button>
                <button type="button" onClick={() => {shareFacebook(shareUrl);}}>
                    <Icon.FacebookLogo size="3rem"/>
                </button>
                <button type="button" onClick={() => {shareLink(t("mypage.클립보드안내문구"), shareUrl);}}>
                    <Icon.LinkLogo size="3rem"/>
                </button>
              </div>
            </> :
            <p className='empty-area'>{t("mypage.빈칸안내")}</p>
          }
        </div>
        <div className='section-btn-area'>
          {
            mymessage ?
            <button className='default-btn' onClick={deleteMessage}>{t("mypage.말풍선 삭제하기")}</button> :
            <Link href="/makemessage">
              <a className='default-btn'>{t("mypage.말풍선 남기러 가기")}</a>
            </Link>
          }
          <Link href="/allmessage">
            <a className='default-btn sub-btn'>{t("mypage.모든 말풍선 보러가기")}</a>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps({locale}) {
  console.log(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    },
  };
}