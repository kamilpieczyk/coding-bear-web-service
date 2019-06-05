import React from 'react';
import { createGlobalStyle } from 'styled-components'
import colors from "../styles/colors";
import Header from '../components/header';
import Footer from '../components/footer';
import { StoreConsumer } from '../context/store.context';
import MobileHeader from '../components/mobileHeader';

const Global = createGlobalStyle`
    body{
        margin: 0;
        background: ${ colors.darkWhite };
        font-size: 16px;
        font-family: 'Open Sans', sans-serif;
        overflow-x: hidden;
    }

    *, *::after, *::before{
        box-sizing: border-box;
    }
`;

const MainLayout = ({ children }) => (
    <>
        <Global />
        <StoreConsumer>
            {({device}) => (
                device === "desktop"
                    ? <Header />
                    : device === "mobile"
                        ? <MobileHeader />
                        : device === "tablet"
                            ? <MobileHeader />
                            : null
            )}
        </StoreConsumer>
        { children }
        <Footer />
    </>
);

export default MainLayout;