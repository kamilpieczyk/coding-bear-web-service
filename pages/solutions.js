import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import MainLayout from '../layouts/mainLayout'
import Head from 'next/head'
import colors from '../styles/colors'
import {StoreConsumer} from "../context/store.context"
import Title from "../components/title"

const Wrapper = styled.div`
    margin: 100px 0;
`;

const Container = styled.section`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(130deg, ${colors.main}, ${colors.third});
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 10%;

    @media(max-width: 450px){
        flex-direction: column;
        padding-top: 80px;
        justify-content: center;
    }
    
    @media(max-width: 768px){
        height: 768px;
    }
`;

const Front = styled.div`
    display: flex;
    flex-direction: column;
    color: ${colors.white};
    width: 30%;
    font-weight: 100;
    @media(max-width: 450px){
        width: 90%;
    }
`;

const Contnet = styled.article`
    margin: 10px 10vw;
    color: ${colors.grey};
`;

const TitleFront = styled.h1`
    color: ${colors.white};

`;

const Solutions = ({router}) => {
    const [loaded, setLoaded] = useState(false);

    const content = data(router.query.name);

    useEffect(() => {
        document.addEventListener('load', () => setLoaded(true));
    });

    return(

        <React.Fragment>
            
            { !loaded && 
            <StoreConsumer>{({loading, setLoading}) => ( loading && setLoading(false))}</StoreConsumer>
            }

            <Head>
                <title>coding-bear solutions - {content.title}</title>
            </Head>

            <MainLayout>
                <Container>
                    <img src={content.image} alt="solutions-image" />
                    <Front>
                        <TitleFront>{content.title}</TitleFront>
                        <p>
                            {content.description}
                        </p>
                    </Front>
                    
                </Container>
                <Wrapper>{
                    content.content.map( article => (
                        <Contnet>
                            <Title>{article.title}</Title>
                            <div>{article.content}</div>
                        </Contnet>
                    ))
                }</Wrapper>
            </MainLayout>
        </React.Fragment>

    )
}

function data(name) {
    const db = {
        staticwebsites: {
            title: "Static Websites",
            image: "/static/images/staticwebsites.png",
            description: "There is many ways how to build static websites. Perfect universal solution doesn't exist - everything depends on expectications. Our role is to find ideal issue for yours.",
            content: [
                {
                    title: "Non editable website",
                    content: "  If you think about your website as a businesscard - the best soludtion for you needs is non editable website. To build that kind of we using HTML and CSS for construct and client side java-script for programm some effects like mobile menu etc. If static website is much more advance a good practice is to build website using javascript static site frameworks like gatsby.js. \n This is a perfect solution for small businesses owners who would like only introduce company in the internet network. It is very cheap in production and hosting as well. Usually cost never exceed 400£ in production and 10£ per month for domain and hosting."
                },
                {
                    title: "CMS website",
                    content: "  If your company needs a static website but you would like to make a changes in content very often - better solution for you is to use CMS system. It gives you a controll about content of your static website but it is still cheap on production. Prices of hosting depends on whitch content-menagment-system you will whoose. PHP based CMS like word-press are cheaper to hosting but they are deprecated and much slower than server-side javascript CMS systems. Novadays very popular solution is headless CMS system on the back and javascript framework on the front (like NetlifyCMS + react.js app on the front)"
                },
            ]
        },

        webapps: {
            title: "Web applications",
            image: "/static/images/staticwebsites.png",
            description: "Nowadays many popular javascript frameworks are used for developing modern web applications. Coding-bear usually works with two: react.js for bigger projects and vue.js for small projects",
            content: [
                {
                    title: "Powerfull react.js",
                    content: "React.js is a javascript framework which has been made by facebook developers for faster, easier and much more safty coding. Thanks to react web-developers are able to build applications better. The main feature of react is virtual document-object-model. React stores the entire DOM of the application in memory, after changing the state searches for differences between the virtual and real DOM and updates the changes. \n The framework is very powerfull. A lot of famous brand like facebook, netflix, pinterest, instagram, etc. are using react - whole have been build in it. If you would like to see an example - just check facebook.com - this is react."
                },
                {
                    title: "Very light vue.js",
                    content: "Vue.js is exacly like react a JavaScript framework for building user interfaces and single-page applications. Vue is an open-source solution created by Evan You and realised first time in 2014. Now in 2019 vue is very fast and light."
                },
            ]
        },

        backend: {
            title: "Backend programming",
            image: "/static/images/backend.png",
            description: "Nowadays many popular javascript frameworks are used for developing modern web applications. Coding-bear usually works with two: react.js for bigger projects and vue.js for small projects",
            content: [
                {
                    title: "Powerfull react.js",
                    content: "React.js is a javascript framework which has been made by facebook developers for faster, easier and much more safty coding. Thanks to react web-developers are able to build applications better. The main feature of react is virtual document-object-model. React stores the entire DOM of the application in memory, after changing the state searches for differences between the virtual and real DOM and updates the changes. \n The framework is very powerfull. A lot of famous brand like facebook, netflix, pinterest, instagram, etc. are using react - whole have been build in it. If you would like to see an example - just check facebook.com - this is react."
                },
                {
                    title: "Very light vue.js",
                    content: "Vue.js is exacly like react a JavaScript framework for building user interfaces and single-page applications. Vue is an open-source solution created by Evan You and realised first time in 2014. Now in 2019 vue is very fast and light."
                },
            ]
        },
        
        android: {
            title: "Android native applications",
            image: "/static/images/backend.png",
            description: "Nowadays many popular javascript frameworks are used for developing modern web applications. Coding-bear usually works with two: react.js for bigger projects and vue.js for small projects",
            content: [
                {
                    title: "Powerfull react.js",
                    content: "React.js is a javascript framework which has been made by facebook developers for faster, easier and much more safty coding. Thanks to react web-developers are able to build applications better. The main feature of react is virtual document-object-model. React stores the entire DOM of the application in memory, after changing the state searches for differences between the virtual and real DOM and updates the changes. \n The framework is very powerfull. A lot of famous brand like facebook, netflix, pinterest, instagram, etc. are using react - whole have been build in it. If you would like to see an example - just check facebook.com - this is react."
                },
                {
                    title: "Very light vue.js",
                    content: "Vue.js is exacly like react a JavaScript framework for building user interfaces and single-page applications. Vue is an open-source solution created by Evan You and realised first time in 2014. Now in 2019 vue is very fast and light."
                },
            ]
        },

        windows: {
            title: "Windows desktop apps",
            image: "/static/images/backend.png",
            description: "Nowadays many popular javascript frameworks are used for developing modern web applications. Coding-bear usually works with two: react.js for bigger projects and vue.js for small projects",
            content: [
                {
                    title: "Powerfull react.js",
                    content: "React.js is a javascript framework which has been made by facebook developers for faster, easier and much more safty coding. Thanks to react web-developers are able to build applications better. The main feature of react is virtual document-object-model. React stores the entire DOM of the application in memory, after changing the state searches for differences between the virtual and real DOM and updates the changes. \n The framework is very powerfull. A lot of famous brand like facebook, netflix, pinterest, instagram, etc. are using react - whole have been build in it. If you would like to see an example - just check facebook.com - this is react."
                },
                {
                    title: "Very light vue.js",
                    content: "Vue.js is exacly like react a JavaScript framework for building user interfaces and single-page applications. Vue is an open-source solution created by Evan You and realised first time in 2014. Now in 2019 vue is very fast and light."
                },
            ]
        },
    }

    if(name === 'staticwebsites') return db.staticwebsites;
    else if(name === 'webapps') return db.webapps;
    else if(name === 'backend') return db.backend;
    else if(name === 'android') return db.android;
    else if(name === 'windows') return db.windows;
}

export default withRouter(Solutions);