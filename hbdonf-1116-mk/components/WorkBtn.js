import styled from "styled-components";

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
    return (
        <StyledBtn backgroundImage={data.thumbnail} onClick={() => {onclick(data);}}>
            {/* <img src={data.thumbnail} alt={data.title.ko}/> */}
            <p>{data.title.ko}</p>
        </StyledBtn>
    );
}