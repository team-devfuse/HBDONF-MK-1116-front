import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    color:red;
    ${props => {
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
    }}

    p{
        position: absolute;
        transform: translate(-50%, -50%);
        width:100%;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default function MessageBubble({data, text}){
    return (
        <Wrapper level={data.level}>
            <img src={data.image_url} alt={data.text}/>
            <p style={{"width":`${data.width}%`,"height":`${data.height}%`,"left":`${data.left}%`,"top":`${data.top}%`}}>
                {text}
            </p>
        </Wrapper>
    );
}