import { useRouter } from 'next/router';
import styled from 'styled-components';
import MessageBubble from '../../components/MessageBubble';
import MessageNav from '../../components/MessageNav';
import { bubble_info } from '../../lib/bubble_info';

const Wrapper = styled.div`
  padding-top: 6rem;

  .inner{
    max-width: 720px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

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
`;

export default function Setmessage() {
  const router = useRouter();
  // const { level } = router.query;
  const level  = 5;
  return (
    <Wrapper>
      <div className='inner center-content'>
        <MessageNav backPath="/makemessage/soriziller" step={2}/>
        <div className='txt-area'>
          말풍선을 선택해주세요.
        </div>
        <div className='swipe-area'>
          {level}
          <ul>
            {
              bubble_info?.map((item, index) => {
                if(item.level <= level){
                  return (
                    <li key={index}>
                      <MessageBubble data={item} text={item.title}/>
                    </li>
                  );
                }
              })
            }
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}
