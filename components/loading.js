import React from "react";
import styled from "styled-components";
import colors from '../styles/colors';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${colors.white};
    position: fixed;
    left: 0; top: 0;
    z-index: 1000;
    display: ${ props => props.visible ? "flex" : "none" };
    flex-direction: row;
    justify-content: center;
    align-items: center;

    h1{
        padding-bottom: 20px;
        font-weight: 100;
    }
    div{
        width: 10px;
        height: 10px;
        margin-right: 5px;
        background: ${colors.main};
        border-radius: 50%;
        animation: dot 1s;
        animation-iteration-count: infinite;
    }
    div:nth-child(3){
        animation-delay: 0.2s;
    }
    div:nth-child(4){
        animation-delay: 0.3s;
    }

    @keyframes dot {
        0%{
            margin-bottom: 0;
        }
        65%{
            margin-bottom: 20px;
            background: ${colors.second};
        }
        100%{
            margin-bottom: 0;
            background: ${colors.main};
        }
    }
`;

const Loading = ({active}) => {
    return(
        <Container visible={active}>
            <h1>site is loading</h1>
            <div></div>
            <div></div>
            <div></div>
        </Container>
    )
}

export default Loading;