import styled from "styled-components";
import { bubble_info } from '../lib/bubble_info';
import {useRouter} from "next/router"


const Wrapper = styled.div`
    position: relative;
    color:var(--color-dark);
    /* ${props => {
        if(props.for == "main"){
            if(props.level==1){
                return `
                    width: 70%;
                `;
            } else if(props.level<4){
                return `
                    width: 100%;
                `;
            } else if(props.level==4){
                return `
                    width: 80%;
                `;
            }
        } else if(props.for == "setmessage"){
            if(props.level==1){
                return `
                    width: 50%;
                `;
            } else if(props.level<4){
                return `
                    width: 60%;
                `;
            } else if(props.level==4){
                return `
                    width: 80%;
                `;
            }
        } else if(props.for == "allmessage"){
            if(props.level==1){
                return `
                    max-width: 50rem;
                    `;
            } else if(props.level<4){
                return `
                    max-width: 60rem;
                    `;
            } else if(props.level==4){
                return `
                    max-width: 75rem;
                `;
            }
        }
    }} */

    p{
        position: absolute;
        transform: translate(-50%, -50%);
        width:100%;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default function MessageBubble({level, text}){
    const router = useRouter();
    const data = bubble_info.find(item => item.level == level);
    let path;

    if(router.pathname.includes("setmessage")){
        path = "setmessage"
    } else if (router.pathname === "/"){
        path = "main"
    } else if(router.pathname.includes("allmessage")){
        path = "allmessage"
    }

    // console.log(`path = ${path}`);

    return (
        <Wrapper level={level} for={path}>
            <img src={data.image_url} alt={data.title}/>
            <p style={{"width":`${data.width}%`,"left":`${data.left}%`,"top":`${data.top}%`}}>
                {text}
            </p>
        </Wrapper>
    );
}