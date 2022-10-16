import styled from "styled-components";
import { S3_BASE_URL } from "../lib/config";
import { Icon } from "./Icons";

const Wrapper = styled.div`
    width: 100%;
    /* height: 6rem; */
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: var(--color-light);
    display: flex;
    flex-direction: column;
    justify-content: end;
    border-radius: 1.5rem 1.5rem 0 0;
    z-index: 11;

    .btn-area{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:var(--color-dark);
        padding:.5rem 1.5rem;
        text-transform: capitalize;

        .close-btn{
            padding:1rem;
            font-size: var(--font-size-big);
            font-weight: 600;
            color:red;
            display: flex;
            align-items: center;
        }
    }

    iframe, .cd-only{
        width:100%;
        height: 100%;
    }
    
    .cd-only{
        width:100%;
        height: 150px;    
        background-color: #000000;
        text-align: center;
        display: flex;
        justify-content: center;

        .thumbnail{
            width:150px;
            height: 150px;
            position: relative;
            
            img{
                width:100%;
                height: 100%;
                background-color: #ccc;
            }
            span{
                width:100%;
                padding:1rem;
                box-sizing: border-box;
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50%, -50%);
                font-size: var(--font-size-small);
                line-height: 1.5;
            }
        }
    }
`;

export default function MusicBar({data, onclick}){
    return (
        <Wrapper>
            <p className="btn-area">
                <b>{data.category.join(", ")}</b>
                <button className="close-btn" onClick={() => {onclick();}}><Icon.Close color="#000" size="1.8rem"/></button>
            </p>
            {
                data.type === "soundcloud" && 
                <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${data.link}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                ></iframe>
            }
            {
                data.type === "youtube" && 
                <iframe
                    src={`https://www.youtube.com/embed/${data.vidid}?autoplay=1`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                >
                </iframe>
            }
            {
                data.type === "cdonly" && 
                <div className="cd-only">
                    <p className="thumbnail">
                        <img src={`${S3_BASE_URL}/mk_1116/work_thumbnail/${data.id}.png`}/>
                        <span>{data.title.ko}은 CD에서만 들을 수 있습니다.</span>
                    </p>
                </div>
            }
        </Wrapper>
    );
}