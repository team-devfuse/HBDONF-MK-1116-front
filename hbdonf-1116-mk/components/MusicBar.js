import styled from "styled-components";

const StyledBtn = styled.div`
    width: 100%;
    /* height: 6rem; */
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: var(--color-light);

    .close-btn{
        color:red;
    }
`;

export default function MusicBar({data, onclick}){
    return (
        <StyledBtn backgroundImage={data.thumbnail}>
            <button className="close-btn" onClick={() => {onclick();}}>X</button>
            {/* <img src={data.thumbnail} alt={data.title.ko}/> */}
            <p>{data.title.ko}</p>
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