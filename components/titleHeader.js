import styled from 'styled-components';
import colors from "../styles/colors";

const Container = styled.section`
    background: ${ props => props.noBackground ? colors.third : "url('static/images/subpage_background.png')"};
    background-size: cover;
    margin-top: 70px;
    width: 100vw;
    height: 30vh;
    color: ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 450px){
        margin-top: 0;
        padding: 80px 10vw 20px 10vw;
    }
`;

const TitleHeader = (props) => {
    return(
        <Container noBackground = {props.noBackground}>
            <h1>{props.title}</h1>
            <p>{props.children}</p>
        </Container>
    )
}

export default TitleHeader;