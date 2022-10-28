import styled from "styled-components";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'


const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .img{
        img{
            max-width:25rem;
            border-radius: 50%;
        }
    }

    .txt{
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 2;

        b{
            display: block;
            font-size: var(--font-size-max);
            font-weight: 400;
            font-family: Michroma, sans-serif !important;
            color:var(--color-point);
        }
    }
`;

export default function Custom404() {
    const { t } = useTranslation('common');
    const randomNumber = Math.floor((Math.random() * 8) + 1);
    const imagePath = `/assets/image/system/404_${randomNumber}.png`;

    return (
        <Wrapper>
            <div className="inner center-content">
                <p className="img">
                    <img src={imagePath} alt={imagePath}/>
                </p>
                <p className="txt">
                    <b>404 ERROR</b>
                    <span>{t("error")}</span>
                </p>
            </div>
        </Wrapper>
    );
}

export const getStaticProps = async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
    }
  }