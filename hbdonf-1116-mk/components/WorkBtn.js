import styled from "styled-components";
import { S3_BASE_URL } from "../lib/config";
import * as gtag from "../lib/gtag";

const StyledBtn = styled.button`
    width: 100%;
    aspect-ratio: 1/1;
    ${props => `
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${props.backgroundImage}) no-repeat center center;
    `}
    background-size:cover;
    padding:10%;
    display:flex;
    align-items:flex-end;
    justify-content:start;
    text-align:left;
    font-size:var(--font-size-small);
`;

export default function WorkBtn({data, onclick}){
    //6. GA이벤트 날리기
    const gaValue = { 
        action :"listen_mk_work",
        category : "event",
        label :data.title.ko
    };
      
    return (
        <StyledBtn backgroundImage={`${S3_BASE_URL}/mk_1116/work_thumbnail/${data.id}.png`} onClick={() => {onclick(data); gtag.event(gaValue);}}>
            <p>{data.title.ko}</p>
        </StyledBtn>
    );
}