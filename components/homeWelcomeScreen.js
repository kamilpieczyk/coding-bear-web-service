import styled from "styled-components";
import colors from '../styles/colors';
import { useState, useEffect } from 'react';
import ButtonArrow from './buttonArrow';

const Container = styled.section`
    width: 100vw;
    height: 625px;
    background: url('/static/images/Group_26.png');
    background-size: 100vw 625px;
    background-repeat: no-repeat;
    margin-top: 0;
    position: relative;

    @media (max-width: 768px){
        height: 100vh;
        background: url('/static/images/mobilebg.png');
        background-repeat: no-repeat;
        background-size: 100vw 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const ImageContainer = styled.div`
    position: absolute;
    top: 15vh;
    right: 50vw;
    img{
        position: absolute;
    }
    img:first-child{
        z-index: 50;
        animation: database 3s infinite ease-out;
    }
    img:nth-child(2){
        z-index: 49;
        top: 180px;
    }
    img:nth-child(3){
        z-index: 48;
        top: 240px;
        animation: database-shadow 3s infinite ease-out;
    }

    @media (max-width: 450px){
        display: none;
    }

    @media (max-width: 768px){
        right: 70vw;
    }

    @keyframes database{
        0%{
            top: 0;
        }
        50%{
            top: -10px;
        }
        100%{
            top: 0;
        }
    }

    @keyframes database-shadow{
        0%{
            top: 240px;
        }
        50%{
            top: 250px;
        }
        100%{
            top: 240px;
        }
    }
`;

const Content = styled.div`
    position: absolute;
    top: 120px;
    left: 10vw;
    h1{
        color: ${ colors.white };
        font-weight: 600;
        width: 250px;
        font-size: 1.5rem;
        margin-bottom: 5px;
    }
    p{
        color: ${ colors.white };
        font-weight: 100;
        width: 260px;
        font-size: 1.2rem;
        margin-top: 0;
    }
    @media (max-width: 450px){
        position: static;
    }
    
`;

const SpecialOffers = styled.div`
    position: absolute;
    bottom: 100px;
    left: 12.81vw;
    width: 290px;
    text-align: center;
    margin: 0 7vw;
    color: ${ colors.second };
    div{
        display: flex;
        margin: 20px 10%;
        
        input{
            border: none;
            border-radius: 50px;
            background: ${ colors.white };
            height: 40px;
            text-align: center;
            margin: 0 5px;
            outline: none;
        }
    }
    @media (max-width: 450px){
        position: static;
        margin: 0;
    }

    @media (max-width: 768px){
        bottom: 150px;
    }
`;

const LazyLoader = styled.img`
    width: 30px;
    height: 30px;
`;

const MessangeContainer = styled.div`
    color: ${ colors.white };
    font-size: .8rem;
`;

const HomeWelcomeScreen = ({title, content}) => {
    //component state
    const [ specialOfferValue, setSpecialOfferValue ] = useState("");
    const [ validation, setValidation ] = useState(true);
    const [ loader, setLoader ] = useState(false);
    const [ messange, setMessange ] = useState(null);
    // const [ title, setTitle ] = useState('loading...');
    // const [ content, setContent ] = useState('loading...');

    // component did mount

    // useEffect( () => {
    //     fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/home')
    //     .then( res => res.json() )
    //     .then( homeContent => {
    //         setTitle(homeContent[0].homeWelcomeScreen.title);
    //         setContent(homeContent[0].homeWelcomeScreen.content);
    //     })
    // })

    //post email function
    const addEmail = () => {
        //change loader state
        setLoader(true);
        //preparing body to post
        let body = {
            email: specialOfferValue
        }
        body = JSON.stringify(body);
        //post data to backend 
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/subscribe-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
            .then( res => res.json() )
            .then( res => {
                setLoader(false);
                console.log( res );
                if( res.status === "exist" ){
                    setMessange('this email alredy exist in database');
                }
                else{
                    setMessange('your email adress has been added - thank you');
                }
            } )
            .catch( err => {
                setMessange('database connection problem, try again later');
            } );
    }

    const handleEmailForm = e => {
        //handling input for email subscription
        setSpecialOfferValue( e.target.value );
        //validation
        const reg = /[a-zA-Z0-9.-]@[a-zA-Z0-9.-]/;
        const test = reg.test(e.target.value);
        if( !test ) {
            setMessange('this email adress is not valid');
            setValidation(false);
        }
        else{
            if( !validation ) {
                setValidation(true);
                setMessange('');
            }
        };
    }

    return(
        <Container>

            <ImageContainer>
                <img src="/static/images/database.png" alt="database"/>
                <img src="/static/images/database-shadow.png" alt="database-shadow"/>
                <img src="/static/images/database-shadow.png" alt="database-shadow"/>
            </ImageContainer>

            <Content>
                <h1>{ title }</h1>
                <p>{ content }</p>
            </Content>

            <SpecialOffers>
                put your email adress below if you woud like to know about special offers ( I promise to not send a spam )
                <div>
                    <input 
                        type="text" 
                        placeholder="put your email adress" 
                        value={ specialOfferValue }
                        onChange={ handleEmailForm }
                    />

                    { !loader ?
                        validation ? <ButtonArrow action={ addEmail }/> : null :
                        <LazyLoader src="/static/images/loader.gif" alt="loader" />
                    }

                </div>

                { messange ?
                    <MessangeContainer> { messange } </MessangeContainer> :
                    null
                }

            </SpecialOffers>

        </Container>
    )
}

export default HomeWelcomeScreen;