import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from 'next-i18next'


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
    const { t } = useTranslation('common');
    const allStep = 3;
    const progPercent = (step / allStep) * 100;

    return (
        <Wrapper>
            <div className="btn-area">
                <Link href={backPath}>
                    <a>
                        &lt; {t("soriziller.이전 단계로")}
                    </a>
                </Link>
            </div>
            <div className="prog-area">
                <p style={{"width":`${progPercent}%`}}></p>
            </div>
        </Wrapper>
    );
}