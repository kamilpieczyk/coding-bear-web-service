import styled from "styled-components";
import Title from "./title";
import colors from '../styles/colors';

// style for this component
const Container = styled.section`
    margin-top: 60px;
    width: 100vw;
    height: 100vh;
    
`;
const Header = styled.div`
    position: relative;
    p{
        width: 520px;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 100;
    }
`;
const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
    padding: 0 10%;
    color: ${colors.grey};

    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        h2{
            margin: 10px 0 0 0;
            font-size: 1rem;
        }
        p{
            font-weight: 100;
            text-align: center;
            width: 90%;
        }
    }
`;
// component
const WhyYouShouldChooseCodingBear = ({content}) => {
    // part of content of homepage
    return(
        <Container>

            <Header>
                <Title color={ colors.main } >{ content.title }</Title>
                <p>{ content.description }</p>
            </Header>

            <Options>
                {content.items.map( el => (
                    <div>
                        <img src = {el.image} alt  = {el.title}/>
                        <h2>{el.title}</h2>
                        <p>{el.content}</p>
                    </div>
                ))}
            </Options>

        </Container>
    )
}

export default WhyYouShouldChooseCodingBear;