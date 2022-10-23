import { useContext} from "react";
import { AuthContext } from "../context/auth-context";
import styled from "styled-components";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Wrapper = styled.div`
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2{
    padding-bottom: 5rem;
    font-size: var(--font-size-huge);
  }

  .login-overlay{
    position: fixed;
    width:100%;
    height: 100%;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    backdrop-filter:blur(5px);
    font-size: var(--font-size-bigger);
  }
`;

export default function loginPage(){
  const { t } = useTranslation('common');
  const {SocialLogin, loginPopupOpend} = useContext(AuthContext);

  return (
    <Wrapper className="center-content">
      <h2>{t("login.로그인 / 회원가입")}</h2>
      <button
        className="default-btn"
        onClick={SocialLogin}
        name="twitter"
      >
        {t("login.트위터로 로그인 / 회원가입")}
      </button>
      {
        loginPopupOpend && <p className="login-overlay">{t("login.팝업 로그인 중입니다.")}</p>
      }
    </Wrapper>
  );
}

export async function getServerSideProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    },
  };
}