import { useEffect, useState } from 'react';
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
  
  useEffect(() => {
    const getMessage = async () => {
      const result = await (
        await fetch('/api/message')
      ).json();
  
      setMessage(result);
    };

    getMessage();
  }, []);

  console.log(message);

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
                <MessageBubble key={index} level={data.level} text={data.text} />
              </li>
            ))
          }
        </ul>
      </section>
    </Wrapper>
  )
}
