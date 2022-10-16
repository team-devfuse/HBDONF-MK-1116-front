import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import MessageBubble from '../components/MessageBubble';


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
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  
  const getMessage = useCallback(async () => {
    setLoading(true);
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
    <Wrapper>
      <section className='section-main-visial'>
        <h2 className='hide'>모든 메세지</h2>
        <div className='inner center-content'>
          yoyo<br/>
          MK에게 총 nnn개의 메세지가 도착했어요!
        </div>
      </section>
      <section className='section-message-list'>
        <h2>메세지 리스트</h2>
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
          <li><button onClick={loadMore}>더보기~~ {page}/{lastPage}</button></li>
        </ul>
      </section>
    </Wrapper>
  )
}
