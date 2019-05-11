import { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import Link from 'next/link';
import ButtonRed from './buttonRed';

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

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            menu: null,
            scrolled: false,
            submenu: false,
            search: false,
            searchBoxPosition: null,
            searchInput: {
                value: ""
            }
        }
    }

    handleSearchClick = () => {
        this.setState({
            search: !this.state.search
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

    handleSubmenuClick = (e) => {
        e.preventDefault();
        this.setState({
            submenu: !this.state.submenu
        })
    }

    componentDidMount(){
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/menu')
            .then( res => res.json() )
            .then( menu => {
                this.setState({
                    menu
                })
        });

        const searchBoxPosition = document.getElementById('search').offsetLeft;
        this.setState({
            searchBoxPosition
        });

        document.addEventListener('scroll', (ev) => {
            const scroll = window.scrollY;
            if(scroll > 200){
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
                            <MenuItem key={ el._id }>
                                <Link href={ el.to }>
                                { el.submenu ? 
                                    <a onClick={ this.handleSubmenuClick }>{ el.title }</a> :
                                    <a>{ el.title }</a>
                                }
                                </Link>
                            </MenuItem>
                        ) ) :
                    null }
                    {/* menu special items (search sign in) */}
                    <MenuItemSpecial onClick={ this.handleSearchClick } id="search">
                        <div><img src="/static/images/baseline-search-24px.png" /></div>
                        Search
                    </MenuItemSpecial>

                    <MenuItemSpecial>
                        Sign in
                        <div>
                            <img src="/static/images/Path 102.png" />
                        </div>
                    </MenuItemSpecial>

                </div>

                    <SocialMediaIcons>
                        <a href="https://github.com/codingbearuk"><img src="/static/images/git.png" alt=""/></a>
                        <a href="https://www.facebook.com/CodingBearUK"><img src="/static/images/facebook.png" alt=""/></a>
                    </SocialMediaIcons>

                <div>
                    <ButtonRed title = 'SIGN UP' to='/signup' />
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

                {/* submenu for solutions */}
                { this.state.menu ? <Submenu visible={ this.state.submenu }>

                    <section>
                        <div>
                            <img src="/static/images/solutions_frontend.png" alt="frontend"/>
                            <h1>Frontend web solutions</h1>
                        </div>

                        { this.state.menu[2].submenu[0].map( el => (
                        <Link key={ el._id } href={ el.to }>
                            <a>{ el.name }</a>
                        </Link>
                    )) }

                    </section>

                    <section>
                        <div>
                            <img src="/static/images/solutions_backend.png" alt="backend"/>
                            <h1>Backend web solutions</h1>
                        </div>

                        { this.state.menu[2].submenu[1].map( el => (
                        <Link key={ el._id } href={ el.to }>
                            <a>{ el.name }</a>
                        </Link>
                    )) }

                    </section>

                    <section>
                        <div>
                            <img src="/static/images/solutions_mobile.png" alt="mobile"/>
                            <h1>Mobile solutions</h1>
                        </div>

                        { this.state.menu[2].submenu[2].map( el => (
                        <Link key={ el._id } href={ el.to }>
                            <a>{ el.name }</a>
                        </Link>
                    )) }

                    </section>

                    <section>
                        <div>
                            <img src="/static/images/solutions_desktop.png" alt="desktop"/>
                            <h1>Desktop solutions</h1>
                        </div>

                        { this.state.menu[2].submenu[3].map( el => (
                        <Link key={ el._id } href={ el.to }>
                            <a>{ el.name }</a>
                        </Link>
                    )) }

                    </section>
                </Submenu> : null }

            </Container>
        )
    }
}

export default Header;