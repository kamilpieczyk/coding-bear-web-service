import React from 'react'
import App, { Container } from 'next/app'
import Loading from "../components/loading"
import { StoreConsumer, StoreProvider } from "../context/store.context"
import Router from "next/router"

class MyApp extends App {

  state = {
    loading: false
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount(){
    const handleRouteChange = () => {

      this.setState({ loading: true });

    }

    Router.events.on('routeChangeStart', handleRouteChange);

  }

  render() {
    const { Component, pageProps } = this.props;

    return (
        <StoreProvider>
            <Container>
                <StoreConsumer>{ 
                  ({ loading, setLoading }) => {
                    if( this.state.loading ) {
                      setLoading(true);
                      this.setState({ loading: false });
                    }
                    return(
                      <Loading active={loading} />
                    )
                  }
                }</StoreConsumer>
                <Component {...pageProps} />
            </Container>
        </StoreProvider>
    );
  }
}

export default MyApp;