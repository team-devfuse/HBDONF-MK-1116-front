import styled from "styled-components";

const StyledBtn = styled.div`
    width:2.5rem;
    height: 2.5rem;
    position: relative;

    p{
        width:100%;
        height:0.5rem;
        background-color: var(--color-light);
        position: absolute;
        transition: all 0.3s ease-in-out;
        top:50%;
        right:0;
        transform: translateY(-50%);
    }
    
    p:nth-child(1){
        transform: translateY(-250%);
        
    }
    
    p:nth-child(2){
        width:70%;
    }
    
    p:nth-child(3){
        width:40%;
        transform: translateY(150%);
    }

    ${(props) => {

        if(props.isOpened){
            return `
                p:nth-child(1){
                    width:110%;
                    transform: translateY(-50%) rotate(45deg);
                }
                
                p:nth-child(2){
                    width:100%;
                    transform: translateY(-50%) scaleX(0);
                }
                
                p:nth-child(3){
                    width:110%;
                    transform: translateY(-50%) rotate(-45deg);
                }
            `;
        }
    }}
`;

export default function NavToggleBtn({isOpened}){
    return (
        <StyledBtn isOpened={isOpened}>
            <p></p>
            <p></p>
            <p></p>
        </StyledBtn>
    );
}