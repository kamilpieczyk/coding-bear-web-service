import React, { useState, useEffect } from "react"
import styled from "styled-components"
import colors  from '../styles/colors'
import ButtonRed from "../components/buttonRed";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    h1{
        color: ${colors.main};
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 10vw;
    border-radius: 10px;
    background: white;
    padding: 20px 30px;
    width: 80%;
    min-height: 60vh;
    input[type=text]{
        border: 1px solid ${ colors.main };
        border-radius: 5px;
        padding: 5px;
        text-align: center;
        width: 50%;
        margin: 30px 0;
        @media(max-width: 450px){
            width: 80%
        }
    }
    div{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 10px;
        width: 50%;
        @media(max-width: 450px){
            width: 100%
        }
    }
    p{
        text-align: justify;
    }
`;

const ChooseOptionsContainer = styled.div`
    display: block !important;
    margin: 0;
    position: relative;
    transform: translateX(25%);
    @media(max-width: 450px){
        transform: none;
    }
`;

const ChooseOptionsButton = styled.div`
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    position: relative;
    cursor: pointer;

    div:first-child{
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        width: 150px;
        height: 40px;
        background: ${colors.darkWhite};
        color: ${ colors.second };
        border-radius: 10px 0 0 10px;
    }

    div:nth-child(2){
        background: ${ colors.third };
        height: 40px;
        width: 40px;
        border-radius: 0 10px 10px 0;
    }

`;

const ChooseOptionsNav = styled.nav`
    position: absolute;
    left: 35px;
    top: 20px;
    overflow: ${ props => props.visible ? "auto" : "hidden"};
    height: ${ props => props.visible ? "200px" : "0"};
    width: 150px;
    opacity: ${ props => props.visible ? "1" : "0"};
    transition: .3s;
    background: ${ colors.darkWhite };
    border-radius: 10px;
    color: ${ colors.second };
    div{
        width: 100%;
        text-align: center;
        padding: 3px 0;
        cursor: pointer;
        :hover{
            background: ${ colors.main };
        }
    }
    div:not(:last-child){
        border-bottom: 1px dotted ${ colors.main };
    }
    @media (max-width: 450px){
        left: 20px;
    }
`;

const TextArea = styled.textarea`
    width: 50%;
    height: 250px;
    border-radius: 10px;
    border: 1px solid ${ colors.main };
    @media (max-width: 450px){
        width: 90%;
    }
`;

const TextInput = ({value, changeEv, placeholder, label}) => (
    <React.Fragment>
        <label>{ label }</label>
        <input 
            type = "text" 
            value = { value } 
            onChange = { (e) => changeEv(e.target.value) }
            placeholder = { placeholder }
        />
    </React.Fragment>
)

const ChooseInput = ({ label, options, choosen, chooseAction }) => {
    const [visible, setVisible] = useState(false);

    return(
        <React.Fragment>
            <label>{ label }</label>
            <ChooseOptionsContainer>

                <ChooseOptionsButton onClick={ () => setVisible(!visible)}>
                    <div>{ choosen ? choosen.slice(0,10) + "..." : options[0] }</div>
                    <div><img src="/static/images/down_arrow.png" alt="arrow" width="30%"/></div>
                </ChooseOptionsButton>

                <ChooseOptionsNav visible={ visible }>{
                    options.map( option => (
                        <div 
                            key={ option } 
                            onClick={ () => { chooseAction(option); setVisible(false) } }
                        >{ option }</div>
                    ) )
                }</ChooseOptionsNav>
                
            </ChooseOptionsContainer>
        </React.Fragment>
    )
}

const TextareaInput = ({ label, value, changeAction }) => {
    return(
        <React.Fragment>
            <label>{ label }</label>
            <TextArea value={ value } onChange={ (e) => changeAction(e.target.value)} />
        </React.Fragment>
    )
}

export default () => {
    const [ stage, setStage ] = useState(0);
    const [ company, setCompany ] = useState('');
    const [ name, setName ] = useState('');
    const [ companyFunction, setCompanyFunction ] = useState('');
    const [ kindOfService, setKindOfService ] = useState(null);
    const [ budget, setBudget ] = useState(null);
    const [ visualInentyfi, setVisualInentyfi ] = useState(null);
    const [ deadline, setDeadline ] = useState(null);
    const [ description, setDescription ] = useState(null);

    return(
        <Container>
            <h1>Add new project</h1>
            <Form>

                { stage === 0 && 
                    <p>Welcome in adding a new project section. We are happy to see that you decided to use our services. Now you need to go through a few simple steps before your new project will be added. Please answer the questions on the screen - It won't take a long time. We speak two languages so if you don't feel comfortable to answer in English we understand Polish as well.<br/><br/><br/>*Regards coding-bear team</p> 
                }

                { stage === 1 && 
                    <TextInput 
                        value={ company } 
                        changeEv={ setCompany } 
                        placeholder="company name" 
                        label="Please put your company full name:"
                    /> 
                }

                { stage === 2 && 
                    <TextInput 
                        value={ name } 
                        changeEv={ setName } 
                        placeholder="your full name" 
                        label="Please put your full name:"
                    /> 
                }
                
                { stage === 3 && 
                    <TextInput 
                        value={ companyFunction } 
                        changeEv={ setCompanyFunction } 
                        placeholder="function in company"
                        label={`what is your function in the ${ company ? company : "company" }?`}
                    /> 
                }

                { stage === 4 && 
                    <ChooseInput 
                        label="What kind of service do you need?"
                        options={[
                            "choose one",
                            "static website",
                            "static website with CMS",
                            "web application",
                            "server side rendered web application",
                            "backend for existing web application",
                            "mobile application for android devices",
                            "windows desktop application"
                        ]}
                        choosen={ kindOfService }
                        chooseAction={ setKindOfService }
                    />
                }
                
                { stage === 5 && 
                    <ChooseInput 
                        label="How big is your budget for this project?"
                        options={[
                            "choose one",
                            "less than £500",
                            "£500-£1000",
                            "£1000-£1500",
                            "£1500-£2000",
                            "£2000-£3000",
                            "£3000-£4000",
                            "more than £4000"
                        ]}
                        choosen={ budget }
                        chooseAction={ setBudget }
                    />
                }

                { stage === 6 && 
                    <ChooseInput 
                        label="Has your company visual identyfication system?"
                        options={[
                            "choose one",
                            "no",
                            "yes"
                        ]}
                        choosen={ visualInentyfi }
                        chooseAction={ setVisualInentyfi }
                    />
                }
                
                { stage === 7 && 
                    <ChooseInput 
                        label="When do you need your project ready?"
                        options={[
                            "choose one",
                            "ASAP",
                            "for 3 mth",
                            "for 4 mth",
                            "for 5 mth",
                            "for 6 mth",
                            "more than 6 mth",
                        ]}
                        choosen={ deadline }
                        chooseAction={ setDeadline }
                    />
                }
                
                { stage === 8 && 
                    <TextareaInput
                        label="Describe your project"
                        value={ description }
                        changeAction={ setDescription }
                    />
                }
                
                { stage === 9 && 
                    <React.Fragment>
                        <label>thank you!</label>
                        <p>That was the last question. Please make sure that your answers are truthfully and correct. Once you're ready click on the finish button.</p>

                        <ButtonRed
                            rounded
                            title="add new project" 
                            action={ (e) => { 
                                e.preventDefault(); 
                                console.log("send") 
                            } } 
                        />

                    </React.Fragment>
                }

                <div>
                    { stage > 0 && 
                        <ButtonRed
                            title="< prev" 
                            action={ (e) => { e.preventDefault(); setStage(stage-1); } } 
                        />
                    }
                    { stage < 9 &&
                        <ButtonRed 
                            title="next >" 
                            action={ (e) => { e.preventDefault(); setStage(stage+1); } } 
                        />
                    }
                </div>
                
            </Form>
        </Container>
    )
}