import styled from 'styled-components';
import colors from '../styles/colors';
import ButtonRed from './buttonRed';

const Container = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: ${colors.white};
    color: ${colors.main};
    font-size: 1.5rem;
    font-weight: 600;
    width: 80vw;
    height: 180px;
    border-radius: 10px;
    left: 50%;
    bottom: -150px;
    transform: translateX(-50%);
`;

const DiscountInfo = () => {
    return(
        <Container>
            <p>Do You've got voucher with discount?</p>
            <ButtonRed rounded title="Realize it" to="/voucher"/>
        </Container>
    )
}

export default DiscountInfo;