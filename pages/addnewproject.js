import styled from 'styled-components'
import AppLayout from '../layouts/appLayout'
import Head from 'next/head'
import { StoreConsumer } from "../context/store.context"
import AlertApp from "../app_components/AlertApp"
import React, { useState, useEffect } from 'react'
import NewProjectApp from '../app_components/newProjectApp'

const Container = styled.div`
`;

const MyProjects = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.addEventListener('load', () => setLoaded(true));
    });

    return(
        <>
            { !loaded && 
                <StoreConsumer>{
                    ({loading, setLoading}) => ( loading && setLoading(false) )
                }</StoreConsumer>
            }

            <AppLayout>
                <Head>
                    <title>Add new project || Coding - bear bespoke websites and apps</title>
                </Head>

                <Container>
                    <StoreConsumer>{
                        ({user}) => (
                            user.logged
                                ? <NewProjectApp />

                                : <AlertApp title ="Application alert">
                                    You need to sign in to see this page
                                </AlertApp>
                        )
                    }</StoreConsumer>
                </Container>

            </AppLayout>
        </>
    )
}

export default MyProjects;