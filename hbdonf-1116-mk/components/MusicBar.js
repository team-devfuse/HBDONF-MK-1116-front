import styled from "styled-components";
import { Icon } from "./Icons";

const StyledBtn = styled.div`
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

    iframe{
        width:100%;
        height: 100%;
    }
`;

export default function MusicBar({data, onclick}){
    return (
        <StyledBtn backgroundImage={data.thumbnail}>
            <p className="btn-area">
                <b>{data.category}</b>
                <button className="close-btn" onClick={() => {onclick();}}><Icon.Close color="#000" size="1.8rem"/></button>
            </p>
            {
                data.type === "soundcloud" ? 
                <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${data.link}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                ></iframe> :
                <iframe
                    src={`https://www.youtube.com/embed/${data.vidid}?autoplay=1`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                >
                </iframe>
            }
        </StyledBtn>
    );
}