import styled from 'styled-components';
import {createGlobalStyle} from "styled-components";
import colors from '../styles/colors';
import Head from 'next/head';

const Global = createGlobalStyle`
    body{
        margin: 0;
        background: ${ colors.darkWhite };
        font-size: 16px;
        font-family: 'Open Sans', sans-serif;
        overflow-x: hidden;
    }

    *, *::after, *::before{
        box-sizing: border-box;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50vh;
    transform: translateY(-50%);
    div{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    h1{
        font-size: 2em;
        color: ${colors.main};
        margin-left: 30px;
    }
    section{
        padding: 30px;
        margin-top: 20px;
        background: ${colors.main};
        color: ${colors.white};
        border-radius: 5px;
        font-weight: 100;
        text-align: center;
    }
`;

const _504 = () => {
    return(
        <>
            <Global />
            <Head>
                <title>500 server error || coding-bear.co.uk</title>
            </Head>

            <Container>
                <div>
                    <img src="/static/images/bears_head.png" alt="head" />
                    <h1>500</h1>
                </div>

                <section>
                    Server internal error<br/>
                    preas try again later
                </section>
            </Container>
        </>
    )
}

export default _504;