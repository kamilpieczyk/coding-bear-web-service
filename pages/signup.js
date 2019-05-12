import { Component } from 'react';
import styled from 'styled-components';
import colors from "../styles/colors";
import MainLayout from '../layouts/mainLayout';
import Head from 'next/head';
import Register from '../components/register';
import TitleHeader from '../components/titleHeader';

const Container = styled.div`
    
`;

class SignUp extends Component{

    state = {
        
    }
    
    render(){
        return(
            <MainLayout>
                <Head>
                    <title>Sign up || Coding - bear bespoke websites and apps</title>
                </Head>

                <Container>
                    <TitleHeader title="SIGN UP">
                        create coding-bear account to be able order the new project easy
                    </TitleHeader>
                    <Register />

                </Container>

            </MainLayout>
        )
    }
}

export default SignUp;