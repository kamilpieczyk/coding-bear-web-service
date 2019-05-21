import React, {Component} from 'react';
import cookie from 'browser-cookies';
import Router from "next/router";

const StoreContext = React.createContext();

export class StoreProvider extends Component{
    state ={
        user: {
            logged: false,
            email: null,
            name: null
        },
        device: "mobile"
    }

    login = (email, name) => {
        this.setState({
            user: {
                ...this.state.user,
                logged: true,
                email,
                name
            }
        })
    }

    getDeviceScreen = () => {
        const condition = screen => {
            if(screen <= 450) return "mobile";
            else if(screen <= 900) return "tablet";
            else return "desktop";
        }

        let screen = window.innerWidth;
        let device = condition(screen);

        this.setState({
            device
        });

        window.addEventListener("resize", e => {
            screen = window.innerWidth;
            device = condition(screen);

            this.setState({
                device
            });
        });
    }

    componentDidMount(){
        // get passport identification

        const passport = cookie.get('passport');
        if(passport){    
            fetch('/api/9b859fee-242d-4e66-bde3-7febc4c77b95/authentyfication',{
                method: "post",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    passport: passport
                })
            })
                .then(res => res.json())
                .then(json => {
                    const status = json.status;
                    if(status === "ok"){
                        this.login(json.email, json. name)
                    }
                })
                // .catch( err => {
                //     Router.push("/500");
                // });
        }

            // get device screen
            this.getDeviceScreen();   
    }

    render(){
        return(
            <StoreContext.Provider
                value={{
                    user: this.state.user,
                    device: this.state.device
                }}
            >
                {this.props.children}
            </StoreContext.Provider>
        )
    }
}

export const StoreConsumer = StoreContext.Consumer;