import React, {useState, useEffect} from 'react';
import { createGlobalStyle } from 'styled-components'
import colors from "../styles/colors";
import Header from '../components/header';
import {StoreProvider, StoreConsumer} from '../context/store.context';
import MobileHeader from '../components/mobileHeader';
import styled from "styled-components";
import AppLoader from "../app_components/AppLoader";

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

const Footer = styled.footer`
    color: ${colors.grey};
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;

const Space = styled.div`
    height: 75px; 
    weight: 100vw;
`;

const AppLayout = ({ children }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.addEventListener('load', setLoaded(true));
    },[]);

    return(
        <>
        {loaded
            ? null
            : <AppLoader />
        }
            <StoreProvider>
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
                <Space />
                { children }
                <Footer>
                    © 2019 CODING-BEAR, coding bear logo and bear's head 
                    are registred trademarks of coding-bear
                </Footer>
            </StoreProvider>
        </>
    );
}

export default AppLayout;