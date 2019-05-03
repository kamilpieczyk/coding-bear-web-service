import { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import Link from 'next/link';
import ButtonRed from './buttonRed';

const Container = styled.div`
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

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            menu: null
        }
    }

    componentDidMount(){
        fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/menu')
            .then( res => res.json() )
            .then( menu => {
                this.setState({
                    menu
                })
            })
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
                </div>

                <div>
                    <ButtonRed title = 'SIGN UP' to='/signup' />
                </div>

            </Container>
        )
    }
}

export default Header;