import styled from "styled-components";
import React, {useState, useEffect} from "react";
import colors from "../styles/colors";
import Link from "next/link"


const Icon = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${colors.grey};
    font-size: .8rem;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    transition: .2s;
    margin: 10px 0;
    span{margin: 0 5px;}
    :hover{
        border: 1px solid ${colors.grey};
    }
`;

const UserBox = styled.div`
    height: ${props => props.visible ? "200px" : 0};
    width: 200px;
    opacity: ${props => props.visible ? 1 : 0};
    transition: .2s;
    border: 1px solid ${colors.grey};
    border-radius: 5px;
    background: ${colors.darkWhite};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    a{
        color: ${colors.grey};
        text-decoration: none;
        font-size: 1rem;
        position: relative;
        width: 80%;
        text-align: center;
        padding: 10px 0;
        font-weight: 100;
        transition: .2s;
        :not(:last-child)::after{
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            border-bottom: 1px dotted ${colors.grey};
            width: 100%;
            height: 2px;
        }
        :hover{
            color: ${colors.main};
            text-decoration: underline;
        }
    }
`;

const positions = [
    {
        name: "my projects",
        link: "/myprojects"
    },
    {
        name: "add new project",
        link: "/addnewproject"
    },
    {
        name: "redeem voucher",
        link: "/voucher"
    },
    {
        name: "account settings",
        link: "/settings"
    },
];

const UserMenuMobile = ({name}) => {
    const [visibility, setVisibility] = useState(false);
    const [position, setPosition] = useState(0);

    const handleClick = () => {
        setVisibility(!visibility);
    }

    useEffect( () => {
        
    });

    return(
        <>
            <Icon onClick={handleClick}>
                <img id="user-icon" src="/static/images/user.png" alt="user-icon"/>
                <span>{name}</span>
            </Icon>

            <UserBox visible = {visibility}>
                { positions.map(
                    position => (
                        <Link href={position.link}>
                            <a>{position.name}</a>
                        </Link>
                    )
                )}
            </UserBox>
        </>
    )
}

export default UserMenuMobile;