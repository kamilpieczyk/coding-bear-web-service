import { Component } from 'react'
import styled from 'styled-components'
import colors from '../styles/colors'
import Link from 'next/link'
import ButtonRed from './buttonRed'
import {StoreConsumer} from "../context/store.context"
import cookie from "browser-cookies"
import UserMenu from "./userMenu"

const Container = styled.nav`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10%;
    width: 100%;
    height: ${props => props.scrolled ? "65px" : "75px"};
    background-color: ${props => props.scrolled ? colors.darkWhite : colors.white};
    box-shadow: ${props => props.scrolled ? "0px 0px 5px grey" : "none"};
    top: 0;
    right: 0;
    z-index: 100;
    transition: .3s;

    div:nth-child(2){
        display: flex;        
    }

    @media (max-width: 1050px) {
        padding: 0 2%;
    }
`;

const MenuItem = styled.div`
    margin: 0 10px;
    a{
        color: ${ colors.grey };
        text-decoration: none;
        transition: .2s;

        :hover{
            color: ${ colors.third };
        }
    }
`;

const MenuItemSpecial = styled.div`
    margin: 0 10px;
    color: ${ colors.grey };
    text-decoration: none;
    transition: .2s;
    cursor: pointer;
    display: flex;
    div{
        overflow: hidden;
        transition: .2s;
        width: 0;
        opacity: 0;
        margin: 0 3px;
    }

    :hover{
        color: ${ colors.third };
        div{
            width: 24px;
            opacity: 1;
        }
    }
`;

const SocialMediaIcons = styled.div`
    a{
        margin-right: 10px;
    }
`;

const SearchBox = styled.div`
    overflow: hidden;
    position: absolute;
    top: 80px;
    left: ${ props => props.position ? props.position + 'px' : 0 };
    width: 350px;
    height: ${ props => props.display ? "150px" : "0px"};
    opacity: ${ props => props.display ? "1" : "0"};
    background: ${ colors.white };
    border-radius: 5px;
    transition: .2s;
    display: flex;
    align-items: center;
    justify-content: center;

    div{
        border: 1px solid ${ colors.main };
        height: 45px;
        width: 230px;
        border-radius: 5px 0 0 5px;
        input{
            border: none;
            outline: none;
            width: 225px;
            height: 39px;
            text-align: center;
            margin-top: 2px;
        }
    }

    button{
        height: 45px;
        width: 55px;
        background: ${ colors.main };
        border: none;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
    }
`;

const Submenu = styled.div`
    background: ${ colors.darkWhite };
    position: fixed;
    display: flex;
    justify-content: center;
    top: ${ props => props.visible ? "80px" : "70px" };
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    height: ${ props => props.visible ? "200px" : 0 };
    opacity: ${ props => props.visible ? 1 : 0 };
    width: 90%;
    transition: .3s;
    padding: ${ props => props.visible ? "30px 10px" : 0 };
    border-radius: 7px;
    box-shadow: 0px 0px 5px ${colors.grey};

    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        :not(:last-child)::after{
            content:"";
            position: absolute;
            right: 0;
            top: 0;
            border-right: 1px dotted ${colors.main};
            height: 100%;
        }
    }

    div{
        display: flex;
        margin: 0 10px 30px 20px;
        align-items: center;
        h1{
            margin: 0 10px;
            color: ${ colors.main };
            font-weight: 100;
        }
    }

    a{
        color: ${ colors.main };
        text-decoration: none;
        font-weight: 100;
        :hover{
            text-decoration: underline;
        }
        ::before{
            content: "-";
        }
    }
`;

const SignIn = styled.div`
    position: fixed;
    top: 80px;
    left: ${props => props.position}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${props => props.visible ? "220px" : 0};
    opacity: ${props => props.visible ? 1 : 0};
    width: 350px;
    background: ${colors.darkWhite};
    border-radius: 5px;
    transition: .3s;
    overflow: hidden;
    box-shadow: 0px 0px 5px ${colors.grey};

    input{
        margin: 10px 0;
        border: 1px solid ${colors.third};
        border-radius: 5px;
        height: 45px;
        width: 80%;
        background: ${colors.darkWhite};
        text-align: center;
        :focus{
            outline: none;
            background: ${colors.white};
        }
    }
`;

const MessangeLogin = styled.div`
        margin: 5px;
        color: red;
        font-weight: 100;
        font-size: .8rem;
`;

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            menu: null,
            scrolled: false,
            submenu: false,
            search: false,
            signIn: false,
            searchBoxPosition: null,
            signInPosition: null,
            searchInput: {
                value: ""
            },
            login: {
                username: "",
                password: "",
                message: null
            }
        }
    }

    handleSearchClick = () => {
        this.setState({
            search: !this.state.search,
            submenu: false,
            signIn: false
        })
    }

    handleSearch = (e) => {
        const value = e.target.value;
        this.setState({
            searchInput: {
                ...this.state.searchInput,
                value
            }
        })
    }

    handleSignIn = () => {
        this.setState({
            signIn: !this.state.signIn,
            search: false,
            submenu: false
        })
    }

    handleSignOut = () => {
        cookie.erase('passport');
        location.replace('/');
    }

    handleSignInInputs = e => {
        const input = e.target.name;
        if(input === "login"){
            this.setState({
                login: {
                    ...this.state.login,
                    username: e.target.value
                }
            })
        }
        else if(input === "password"){
            this.setState({
                login: {
                    ...this.state.login,
                    password: e.target.value
                }
            })
        }
    }

    handleLogin = () => {
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/signin',{
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email: this.state.login.username,
                password: this.state.login.password
            })
        })
            .then(res => res.json())
            .then(json => {
                const status = json.status;
                if(status === "ok"){
                    location.replace("/");
                }
                else if(status === "notApproved"){
                    this.setState({
                        login: {
                            ...this.state.login,
                            message: 'please confirm your email before you login'
                        }
                    })
                }
                else{
                    this.setState({
                        login: {
                            ...this.state.login,
                            message: 'invalid email or password'
                        }
                    })
                }
            })
            // .catch( err => Router.push("/500"));
    }

    handleSubmenuClick = (e) => {
        e.preventDefault();
        this.setState({
            submenu: !this.state.submenu,
            search: false,
            signIn: false
        })
    }

    componentWillUnmount(){
        document.removeEventListener('scroll', (ev) => {
            const scroll = window.scrollY;
            if(scroll > 100){
                this.setState({
                    scrolled: true
                })
            }
            else{
                this.setState({
                    scrolled: false
                })
            }
        })
    }

    componentDidMount(){
        // fetch menu from api
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/menu')
            .then( res => res.json() )
            .then( menu => {
                this.setState({
                    menu
                })
            })
            // .catch( err => Router.push("/500"));
        // set elements position in menu
        const searchBoxPosition = document.getElementById('search').offsetLeft;
        if(document.getElementById('signIn')){
            const signInPosition = document.getElementById('signIn').offsetLeft;
            this.setState({
                signInPosition
            });
        }

        this.setState({
            searchBoxPosition,
        });

        document.addEventListener('scroll', (ev) => {
            const scroll = window.scrollY;
            if(scroll > 100){
                this.setState({
                    scrolled: true
                })
            }
            else{
                this.setState({
                    scrolled: false
                })
            }
        })
        
    }

    render(){
        return(
            <Container scrolled = {this.state.scrolled}>

                <div>
                    {/* logo container */}
                    <Link href='/'>
                        <a><img src="/static/images/Group 24.png" alt="logo"/></a>
                    </Link>
                </div>

                <div>
                    {/* menu container */}
                    { this.state.menu !== null ? 
                        this.state.menu.map( el => (
                            <StoreConsumer>{ ({setLoading, loading}) => (
                                <MenuItem key={ el.title }>
                                    <Link href={ el.to }>
                                    { el.submenu ? 
                                        <a onClick={ this.handleSubmenuClick }>{ el.title }</a> :
                                        <a onClick = { () => setLoading(true) }>{ el.title }</a>
                                    }
                                    </Link>
                                </MenuItem>
                            )}</StoreConsumer>
                        ) ) :
                    null }
                    {/* menu special items (search sign in) */}
                    <MenuItemSpecial onClick={ this.handleSearchClick } id="search">
                        <div><img src="/static/images/baseline-search-24px.png" /></div>
                        Search
                    </MenuItemSpecial>
                    
                    {/* add global store consumer */}
                    <StoreConsumer>
                        {({user}) => (
                            !user.logged

                                ?<MenuItemSpecial onClick={this.handleSignIn} id="signIn">
                                    Sign in
                                    <div>
                                        <img src="/static/images/Path 102.png" />
                                    </div>
                                </MenuItemSpecial>

                                :<MenuItemSpecial onClick={this.handleSignOut}>
                                    Sign out
                                    <div>
                                        <img src="/static/images/signout.png" />
                                    </div>
                                </MenuItemSpecial>
                        )}
                    </StoreConsumer>

                </div>

                    <SocialMediaIcons>
                        <a href="https://github.com/codingbearuk"><img src="/static/images/git.png" alt=""/></a>
                        <a href="https://www.facebook.com/CodingBearUK"><img src="/static/images/facebook.png" alt=""/></a>
                    </SocialMediaIcons>

                <div>
                    <StoreConsumer>
                            { ({user, setLoading}) => (
                                user.logged
                                ? <UserMenu name={user.name} />
                                : <ButtonRed 
                                    title = 'SIGN UP' 
                                    to='/signup' 
                                    action ={() => setLoading(true)}
                                   />
                            )}
                    </StoreConsumer>
                </div>

                <SearchBox
                // search box is visible only after click in search button
                    display={ this.state.search } 
                    position={ this.state.searchBoxPosition }
                >
                    <div>
                        <input 
                            type='text'
                            placeholder='search'
                            value={ this.state.search.value }
                            onChange={ this.handleSearch }
                        />
                    </div>

                    <button>
                        <img src="/static/images/search.png" alt="search-icon"/>
                    </button>
                </SearchBox>

                <SignIn visible={this.state.signIn} position={this.state.signInPosition}>
                    <input 
                        type="text" 
                        value={this.state.login.username} 
                        placeholder="email adress"
                        name="login"
                        onChange={this.handleSignInInputs}
                    />
                    <input 
                        type="password" 
                        value={this.state.login.password} 
                        placeholder="password"
                        name="password"
                        onChange={this.handleSignInInputs}
                    />
                    {/* if incorrect login show this message */}
                    {this.state.login.message ? <MessangeLogin>{this.state.login.message}</MessangeLogin> : null}
                    <ButtonRed rounded title="sign in" action={this.handleLogin}/>
                </SignIn>

                {/* submenu for solutions */}
                <StoreConsumer>{ ({setLoading}) => (

                    this.state.menu 
                        ? <Submenu visible={ this.state.submenu }>

                            <section>
                                <div>
                                    <img src="/static/images/solutions_frontend.png" alt="frontend"/>
                                    <h1>Frontend web solutions</h1>
                                </div>

                                { this.state.menu[2].submenu[0].map( el => (
                                <Link key={ el.name } href={ { pathname: '/solutions', query: { name: el.to } } }>
                                    <a onClick = {() => {
                                        this.setState({submenu: false});
                                        setLoading(true);
                                    }}>{ el.name }</a>
                                </Link>
                            )) }

                            </section>

                            <section>
                                <div>
                                    <img src="/static/images/solutions_backend.png" alt="backend"/>
                                    <h1>Backend web solutions</h1>
                                </div>

                                { this.state.menu[2].submenu[1].map( el => (
                                    
                                <Link key={ el.name } href={ { pathname: '/solutions', query: { name: el.to } } }>
                                    <a onClick = {() => {
                                        this.setState({submenu: false});
                                        setLoading(true);
                                    }}>{ el.name }</a>
                                </Link>
                            )) }

                            </section>

                            <section>
                                <div>
                                    <img src="/static/images/solutions_mobile.png" alt="mobile"/>
                                    <h1>Mobile solutions</h1>
                                </div>

                                { this.state.menu[2].submenu[2].map( el => (
                                <Link key={ el.name } href={ { pathname: '/solutions', query: { name: el.to } } }>
                                    <a onClick = {() => {
                                        this.setState({submenu: false});
                                        setLoading(true);
                                    }}>{ el.name }</a>
                                </Link>
                            )) }

                            </section>

                            <section>
                                <div>
                                    <img src="/static/images/solutions_desktop.png" alt="desktop"/>
                                    <h1>Desktop solutions</h1>
                                </div>

                                { this.state.menu[2].submenu[3].map( el => (
                                <Link key={ el.name } href={ { pathname: '/solutions', query: { name: el.to } } }>
                                    <a onClick = {() => {
                                        this.setState({submenu: false});
                                        setLoading(true);
                                    }}>{ el.name }</a>
                                </Link>
                            )) }

                            </section>
                        </Submenu> 
                        
                    : null 
                )}</StoreConsumer>

            </Container>
        )
    }
}

export default Header;