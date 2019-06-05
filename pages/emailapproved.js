import React, { Component } from 'react'
import styled from 'styled-components'
import MainLayout from '../layouts/mainLayout'
import Head from 'next/head'
import TitleHeader from '../components/titleHeader'
import { StoreConsumer } from '../context/store.context'

const Container = styled.div`
    
`;

const ThankYou = styled.div`
    width: 40%;
    text-align: center;
    margin: 10vh auto;
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
                        <TitleHeader title="Thank you!" noBackground>
                            Thank you for your registration in coding-bear
                        </TitleHeader>
                        <ThankYou>
                            Now account is ready to use. You can login and go to the pannel to start a new project. We are happy that you joint to us.
                            
                        </ThankYou>

                    </Container>

                </MainLayout>
            </React.Fragment>

        )
    }
}

export default SignUp;