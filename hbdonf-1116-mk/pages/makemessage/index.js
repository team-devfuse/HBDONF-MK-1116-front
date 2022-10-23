import styled from 'styled-components';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'


const Wrapper = styled.div`
  padding-top: var(--page-padding-top);
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
  const { t } = useTranslation('common');

  return (
    <Wrapper>
      <div className='inner center-content'>
        <div className='txt-top' dangerouslySetInnerHTML={{__html:t("make_message.소리질러 모드로 진행하시겠어요?")}}>
        </div>
        <div className='img-area'>
          <img
            srcSet={`
              /assets/image/img_makemessage.png 420w,
              /assets/image/img_makemessage@2x.png 840w,
              /assets/image/img_makemessage@3x.png 1259w
            `}
            src={`/assets/image/img_makemessage.png`}
            alt=""
          />
        </div>
        <div className='btn-area'>
          <Link href="/makemessage/soriziller">
            <a className='default-btn'>
              {t("make_message.소리질러 모드")}
            </a>
          </Link>
          <Link href="/makemessage/set_bubble?level=1">
              <a className='default-btn sub-btn'>
                {t("make_message.쉿! 조용히 모드")}
              </a>
          </Link>
        </div>
      </div>
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