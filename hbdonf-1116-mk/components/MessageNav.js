import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router";


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
    const router = useRouter();
    const { t } = useTranslation('common');
    const allStep = 4;
    const progPercent = (step / allStep) * 100;

    return (
        <Wrapper>
            <div className="btn-area">
                <button onClick={()=>{router.back()}}>&lt; {t("soriziller.이전 단계로")}</button>
            </div>
            <div className="prog-area">
                <p style={{"width":`${progPercent}%`}}></p>
            </div>
        </Wrapper>
    );
}