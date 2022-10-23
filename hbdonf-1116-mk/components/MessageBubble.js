import styled from "styled-components";
import { bubble_info } from '../lib/bubble_info';
import { useEffect, useRef } from "react";
import { useTranslation } from 'next-i18next'


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
            height: 10rem;
            max-height:100%;
            outline: none;
            border: none;
            resize: none;
            text-align: center;

            &::placeholder{
                color:#999;
            }
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
    const { t } = useTranslation('common');
    const inputRef = useRef();
    const data = bubble_info.find(item => item.level == level);
    let width;
    
    if(level==5){
        width = size*1.5;
    } else {
        width = size;
    }
    console.log("width");
    console.log(width);

    const updateTextarea = () => {
        const textarea = inputRef.current;
    
        // 높이 자동화
        textarea.style.height = 'auto';
        const height = textarea.scrollHeight;
        textarea.style.height = `${height}px`;

        // br, 스페이스 2회 막기
        const test = textarea.value.replace(/\n/g, " ").replace("  ", " ");
        textarea.value = test;
    };

    useEffect(()=>{
        const textarea = inputRef.current;

        textarea && textarea.focus();
    },[]);

    return (
        <Wrapper level={level}>
            <img src={data?.image_url} alt={data?.title}/>
            {
                writemode ?
                <p style={{"width":`${width}rem`, "aspectRatio":data?.ratio, "padding" : data?.padding}}>
                    <textarea ref={inputRef} placeholder={t("set_messagebubble.작성안내")} maxLength={120} onChange={updateTextarea}/>
                </p> :
                <p style={{"width":`${width}rem`, "aspectRatio":data?.ratio, "padding" : data?.padding}}>
                    {text}
                </p>
            }
        </Wrapper>
    );
}