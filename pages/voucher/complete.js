import styled from 'styled-components';
import AppLayout from '../../layouts/appLayout';
import Head from 'next/head';
import {StoreConsumer} from "../../context/store.context"
import AlertApp from "../../app_components/AlertApp";

const Container = styled.div`
`;

const Complete = () => {

    return(
        <AppLayout>
            <Head>
                <title>Voucher || Coding - bear bespoke websites and apps</title>
            </Head>

            <Container>
                <StoreConsumer>{
                    ({user}) => (
                        user.logged
                            ? <AlertApp title ="Succes" smile>
                                You order now is processing. You can see status in your projects.
                                I'll contact with you as soon as possible. Thank you
                              </AlertApp>

                            : <AlertApp title ="Application alert">
                                You need to sign in to see this page
                              </AlertApp>
                    )
                }</StoreConsumer>
            </Container>

        </AppLayout>
    )
}

export default Complete;