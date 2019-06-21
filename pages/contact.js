import React, { useState, useEffect }from "react"
import styled from 'styled-components'
import MainLayout from '../layouts/mainLayout'
import Head from 'next/head'
import colors from '../styles/colors'
import { StoreConsumer } from "../context/store.context"
import ButtonRed from "../components/buttonRed";

const MapContainer = styled.div`
    padding-top: 75px;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(130deg, ${colors.main}, ${colors.third});
    display: flex;
    color: ${ colors.white };
    text-align: center;
    iframe{
        flex: 1;
        height: 100%;
        border: 0;
    }
    div{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    *{
        margin: 10px 0;
    }

    input[ type = text ]{
        color: ${ colors.darkWhite };
        border: none;
        border-bottom: 1px solid ${ colors.darkWhite };
        background: none;
        outline: none;
        width: 50%;
        height: 30px;
        transition: .5s;

        ::placeholder{
            color: ${ colors.darkWhite };
        }

        :focus{
            color: ${ colors.second };
            border-bottom: 2px solid ${ colors.second };
            ::placeholder{
                color: ${ colors.second };
            }
        }
    }

    textarea{
        width: 50%;
        height: 100px;
        resize: none;
        border: none;
        background: ${ colors.white };
        border-radius: 5px;
    }
`;

export default () => {
    const  [ loaded, setLoaded ] = useState(false);
    const  [ form, setForm ] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        msg: ""
    });
    const  [ formLoading, setFormLoading ] = useState(false);
    const [ formSentTrue, setFormSentTrue ] = useState(false);
    const  [ formResMsg, setFormResMsg ] = useState(null);

    useEffect( () => {
        document.addEventListener('load', () => setLoaded(true) );
    }, [])

    const handleFormInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if( name === "name" ){
            setForm({
                ...form,
                name: value
            })
        }
        else if( name === "phone" ){
            setForm({
                ...form,
                phone: value
            })
        }
        else if( name === "email" ){
            setForm({
                ...form,
                email: value
            })
        }
        else if( name === "subject" ){
            setForm({
                ...form,
                subject: value
            })
        }
        else{
            setForm({
                ...form,
                msg: value
            })
        }
    }

    const sendForm = (e) => {
        e.preventDefault();
        setFormLoading(true)
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/contact', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                phone: form.phone,
                subject: form.subject,
                msg: form.msg
            })
        })
            .then( res => res.json() )
            .then( json => {
                const status = json.status;
                if( status === "ok"){
                    setFormResMsg("Your message has been send");
                    setFormLoading(false);
                    setFormSentTrue(true);
                }
                else {
                    setFormResMsg("email sending error - try again");
                    setFormLoading(false);
                }
            })
            .catch( err => {
                setFormResMsg("Internet connection problem - try again later");
                setFormLoading(false);
            } )
    }

    return(
        <MainLayout>
            <Head>
                <title>Contact with coding-bear || coding-bear.co.uk</title>
            </Head>

            { !loaded && 
                <StoreConsumer>{
                    ({loading, setLoading}) => ( loading && setLoading( false ) )
                }</StoreConsumer>

            }

            <MapContainer>
                <div>
                    <h1>Contact us</h1>
                    { formSentTrue
                        ? <div>{ formResMsg }</div>
                        : <Form>
                            <input 
                                type="text" 
                                value={ form.name } 
                                name="name" placeholder="Name and Surname" 
                                onChange={ handleFormInput } 
                            />
                            <input 
                                value={ form.phone }
                                type="text" 
                                name="phone" 
                                placeholder="Phone number" 
                                onChange={ handleFormInput } 
                            />
                            <input 
                                value={ form.email }
                                type="text" 
                                name="email" 
                                placeholder="Email adress" 
                                onChange={ handleFormInput } 
                            />
                            <input 
                                value={ form.subject }
                                type="text" 
                                name="subject" 
                                placeholder="Message's subject" 
                                onChange={ handleFormInput }
                            />
                            <textarea name="msg" placeholder="Please enter your contact message" value={ form.msg } onChange={ handleFormInput }></textarea>
                            { formLoading
                                ? <div>...sending form</div>
                                : <ButtonRed title="send message" action={ (e) => sendForm(e) }/>
                            }
                            <div>{ formResMsg }</div>
                        </Form>
                    }
                </div>

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d299.81692257456837!2d-2.9939235140545692!3d53.04668711909766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2566c64d45e46e7f!2sWrexham+Enterprise+Hub!5e0!3m2!1spl!2suk!4v1561114397830!5m2!1spl!2suk" frameborder="0" allowfullscreen></iframe>
            </MapContainer>

        </MainLayout>
    )
}