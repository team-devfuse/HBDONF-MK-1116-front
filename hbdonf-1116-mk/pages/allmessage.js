import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading';
import MessageBubble from '../components/MessageBubble';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'


const Wrapper = styled.div`
  /* color:red */
  .section-main-visial{
    background-color: #ccc;
    width:100%;
    height: 80vh;
    display: flex;
    align-items: end;


    .inner{
      padding-bottom: 2rem;
      font-size: 10rem;
    }
  }
`;

export default function Allmessage() {
  const { t } = useTranslation('common');
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  
  const getMessage = useCallback(async () => {
    const result = await (
      await fetch(`/api/message?page=${page}`)
    ).json();

    setMessage(result.message);
    setLastPage(result.last);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getMessage();
  }, [getMessage]);
  
  const loadMore = () => {
    if (!loading && page < lastPage) {
      setPage((prevState) => prevState + 1);
    }
  };

  return (
    loading ? <Loading/> :
    <Wrapper>
      <section className='section-main-visial'>
        <h2 className='hide'>모든 메세지</h2>
        <div className='inner center-content'>
          yoyo<br/>
          {t("all_messages.메세지안내1")} nnn{t("all_messages.메세지안내2")}
        </div>
      </section>
      <section className='section-message-list'>
        <h2 className='hide'>메세지 리스트</h2>
        <ul className='center-content'>
          {
            message?.map((data, index) => (
              <li key={index}>
                <MessageBubble key={index} size={50} level={data.level} text={data.text} />
                {index}
              </li>
            ))
          }
          {/* <li ref={ref}>Element {inView.toString()} / {page}/{lastPage}</li> */}
          <li><button onClick={loadMore}>{t("all_messages.더 보기")} {page}/{lastPage}</button></li>
        </ul>
      </section>
    </Wrapper>
  )
}

export async function getServerSideProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    },
  };
}