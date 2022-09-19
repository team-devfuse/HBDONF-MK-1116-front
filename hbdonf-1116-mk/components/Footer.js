import Link from "next/link";
import styled from "styled-components";


const StyledFooter = styled.footer`
  .center-content{
    max-width:unset;
    padding: 5rem 0;
    color: var(--color-light-50);
    border-top: 1px solid var(--color-light-30);
    line-height: 1.5;
  }

  p, a {
    font-size: var(--font-size-small);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  
  a {
    color: var(--color-light-70);
    text-decoration: underline;
  }

  p{
    padding-bottom: 1rem;

    &:last-child{
      padding-bottom: 0;
    }
  }

  .team-name{
    color: var(--color-light-70);
    font-size: var(--font-size-default);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  
  .contact-us{
    li{
      display: inline-block;
      font-size: var(--font-size-small);
    }

    i{
      font-style: normal;
      padding:0 .5rem; 
    }

    a{
      color: var(--color-light-50);
      text-decoration: none;
    }
  }
`;

export default function Footer(){
    return (
        <StyledFooter>
            <div className="center-content">
                <p className="team-name">
                    ⓒ 2022. Team Devfuse&nbsp;&nbsp;
                    
                </p>
                <p>
                  View Must Go On (VMGO)은 비영리 목적으로 제작된 팬사이트입니다.<br/>사이트 내 링크, 임베딩 된 모든 영상 컨텐츠에 대한 권리는 해당 서비스에 있습니다.
                </p>
                {/* <p>
                    <Link href="https://www.vlive.tv">
                        <a className="txt-btn" title="V LIVE 바로가기" target="_blank">V LIVE</a>
                    </Link>
                </p> */}
                <ul className="contact-us">
                  <li>
                    <Link href="https://www.notion.so/VMGO-d153bf6a22e54427b5c5b761ef863dd4">
                      <a className="txt-btn" title="FAQ" target="_blank">
                        About
                      </a>
                    </Link>
                    <i>|</i>
                  </li>
                  <li>
                    Email : team.devfuse@gmail.com <i>|</i> 
                  </li>
                  <li>
                    Twitter :&nbsp;
                    <Link href="https://twitter.com/Team_Devfuse">
                      <a className="txt-btn" title="트위터 바로가기" target="_blank">
                        @Team_Devfuse
                      </a>
                    </Link>
                  </li>
                </ul>
            </div>
        </StyledFooter>
    );
}