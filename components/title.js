import styled from 'styled-components';

const H1 = styled.h1`
    color: ${ props => props.color };
    position: relative;
    text-align: center;

    ::after{
        content: " ";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 3px;
        background: ${ props => props.color };
    }
`;

const Title = ({ color = '#601F3C' , children }) => {
    
    return(
        <H1 color= { color }>
            { children }
        </H1>
    )
}

export default Title;