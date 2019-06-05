import React, { Component } from 'react'
import styled from 'styled-components'
import colors from "../styles/colors"
import MainLayout from '../layouts/mainLayout'
import Head from 'next/head'
import Register from '../components/register'
import TitleHeader from '../components/titleHeader'
import { StoreConsumer } from '../context/store.context'

const Container = styled.div`
    
`;

class SignUp extends Component{

    state = {
        loaded: false
    }

    componentDidMount(){
        document.addEventListener('load', () => this.setState({loaded: true}));
    }

    render(){
        return(
            <React.Fragment>

                { !this.state.loaded && 
                    <StoreConsumer>{
                        ({loading, setLoading}) => ( loading && setLoading(false) )
                    }</StoreConsumer>
                }

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
            </React.Fragment>
        )
    }
}

export default SignUp;