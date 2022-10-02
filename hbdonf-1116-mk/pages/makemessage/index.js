import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  padding-top: 6rem;
  text-align: center;
  height: calc(100vh - 6rem);

  .inner{
    max-width: 720px;
    height: 100%;
    padding:4rem 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .txt-top{
      font-size: var(--font-size-big);
      font-weight: 600;
    }

    .img-area{
      padding: 2rem 0;
      height: 55vh;

      img{
        height: 100%;
        object-fit: contain;
      }
    }

    .btn-area{
      display: flex;
      gap:1rem;
    }
  }

`;

export default function Magemessage() {

  return (
    <Wrapper>
      <div className='inner center-content'>
        <div className='txt-top'>
          소리질러 모드로 진행하시겠어요?<br/>
          다양한 말풍선을 얻을 수 있습니다.
        </div>
        <div className='img-area'>
          <img
            srcSet={`
              assets/image/img_makemessage.png 420w,
              assets/image/img_makemessage@2x.png 840w,
              assets/image/img_makemessage@3x.png 1259w
            `}
            src={`assets/image/img_makemessage.png`}
            alt=""
          />
        </div>
        <div className='btn-area'>
          <Link href="/makemessage/soriziller">
            <a className='default-btn'>
              소리질러모드
            </a>
          </Link>
          <Link href="/makemessage/setmessage">
              <a className='default-btn sub-btn'>
                조용모드
              </a>
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}
