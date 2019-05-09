import styled from "styled-components";
import colors from '../styles/colors';
import { useState } from 'react';
import ButtonArrow from './buttonArrow';

const Container = styled.section`
    width: 100vw;
    height: 100vh;
    background: url('/static/images/Group_26.png');
    background-size: 100vw 100vh;
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
`;

const HomeWelcomeScreen = ({ title, content }) => {
    const [ specialOfferValue, setSpecialOfferValue ] = useState("");

    const addEmail = () => {
        // const body = new FormData();
        // body.append("email", specialOfferValue);
        let body = {
            email: specialOfferValue
        }
        body = JSON.stringify(body);
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/subscribe-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
            // .then(res => res.json())
            .then(status => console.log(status.json()))
            .catch(err => console.log(err));
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
                        onChange={ (e) => setSpecialOfferValue( e.target.value ) }
                    />
                    <ButtonArrow action={ addEmail }/>
                </div>
            </SpecialOffers>

        </Container>
    )
}

export default HomeWelcomeScreen;