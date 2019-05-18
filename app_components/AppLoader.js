import styled from 'styled-components';
import colors from "../styles/colors";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 80vh;
`;

const AppLoader = () => (
    <Container>
        <img src="/static/images/loader.gif" alt="loader"/>
        Application is now loading...
    </Container>
);

export default AppLoader;