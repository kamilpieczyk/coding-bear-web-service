import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../styles/colors'
import MainLayout from '../layouts/mainLayout'
import Head from 'next/head'
import { StoreConsumer } from "../context/store.context"
import Particles from "react-particles-js"
import particles from "../styles/particles"

const Container = styled.section`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(130deg, ${colors.main}, ${colors.third});
    color: white;
    /* position: relative; */

    div{
        margin: 0 0 0 20px;
    }
    @media(max-width: 450px){
        height: 100vh
    }
`;

const Modal = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    @media(max-width: 450px){
        flex-direction: column;
        width: 100vw;
        left: 0;
        transform: translateX(-5%) translateY(-50%);
        text-align: center;
    }
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    margin: 30px 10vw;
    article{
        color: ${ colors.grey };
    }
`;

const Article = ({ title, content, image }) => (
    <article>
        <h1>{title}</h1>
        <p>{content}</p>
        <img src={image} />
    </article>
);

export default () => {

    const [ loaded, setLoaded ] = useState(false);
    const [ data, setData ] = useState(null);

    const fetchData = () => {
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/about')
        .then( res => res.json())
        .then( json => {
            setData( json.about );
        })
        .then( () => setLoaded(true))
        .catch( err => console.log(err))
    }

    useEffect( () => {
        fetchData();
    }, [] )

    return(
        <MainLayout>
            <Head>
                <title>about coding-bear || coding-bear.co.uk</title>
            </Head>

            { loaded && 
                <StoreConsumer>{
                     ({ loading, setLoading }) => loading && setLoading(false)
                }</StoreConsumer>
            }

            <Container>
                <StoreConsumer>{
                    ({ device }) => (
                        device === "mobile"
                            ? <Particles width="100vw" height="100vh" params={particles.mobile} />
                            : <Particles width="100vw" height="100vh" params={particles.desktop} />
                    )
                }</StoreConsumer>

                <Modal>
                    <img src="static/images/head.png" alt="white-bear" />

                    <div>
                        <h1>About coding-bear</h1>
                        <p>If you would like to know a bit more about <br/> the coding-bear company</p>
                    </div>
                </Modal>
            </Container>
            <Section>
                { data
                    ? data.map( el => (
                        <Article 
                            title={el.title} 
                            content={el.content} 
                            image={el.image} 
                        />
                    ))

                    : null

                }
            </Section>
        </MainLayout>
    )
}