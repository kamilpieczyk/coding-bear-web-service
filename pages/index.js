import { Component } from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/mainLayout';
import Loading from "../components/loading";
//import colors from '../styles/colors';
import Head from 'next/head';
import HomeWelcomeScreen from '../components/homeWelcomeScreen';
import WhyYouShouldChooseCodingBear from '../components/whyYouShouldChooseCodingBear';

const Container = styled.div`
    
`;

class Index extends Component{

    state = {
        homeContent: null,
        loading: true
    }

    componentDidMount(){
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/home')
            .then( res => res.json() )
            .then( homeContent => {
                this.setState({
                    homeContent,
                    loading: false
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
                <Loading active={this.state.loading} />
                <Container>
                    { this.state.homeContent ? 
                    <>
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