import styled from 'styled-components';
import Link from 'next/link';
import colors from '../styles/colors';

const Button = styled.button`
    background: ${ colors.third };
    border-radius: ${ props => props.rounded ? "5px" : "50px"};
    border: none;
    padding: 10px 15px;
    color: white;
    cursor: pointer;
    transition: .2s;

    :hover{
        margin-bottom: 5px;
    }
`;

const ButtonRed = ({ title, to, rounded }) => (
    <Link href={ to }>
        <Button rounded = {rounded}>{ title }</Button>
    </Link>
);

export default ButtonRed;