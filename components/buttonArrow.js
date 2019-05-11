import styled from 'styled-components';
import colors from '../styles/colors';

const Button = styled.button`
    background: ${ colors.white };
    border-radius: 50px;
    border: none;
    padding: 0 15px;
    height: 40px;
    cursor: pointer;
    transition: .2s;

    :hover{
        
    }
`;

const ButtonArrow = ({ action }) => (
    <Button onClick={ action }>
        <img 
            src="/static/images/arrow.png" 
            alt="arrowButton"
        />
    </Button>
);

export default ButtonArrow;