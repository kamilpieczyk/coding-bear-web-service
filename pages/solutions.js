import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import MainLayout from '../layouts/mainLayout'
import Head from 'next/head'
import colors from '../styles/colors'
import { StoreConsumer } from "../context/store.context"

const Wrapper = styled.div`
    margin: 100px 0;
`;

const Container = styled.section`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(130deg, ${colors.main}, ${colors.third});
    opacity: ${ props => props.opacity ? props.opacity : 1 };
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
    img{
        margin: 20px 0 20px 0;
        margin-left: 50%;
        transform: translateX(-50%);
        width: 300px;
    }
`;

const TitleFront = styled.h1`
    color: ${colors.white};

`;

const Solutions = ({ router }) => {
    const  [loaded, setLoaded ] = useState(false);
    const [ opacity, setOpacity ] = useState(1);

    const content = data(router.query.name);

    let oldScroll;

    const handleScrollEffect = (e) => {
        const scroll = window.scrollY;
        const height = window.innerHeight;
        const percent = scroll / height;
        const opacityDecrement = 1 - percent.toFixed(1) - 0.2;
        const opacityIncrement = 0 + opacityDecrement + 0.2;

        if(scroll > oldScroll){
            oldScroll = scroll;
            setOpacity( opacityDecrement )
        }
        else if(scroll < oldScroll){
            oldScroll = scroll;
            setOpacity( opacityIncrement )
        }
    }

    useEffect(() => {
        document.addEventListener('load', () => setLoaded(true) );
        oldScroll = window.scrollY;
        document.addEventListener('scroll', (e) => handleScrollEffect(e) );
    });

    return(

        <React.Fragment>
            
            { !loaded && 

                <StoreConsumer>{
                    ({loading, setLoading}) => ( loading && setLoading( false ) )
                }</StoreConsumer>

            }

            <Head>
                <title>coding-bear solutions - {content.title}</title>
            </Head>

            <MainLayout>
                <Container opacity = { opacity } >
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
                            <h2>{article.title}</h2>
                            <div>{article.content}</div>
                            <img src={article.image} />
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
                    content: "  If you think about your website as a businesscard - the best soludtion for you needs is non editable website. To build that kind of we using HTML and CSS for construct and client side java-script for programm some effects like mobile menu etc. If static website is much more advance a good practice is to build website using javascript static site frameworks like gatsby.js. \n This is a perfect solution for small businesses owners who would like only introduce company in the internet network. It is very cheap in production and hosting as well. Usually cost never exceed 400£ in production and 10£ per month for domain and hosting.",
                    image: "static/images/technologies.png"
                },
                {
                    title: "CMS website",
                    content: "  If your company needs a static website but you would like to make a changes in content very often - better solution for you is to use CMS system. It gives you a controll about content of your static website but it is still cheap on production. Prices of hosting depends on whitch content-menagment-system you will whoose. PHP based CMS like word-press are cheaper to hosting but they are deprecated and much slower than server-side javascript CMS systems. Novadays very popular solution is headless CMS system on the back and javascript framework on the front (like NetlifyCMS + react.js app on the front)",
                    image: "static/images/cms.png"
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
                    content: "React.js is a javascript framework which has been made by facebook developers. Thanks to react web devs are able to build applications better and faster than in common java-script. The main feature of react is virtual document-object-model. React stores the entire DOM of the application in memory, after changing the state searches for differences between the virtual and real DOM and updates the changes. \n The framework is very powerfull. A lot of famous brand like facebook, netflix, pinterest, instagram, etc. are using react - whole have been build in it. If you would like to see an example - just check facebook.com - this is react.",
                    image: "static/images/react-logo-1.png"
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
            description: "Maybe you don't know but backend is the most important part of. This is all of the logic of your website / application - everything what is going on under view layer.",
            content: [
                {
                    title: "How backend works?",
                    content: `Everythink what you can see on your website / webapp is your view (frontend). Backend is everything what you can't see but doing the biggest part of job - is all of the project's logic. \n When you add a new post on your blog you actually send a POST request from your client (browser) to the backend. Then backend handle your query and add your new post to database. Then your client is able to send another request (GET) if someone would like to read your new blog post and as a response backend will send content of the post. This is how it works in short. The picture below visualize for you clearly the difference between backend and frontend.`,
                    image:"static/images/backend.jpg"
                },
                {
                    title: "Our approach to backend",
                    content: "Java-script is the most popular programming language since many years, because it's one of the most intuitive, modern and practical. \n On the beginning javascript was rendered only on the browser side - the time when imperfect PHP reigned on server side. Thanks to one of the best developers across the world - Ryan Dahl, since 2009 we can run javascript everywhere. He has created node.js - the runtime for javascript out of the browser. To do this he used V8 engine - the best js interpreter created by american google. Novadays, developers are focused to improve one language, not like formerly -one for frontend, one for backend and another for differend things. Coding-bear's working with both of the languages full-stack javascript and PHP. Node.js with pleasure - PHP if it is absolutley required by customer."
                },
                {
                    title: "node.js",
                    content: 'Node is multiplatform, opensource runtime for javascript language. It contributed to the creation of the "JavaScript everywhere" paradigm and allow developers to create apps in one programming language instead of separated server layer in another (like PHP, python, C#, etc). Many companies and corporations actively use Node.js. For instance facebook, GoDaddy, Groupon, IBM, LinkedIn, Microsoft, Netflix, PayPal, Walmart, Uber, and much much more. Coding-bear uses node to create server-side layer of our applications and websites. It successfully affects on performance of server side layer of our projects.',
                    image: "static/images/node.png"
                },
                {
                    title: "Databases",
                    content: "Nowadays a lot of companies choose MongoDB, because its non SQL database - not like MySQL or PostgreSQL. This approach has a lot of benefits and a lot of defects. SQL databases are exposed for SQL injection attacks - but they have strong relations between records. Non SQL databases haven't relations but they don't use SQL language. Which one is the best? There is not a clear ansver for this question. Everything depends. Usually MongoDb is just enough for most projects but sometimes applications are very expand and needs relations beetween records. Coding-bear usually recomands MongoDB"
                },
            ]
        },
        
        android: {
            title: "Android native applications",
            image: "/static/images/mobile.png",
            description: "Nowadays every popular brand has own mobile application - even government has",
            content: [
                {
                    title: "React native",
                    content: "React is everywhere - but this time it's going with mobile solutions . It is not only for web solutions. Facebook released likewise a special version of this library for native mobile applications. Using android studio to compile code we can create very fast and modern looking apps for android devices.",
                    image: "static/images/react-native.png"
                },
                {
                    title: "We will add your application to play store",
                    content: "Application is useless if nobody knows that it exist. The best chance for your brand to be seen is put your it just into play store and observe how many people download it.",
                    image: "static/images/play-store.png"
                },
                
            ]
        },

        windows: {
            title: "Windows desktop apps",
            image: "/static/images/desktop_apps.png",
            description: "Javascript can do more than you think it can",
            content: [
                {
                    title: "Windows and linux applications",
                    content: "You need application for you bussiness but preffer a standard desktop solutions - not in browser apps? Coding-bear meets your expectations and is ready to create it for you. For now we are focused on windows 10 platform and linux only. In the future we plain to expand our offer and add mac os support as well."
                },
                {
                    title: "Electron.js",
                    content: "Electron is an open-source framework developed and maintained by GitHub - one of the most popular cloud system version controll provider. It combines the Chromium rendering engine and the Node.js runtime. Thanks to this framework the desktop applications are very modern and work amazing fast. \n Electron in universal - it allows to build offline and online desktop software.",
                    image: "static/images/electron.svg"
                },
                {
                    title: "Proton native",
                    content: "Proton Native is a small project created by kusti8 to try and create a React interface for desktop app building. Proton Native was designed as an alternative to Electron. Rather than building apps that use the overhead of Electron and web technologies, Proton Native allows you to use native widgets cross platform, all in a React environment.",
                    image: "static/images/proton.svg"
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