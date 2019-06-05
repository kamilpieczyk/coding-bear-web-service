import React from 'react'
import App, { Container } from 'next/app'
import Loading from "../components/loading"
import { StoreConsumer, StoreProvider } from "../context/store.context"

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
        <StoreProvider>
            <Container>
                <StoreConsumer>
                    { ({loading}) => (
                        <Loading active={loading} />
                    )}
                </StoreConsumer>
                <Component {...pageProps} />
            </Container>
        </StoreProvider>
    );
  }
}

export default MyApp;