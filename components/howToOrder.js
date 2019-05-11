import styled from "styled-components";
import Title from "./title";
import colors from '../styles/colors';
import DiscountInfo from '../components/discountInfo';

// styles
const Container = styled.section`
    width: 100vw;
    height: 100vh;
    position: relative;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    background: url('/static/images/background.png');
    background-size: 100% 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: ${colors.white};
        font-weight: 100;
        p{
            width: 80%;
        }
    }
    div:first-child{
        align-items: center;
    }
`;

// component
const HowToOrder = ({content}) => {
    console.log(content);
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