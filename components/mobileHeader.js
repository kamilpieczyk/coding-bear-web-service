import styled from "styled-components";
import Link from "next/link";
import colors from "../styles/colors";
import {useState, useEffect} from "react";
import {StoreConsumer} from "../context/store.context";
import ButtonRed from "./buttonRed";
import UserMenuMobile from "./userMenuMobile";
import cookie from "browser-cookies";
import Router from "next/router";

const Container = styled.nav`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10%;
    width: 100vw;
    height: ${ ({scrolled}) => scrolled ? "65px" : "75px" };
    background-color: ${ ({scrolled}) => scrolled ? colors.darkWhite : colors.white };
    box-shadow: ${ ({scrolled}) => scrolled ? "0px 0px 5px grey" : "none"};
    transition: .3s;
    z-index: 100;
    img{cursor:pointer;}
`;

const Button = styled.div`
    width: 10vw;
    height: 70%;    
    cursor: pointer;
    div{
        width: 100%;
        height: 3px;
        transition: .2s;
        background: ${( {active}) => active ? colors.main : colors.grey};
        margin: 8px 0;
    }
    div: nth-child(1){
        transform: ${ props => !props.active ? "none" : "rotate(45deg) translateY(15px)"};
    }
    div: nth-child(3){
        transform: ${ props => !props.active ? "none" : "rotate(-45deg) translateY(-15px)"};
    }
    div: nth-child(2){
        opacity: ${ props => props.active ? 0 : 1};
    }
`;

const Menu = styled.div`
    position: fixed;
    top: ${props => props.scrolled ? "65px" : "75px"};
    left: 50%;
    transform: translate(-50%);
    z-index: 55;
    height: ${props => props.active ? "70vh" : 0};
    opacity: ${props => props.active ? 1 : 0};
    overflow: hidden;
    width: 90vw;
    background: ${colors.darkWhite};
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: .3s;
    box-shadow: 0px 0px 5px grey;
    a{
        color: ${colors.main};
        font-size: 1.4rem;
        text-decoration: none;
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a{
            font-size: 1rem;
            color: ${colors.second};
            margin: 5px 0;
        }
    }
`;

const SignIn = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    input{
        margin: 10px 0;
        border: 1px solid ${colors.grey};
        border-radius: 5px;
        height: 35px;
        text-align: center;
        :focus{
            border: 1px solid ${colors.main};
        }
    }
`;

const MessangeLogin = styled.div`
    margin: 10px 0;
    padding 8px;
    border: 1px solid red;
    border-radius: 5px;
`;

const MobileHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(false);
    const [menu, setMenu] = useState(null);
    const [submenu, setSubmenu] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[message, setMessage] = useState(null);

    const scroll = () => {
        const scroll = window.scrollY;
        if(scroll > 350) setScrolled(true);
        else setScrolled(false);

        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if(scroll > 350) setScrolled(true);
            else setScrolled(false);
        })
    }

    const handleSignOut = () => {
        cookie.erase('passport');
        location.replace('/');
    }

    const handleLogin = () => {
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/signin',{
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                const status = json.status;
                if(status === "ok"){
                    location.replace("/");
                }
                else if(status === "notApproved"){
                    setMessage("please confirm your email before you login")
                }
                else{
                    setMessage("invalid email or password")
                }
            })
            // .catch( err => Router.push("/500"))
    }
    
    useEffect( () => {
        scroll();
        fetch("/api/9b859fee-242d-4e66-bde3-7febc4c77b95/menu")
            .then(res => res.json())
            .then(menu => setMenu(menu))
            // .catch(Router.push("/500"));
    }, [])

    return(
        <>
            <Container scrolled = {scrolled}>
                <Link href="/"><a>
                    {scrolled
                        ? <img src="/static/images/bears_head.png" alt="logo" height="42px"/>
                        : <img src="/static/images/Group 24.png" alt="logo" />
                    }
                </a></Link>

                <Button active = {active} onClick={() => setActive(!active)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </Button>

            </Container>

            <Menu active = {active} scrolled = {scrolled}>
                {!menu
                    ? <img src="/static/images/loader.gif" alt="...loading" />
                    : menu.map(el => (
                        el.submenu
                            ? <>
                                <a key={el.title} onClick = {() => setSubmenu(!submenu)}>{el.title}</a>
                              
                              <div>
                                {submenu && el.submenu.map(subEl => (
                                    subEl.map(link => (
                                        <Link href={{ pathname: '/solutions', query: { name: link.to }}} key={link.name}>
                                            <a>{link.name}</a>
                                        </Link>
                                    ))
                                ))}
                              </div></>

                            : <Link href={el.to} key={el.title}>
                                <a>{el.title}</a>
                              </Link>
                    ))}
                    <StoreConsumer>
                        {({user}) => (
                            user.logged
                                ? <div>
                                    <UserMenuMobile name={user.name}/>
                                    <ButtonRed title="sign out" action={handleSignOut} />
                                  </div>
                                : <div>
                                    <ButtonRed title="sign up" to="/signup" />

                                    <SignIn>
                                        <input 
                                            type="text" 
                                            value={user.username} 
                                            placeholder="email adress"
                                            name="login"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <input 
                                            type="password" 
                                            value={user.password} 
                                            placeholder="password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {/* if incorrect login show this message */}
                                        {message 
                                                ? <MessangeLogin>{message}</MessangeLogin> 
                                                : null
                                        }
                                        <ButtonRed rounded title="sign in" action={handleLogin}/>
                                    </SignIn>
                                  </div>
                        )}
                    </StoreConsumer>
            </Menu>
        </>
    )
}

export default MobileHeader;