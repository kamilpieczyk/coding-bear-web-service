import styled from 'styled-components';
import colors from "../styles/colors";

const Container = styled.section`
    background: url('static/images/subpage_background.png');
    background-size: cover;
    margin-top: 70px;
    width: 100vw;
    height: 30vh;
    color: ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TitleHeader = (props) => {
    return(
        <Container>
            <h1>{props.title}</h1>
            <p>{props.children}</p>
        </Container>
    )
}

export default TitleHeader;