import styled from 'styled-components';
import AppLayout from '../layouts/appLayout';
import Head from 'next/head';
import {StoreConsumer} from "../context/store.context"
import AlertApp from "../app_components/AlertApp";
import ProjectsApp from "../app_components/ProjectsApp";

const Container = styled.div`
`;

const MyProjects = () => {

    return(
        <AppLayout>
            <Head>
                <title>Voucher || Coding - bear bespoke websites and apps</title>
            </Head>

            <Container>
                <StoreConsumer>{
                    ({user}) => (
                        user.logged
                            ? <ProjectsApp email={user.email} name={user.name}/>

                            : <AlertApp title ="Application alert">
                                You need to sign in to see this page
                              </AlertApp>
                    )
                }</StoreConsumer>
            </Container>

        </AppLayout>
    )
}

export default MyProjects;