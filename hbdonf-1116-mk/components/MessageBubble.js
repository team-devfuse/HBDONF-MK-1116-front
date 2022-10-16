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

export default function MessageBubble({size, level, text}){
    const router = useRouter();
    const data = bubble_info.find(item => item.level == level);
    let path;
    let width;

    if(router.pathname.includes("setmessage")){
        path = "setmessage"
    } else if (router.pathname === "/"){
        path = "main"
    } else if(router.pathname.includes("allmessage")){
        path = "allmessage"
    }

    // console.log(`path = ${path}`);

    if(level===5){
        width = size*1.5;
    } else {
        width = size;
    }

    return (
        <Wrapper level={level} for={path}>
            <img src={data.image_url} alt={data.title}/>
            <p style={{"width":`${width}rem`, "aspectRatio":data.ratio, "padding" : data.padding}}>
                {text}
            </p>
        </Wrapper>
    );
}