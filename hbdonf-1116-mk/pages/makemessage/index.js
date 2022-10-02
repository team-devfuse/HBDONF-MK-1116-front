import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  /* color:red */
`;

export default function Magemessage() {

  return (
    <Wrapper>
      <h1>메세지 생성</h1>
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
    </Wrapper>
  )
}
