import styled from "styled-components";
import Title from "./title";
import colors from '../styles/colors';
import DiscountInfo from '../components/discountInfo';

// styles
const Container = styled.section`
    width: 100vw;
    position: relative;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    padding: 60px 0 80px 0;
    background: url('/static/images/background.png');
    background-size: cover;
    display: grid;
    grid-template-columns: 50% 50%;
    @media (max-width: 450px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: ${colors.white};
        font-weight: 100;
        p{
            width: 80%;
        }
        @media (max-width: 450px){
            align-items: center;
        }
    }
    div:first-child{
        align-items: center;
        @media (max-width: 450px){
            display: none;
        }
    }
`;

// component
const HowToOrder = ({content}) => {
    
    return(
        <Container>
            <Title>{content.title}</Title>
            <Content>
                <div>
                    <img src={content.image} alt="howtoorder"/>
                </div>
                <div>
                    {content.content.map( (el, i) => (
                        <p key={i}><strong>{i+1}. </strong>{el}</p>
                    ))}
                </div>
            </Content>
            <DiscountInfo />
        </Container>
    )
}

export default HowToOrder;