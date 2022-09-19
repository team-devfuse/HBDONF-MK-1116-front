import styled from "styled-components";

const StyledLoading = styled.div`
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-big);
  font-family: 'PyeongChangPeace', sans-serif;
  /* font-weight: 600; */

  .txt::after{
    content:"";
    padding-left: 1rem;
    animation: loadingDots 2s ease-in-out infinite;
  }

  @keyframes loadingDots {
    0%{content:""};
    33%{content:"."};
    66%{content:". ."};
    100%{content:". . ."};
  }
`;

export default function Loading(){
    return (
        <StyledLoading>
          <p className="txt">Loading</p>
        </StyledLoading>
    );
}