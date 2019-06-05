import styled from "styled-components";
import colors from "../styles/colors";
import {useState, useEffect} from "react";
import ButtonRed from "./buttonRed";
import Router from "next/router";

//styles for component
const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 55px 0;
    color: ${colors.third};
    input{
        border: 1px solid ${colors.second};
        border-radius: 5px;
        width: 40vw;
        height: 50px;
        outline: none;
        color: ${colors.second};
        text-align: center;
        margin: 10px 0;
        :focus{
            border-color: ${colors.main};
            color: ${colors.main};
        }
        @media (max-width: 450px){
            width: 80vw;
        }
    }
    div{
        border: 1px solid red;
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
        color: red;
        font-weight: 100;
        max-width: 40vw;
    }
    section{
        display: flex;
        flex-direction: row;
        div{
            display: flex;
            flex-direction: column;
            border: none;
            color: ${colors.third};
            margin: 0;
            padding: 0;
            input{
                width: 20vw; 
                margin: 0 4px;
                @media (max-width: 450px){
                    width: 40vw;
                }
            }
            div{
                border: 1px solid red;
                border-radius: 5px;
                margin: 10px;
                padding: 10px;
                color: red;
                font-weight: 100;
                max-width: 19vw;
            }
        }
    }
`;

const Register = () => {

    //state
    const [email, setEmail] = useState("");
    const [emailMessange, setEmailMessange] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordMessange, setPasswordMessange] = useState(null);
    const [rePassword, setRePassword] = useState("");
    const [rePasswordMessange, setRePasswordMessange] = useState(null);
    const [name, setName] = useState("");
    const [nameMessange, setNameMessange] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [companyNameMessange, setCompanyNameMessange] = useState(null);
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [websiteMessange, setWebsiteMessange] = useState("");
    const [submit, setSubmit] = useState(false);
    const [problem, setProblem] = useState(false);

    //function to handle all inputs
    const handleInputs = (e) => {
        const input = e.target.name;
        const value = e.target.value;
        const regExEmail = /[a-zA-Z0-9.-]@[a-zA-Z0-9.-]/;
        const regExPassword = /[a-zA-Z0-9!@#$%^&*_+]{8}/;
        const regEx = /[!@#$%^&*(){}[_+=,/<>?;:'"]/;

        switch(input){
            case "email":
                setEmail(value);
                if(!regExEmail.test(value)){
                    setEmailMessange("email adress is incorrect");
                    
                }
                else{
                    setEmailMessange("");
                    
                }
                break;
            case "password":
                setPassword(value);
                if(!regExPassword.test(value)){
                    setPasswordMessange("password must contains minimum 8 chaars includes upper and lower case and symbols !@#$%^&*_+");
                    
                }
                else{
                    setPasswordMessange("");
                    
                }
                break;
            case "rePassword":
                setRePassword(value);
                break;
            case "name":
                setName(value);
                if(regEx.test(value)){
                    setNameMessange('Name should not contains symbols');
                    
                }
                else{
                    setNameMessange("");
                    
                }
                break;
            case "companyName":
                setCompanyName(value);
                if(regEx.test(value)){
                    setCompanyNameMessange('company name should not contains symbols');
                    
                }
                else{
                    setCompanyNameMessange("");
                    
                }
                break;
            case "companyWebsite":
                setCompanyWebsite(value);
                if(regEx.test(value)){
                    setWebsiteMessange('aders should not contains symbols');
                    
                }
                else{
                    setWebsiteMessange("");
                    
                }
                break;
            default: break;
        }
    }
    //function for send form
    const sendForm = () => {
        setSubmit(true);
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/register',{
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                company: companyName,
                website: companyWebsite
            })
        })
            .then(res => res.json())
            .then(json => {
                const status = json.status;
                if(status === "ok"){
                    Router.push("/accountcreated")
                }
                else if(status === "exist"){
                    setEmailMessange("this email exist in database");
                    setSubmit(false);
                }
                else if(status === "emailEmpty"){
                    setEmailMessange("fill email field");
                    setSubmit(false);
                }
                else if(status === "passwordEmpty"){
                    setPasswordMessange("fill password field");
                    setSubmit(false);
                }
                else if(status === "nameEmpty"){
                    setNameMessange("fill name and surname field");
                    setSubmit(false);
                }
                else if(status === "companyEmpty"){
                    setCompanyNameMessange("fill company name field");
                    setSubmit(false);
                }
                else{
                    console.log(json)
                }
            })
            .catch( err => Router.push("/500"));

    }
    // component did update
    useEffect(() => {
        if(password !== rePassword){
            setRePasswordMessange("passwords must be exactly the same");
            
        }
        else{
            setRePasswordMessange("");
            
        }
        if( emailMessange || passwordMessange || rePasswordMessange || nameMessange || companyNameMessange || websiteMessange){
            setProblem(true);
        }
        else{
            if(problem) setProblem(false);
        }
    })
    //return JSX to render
    return(
        <Container>
            <label>email adress:</label>
            <input name="email" type="email" placeholder="example@email.co.uk" value={email} onChange={handleInputs}/>
            { emailMessange ? <div>{emailMessange}</div> : null}

            <label>password:</label>
            <input name="password" type="password" placeholder="password" value={password} onChange={handleInputs}/>
            { passwordMessange ? <div>{passwordMessange}</div> : null}

            <label>confirm password:</label>
            <input name="rePassword" type="password" placeholder="password" value={rePassword} onChange={handleInputs}/>
            { rePasswordMessange ? <div>{rePasswordMessange}</div> : null}

            <section>
                <div>
                    <label>name and surname:</label>
                    <input name="name" type="text" placeholder="ex. John Smith" value={name} onChange={handleInputs}/>
                    { nameMessange ? <div>{nameMessange}</div> : null}
                </div>

                <div>
                    <label>company name:</label>
                    <input name="companyName" type="text" placeholder="ex. coding-bear" value={companyName} onChange={handleInputs}/>
                    { companyNameMessange ? <div>{companyNameMessange}</div> : null}
                </div>
            </section>

            <label>company website (if exist):</label>
            <input name="companyWebsite" type="text" placeholder="ex. coding-bear" value={companyWebsite} onChange={handleInputs}/>
            { websiteMessange ? <div>{websiteMessange}</div> : null}

            {
                problem ? <div>to unlock button resolve the problems</div> : !submit ? <ButtonRed rounded action={sendForm} title="sign up"/> : <img src="/static/images/loader.gif" alt="loader" />
            }

        </Container>
    )
}

export default Register;