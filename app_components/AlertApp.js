import styled from "styled-components";
import colors from "../styles/colors";

const Container = styled.section`
    border: 1px solid ${colors.main};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    height: 60vh;
    margin: 10vh auto 0 auto;
    padding: 0 5vw;

    h1{
        color: ${colors.main};
    }
`;

const AlertApp = ({children, title, smile}) => {
    return(
        <>
            <Container>
                {smile
                    ? <img src="/static/images/;D.png" alt=";("/>
                    : <img src="/static/images/;(.png" alt=";("/>
                }
                <h1>{title}</h1>
                <div>{children}</div>    
            </Container>
        </>
    )
}

export default AlertApp;