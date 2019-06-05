import { Component } from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/mainLayout';
import Head from 'next/head';
import HomeWelcomeScreen from '../components/homeWelcomeScreen';
import WhyYouShouldChooseCodingBear from '../components/whyYouShouldChooseCodingBear';
import { StoreConsumer } from '../context/store.context';

const Container = styled.div`
    
`;

class Index extends Component{

    state = {
        homeContent: null,
    }

    componentDidMount(){
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/home')
            .then( res => res.json() )
            .then( homeContent => {
                this.setState({
                    homeContent,
                })
            })
            // .catch( err => location.replace('500'));
    }
    
    render(){
        return(
            <MainLayout>

                <Head>
                    <title>Coding - bear bespoke websites and apps</title>
                </Head>

                <Container>
                    { this.state.homeContent ? 
                    <>
                        <StoreConsumer>
                            {
                                ({loading, setLoading}) => (
                                    loading
                                        ? setLoading(false)
                                        : null
                                )
                            }
                        </StoreConsumer>

                        <HomeWelcomeScreen 
                            title={ this.state.homeContent[0].homeWelcomeScreen.title }
                            content={ this.state.homeContent[0].homeWelcomeScreen.content }
                        /> 
                        <WhyYouShouldChooseCodingBear content={ this.state.homeContent[1].whyyoushouldchoosecodingbear }/>
                        
                    </> : null }

                </Container>

            </MainLayout>
        )
    }
}

export default Index;