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
    bottom: -100px;
    transform: translateX(-50%);
    @media (max-width: 450px) {
        justify-content: center;
        font-size: 1rem;
        flex-direction: column;
        padding: 0 10%;
        text-align: center;
    }
`;

const DiscountInfo = () => {
    return(
        <Container>
            <p>Do You've got voucher with discount?</p>
            <ButtonRed rounded title="Redeem" to="/voucher"/>
        </Container>
    )
}

export default DiscountInfo;