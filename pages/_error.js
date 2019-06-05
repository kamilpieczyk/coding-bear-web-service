import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"
import colors from '../styles/colors'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { StoreConsumer } from '../context/store.context';

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
    article{
        padding: 30px;
        margin-top: 20px;
        background: ${colors.second};
        color: ${colors.white};
        border-radius: 5px;
        font-weight: 100;
        text-align: center;
    }
`;

const _error = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.addEventListener('load', () => setLoaded(true));
    });

    return(
        <>
            <Global />
            <Head>
                <title>404 not found || coding-bear.co.uk</title>
            </Head>

            { !loaded && 
            <StoreConsumer>{
                ({loading, setLoading}) => ( loading && setLoading(false) )
            }</StoreConsumer>
            }

            <Container>
                <div>
                    <img src="/static/images/bears_head.png" alt="head" />
                    <h1>404</h1>
                </div>

                <section>
                    page on this adress doesn't exist<br/>
                    or is not ready jet - in this case <br/>
                    pleas try again for few days.
                </section>

                <article>
                    if you've got voucher pleas return next week<br/>
                    coding-bear.co.uk is now in renovation.
                </article>
            </Container>
        </>
    )
}

export default _error;