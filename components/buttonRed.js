import styled from 'styled-components';
import Link from 'next/link';
import colors from '../styles/colors';

const Button = styled.button`
    background: ${ colors.third };
    border-radius: ${ props => props.rounded ? "5px" : "50px"};
    border: 1px solid transparent;
    padding: 10px 15px;
    color: white;
    cursor: pointer;
    transition: .2s;

    :hover{
        border: 1px solid ${colors.third};
        background: transparent;
        color: ${colors.third};
    }
`;

const ButtonRed = ({ title, to, rounded, action }) => (
    <>
        {to?
            <Link href={ to }>
                <Button rounded = { rounded }>{ title }</Button>
            </Link> :

            <Button rounded = { rounded } onClick={action}>{ title }</Button>
        }
    </>
);

export default ButtonRed;