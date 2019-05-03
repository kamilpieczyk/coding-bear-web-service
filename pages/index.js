import { Component } from 'react';
import styled from 'styled-components';
import MainLayout from './layouts/mainLayout';
import colors from './styles/colors';
import Head from 'next/head';

const Container = styled.div`
    
`;

class Index extends Component{
    
    render(){
        return(
            <MainLayout>
                <Head>
                    <title>Coding-Bear Boilerplate</title>
                </Head>

                <Container>
                    
                </Container>
            </MainLayout>
        )
    }
}

export default Index;