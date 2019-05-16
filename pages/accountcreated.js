import { Component } from 'react';
import styled from 'styled-components';
import colors from "../styles/colors";
import MainLayout from '../layouts/mainLayout';
import Head from 'next/head';
import Register from '../components/register';
import TitleHeader from '../components/titleHeader';

const Container = styled.div`
    
`;

const ThankYou = styled.div`
    width: 40%;
    text-align: center;
    margin: 10vh auto;
`;

class AccountCreated extends Component{

    state = {
        
    }
    
    render(){
        return(
            <MainLayout>
                <Head>
                    <title>Sign up || Coding - bear bespoke websites and apps</title>
                </Head>

                <Container>
                    <TitleHeader title="Thank you!" noBackground>
                        Thank you for your registration in coding-bear
                    </TitleHeader>
                    <ThankYou>
                        We've sent activation link to your email adres.
                        Please click on the link in the message to activate account.
                        Sometimes activation email can be found in spam.                        
                    </ThankYou>

                </Container>

            </MainLayout>
        )
    }
}

export default AccountCreated;