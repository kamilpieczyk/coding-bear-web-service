import styled from 'styled-components';
import Link from 'next/link';
import colors from '../styles/colors';

const Button = styled.button`
    background: ${ colors.third };
    border-radius: 50px;
    border: none;
    padding: 10px 15px;
    color: white;
    cursor: pointer;
    transition: .2s;

    :hover{
        margin-bottom: 5px;
    }
`;

const ButtonRed = ({ title,to }) => (
    <Link href={ to }>
        <Button>{ title }</Button>
    </Link>
);

export default ButtonRed;