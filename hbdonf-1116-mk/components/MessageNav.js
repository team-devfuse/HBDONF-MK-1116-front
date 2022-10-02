import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    
    .btn-area{
        text-align: left;
        padding-bottom: 1rem;
    }

    .prog-area{
        width:100%;
        height: 0.5rem;
        background-color: var(--color-light);
        
        p{
            height: 100%;
            background-color: var(--color-point);
        }
    }
`;

export default function MessageNav({step, backPath}){
    const allStep = 3;
    const progPercent = (step / allStep) * 100;

    return (
        <Wrapper>
            <div className="btn-area">
                <Link href={backPath}>
                    &lt; 이전단계로
                </Link>
            </div>
            <div className="prog-area">
                <p style={{"width":`${progPercent}%`}}></p>
            </div>
        </Wrapper>
    );
}