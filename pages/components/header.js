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
    height: 70px;
    background-color: ${ colors.white };
    top: 0;
    right: 0;
    z-index: 100;

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

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            menu: null,
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
        
    }

    render(){
        return(
            <Container>

                <div>
                    <Link href='/'>
                        <a><img src="/static/images/Group 24.png" alt="logo" /></a>
                    </Link>
                </div>

                <div>
                    {
                        this.state.menu !== null ? 
                            this.state.menu.map( el => (
                                <MenuItem key={ el._id }>
                                    <Link href={ el.to }>
                                        <a>{el.title}</a>
                                    </Link>
                                </MenuItem>
                            ) ) :
                        null
                    }

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

            </Container>
        )
    }
}

export default Header;