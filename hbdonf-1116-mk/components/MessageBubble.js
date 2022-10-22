import styled from "styled-components";
import { bubble_info } from '../lib/bubble_info';
import {useRouter} from "next/router"


const Wrapper = styled.div`
    position: relative;
    color:var(--color-dark);
    width:auto;
    display: inline-block;

    p{
        box-sizing:border-box;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;

        textarea{
            width:100%;
            height:100%;
            outline: none;
            border: none;
            resize: none;
        }
    }

    img{
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index:-1;
    }
`;

export default function MessageBubble({writemode, size, level, text}){
    const router = useRouter();
    const data = bubble_info.find(item => item.level == level);
    let width;

    if(level===5){
        width = size*1.5;
    } else {
        width = size;
    }

    // TO DO : write mode 정규식 써서 br 못하게 막기
    // TO DO : textarea 높이 scrollHeight 써서 유동화

    return (
        <Wrapper level={level}>
            <img src={data?.image_url} alt={data?.title}/>
            {
                writemode ?
                <p style={{"width":`${width}rem`, "aspectRatio":data?.ratio, "padding" : data?.padding}}>
                    <textarea placeholder="140자 이내 메세지를~~" maxLength={140}/>
                </p> :
                <p style={{"width":`${width}rem`, "aspectRatio":data?.ratio, "padding" : data?.padding}}>
                    {text}
                </p>
            }
        </Wrapper>
    );
}