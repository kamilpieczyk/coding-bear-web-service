import styled from "styled-components";
import colors from "../styles/colors";
import {useState} from "react";
import ButtonArrow from "../components/buttonArrow";
import Router from "next/router";

const Container = styled.section`
    background: ${colors.third};
    border-radius: 5px;
    width: 50vw;
    padding: 10%;
    margin: auto;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
        color: ${colors.white};
    }
    input{
        height: 40px;
        width: 100%;
        border-radius: 50px;
        text-align: center;
        border: 1px solid transparent;
        margin-right: 40px;
        outline: none;

        :focus{
            border: 2px solid ${colors.main};
        }
    }
    textarea{
        height: 150px;
        width: 100%;
        border-radius: 10px;
        text-align: center;
        border: 1px solid transparent;
        margin-right: 40px;
        outline: none;

        :focus{
            border: 2px solid ${colors.main};
        }
    }
    label{
        margin: 5px;
        color: ${colors.white};
    }
    div{
        color: ${colors.white};
        margin: auto;
        display: flex;
        p{
            margin: 10px;
        }
    }
    @media (max-width: 450px){
        width: 90vw;
        margin-top: 10vh;
        /* transform: translateY(-25vh); */
    }
`;


const VoucherApp = ({email, name}) => {
    const [code, setCode] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(null);
    const [accept, setAccept] = useState(false);
    const [voucherValue, setVoucherValue] =useState(null);

    const handleNext = () => {

        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/voucher',{
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                code,
                email
            })
        })
            .then(res => res.json())
            .then(json => {
                const status = json.status;
                console.log(json);
                if(status === "used") setMessage("this voucher code has been redeemed");
                else if(status === "notExist") setMessage("invalid voucher code");
                else if(status === "ok") {
                    setAccept(true);
                    setMessage(null);
                    setVoucherValue(json.value);
                }
            })
            .catch( () => Router.push("/500"))
    }
    const handleFinnish = () => {

        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/voucher-finnish',{
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email,
                name,
                phone,
                value: voucherValue,
                description
            })
        })
            .then(res => res.json())
            .then(json => {
                const status = json.status;
                if(status === "ok") Router.push('/voucher/complete');
                else if(status === "err") setMessage("server error - try again");
            })
            .catch( () => Router.push("/500"))
    }
    if(accept) return(
        <Container>
            <section>
                <label>Please input your contact phone number</label>
                <input type="text" value={phone} onChange={(ev) => setPhone(ev.target.value)}/>
                <label>Short desctiption of your project</label>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
            </section>
                <ButtonArrow action={handleFinnish}/>
                {message && <div><p>{message}</p></div>}
        </Container>
    );
    else return(
        <>
            <Container>
                <h1>Please input your coding-bear voucher code</h1>
                <div>
                    <input type="text" value={code} onChange={(ev) => setCode(ev.target.value)}/>
                    <ButtonArrow action={handleNext}/>
                </div>
                {message && <div><p>{message}</p></div>}
            </Container>
        </>
    );
}

export default VoucherApp;