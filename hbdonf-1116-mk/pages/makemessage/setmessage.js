import { useRouter } from 'next/router';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* color:red */
`;

export default function Setmessage() {
  const router = useRouter();
  const { level } = router.query;
  return (
    <Wrapper>
      <h1>말풍선 선택, 메세지 작성</h1>
      <p> level : {level}</p>
    </Wrapper>
  )
}
