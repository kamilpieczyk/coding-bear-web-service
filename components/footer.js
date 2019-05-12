import styled from "styled-components";
import colors from '../styles/colors';
import Link from 'next/link';
import {useEffect, useState} from "react";
import HowToOrder from '../components/howToOrder';


const ContentBox = ({title, content}) => {
    // Content container for multiple use in footer
    const Container = styled.div`
        display: flex !important;
        flex-direction: column !important;
        margin: 50px 5vw;
        color: ${colors.white};
        font-weight: 100;
        font-size: .8rem;
        img{
            width: 25px;
            height: 25px;
        }
        a{
            color: ${colors.white};
            text-decoration: none;
            :hover{text-decoration: underline;}
            
        }
        h2{
            font-size: 1rem;
        }
        div{
            display: flex;
            justify-content: flex-start;
            align-items: center;

            div{ margin: 5px 0; }
            img{ margin: 0 7px; }
        }
    `;

    return(
        <Container>
            <h2>{title}</h2>
            {content.map( el => (
                <div>
                    {el.image ? <div><img src={el.image} alt="footer-element"/></div> : null}
                    {el.link ? <div><Link href={el.link}>{el.value}</Link></div> : <div>{el.value}</div>}
                </div>
            ))}
        </Container>
    )
}

const Footer = () => {
    // Footer style
    const Container = styled.footer`
        padding: 150px 0 20px 0;
        width: 100vw;
        background: ${colors.darkMain};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        #top{
            display: flex;
            flex-direction: row;
        }
        #bottom{
            
            div{
                width: 80vw;
                height: 1px;
                background: ${colors.white};
            }
            section{
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${colors.white};
                font-size: .7rem;
                font-weight: 100;
                margin-top: 20px;
                img{margin: 0 15px;}
            }
        }
        
    `;
    // state
    const [ howToOrder, setHowToOrder] = useState(null);

    // get data for how to order
    useEffect( () => {
        fetch('http://localhost:3000/api/9b859fee-242d-4e66-bde3-7febc4c77b95/home')
            .then(res => res.json())
            .then(json => setHowToOrder(json))
            .catch( err => location.replace('504'));
        }, []);
    // return JSX to render
    return(
        <>
        { howToOrder ? <HowToOrder content={howToOrder[2].howtoorder} /> : null}
        <Container>
            <div id="top">

                <ContentBox 
                    title="Kamil Pieczyk"
                    content={[
                        {
                            value: "07593706457",
                            image: "/static/images/mobile-solid.png"
                        },
                        {
                            value: "kamil@coding-bear.co.uk",
                            image: "/static/images/envelope-solid.png"
                        }
                    ]}
                />

                <ContentBox
                    title="Site map"
                    content={[
                        {
                            value: "home",
                            link: "/"
                        },
                        {
                            value: "about",
                            link: "/about"
                        },
                        {
                            value: "contact",
                            link: "/contact"
                        }
                    ]}
                />

                <ContentBox
                    title="Solutions"
                    content={[
                        {
                            value: "static websites",
                            link: "/staticwebsites"
                        },
                        {
                            value: "web apps",
                            link: "/webapps"
                        },
                        {
                            value: "backend/database",
                            link: "/backend"
                        },
                        {
                            value: "mobile apps - android",
                            link: "/android"
                        },
                        {
                            value: "windows apps",
                            link: "/windows"
                        }
                    ]}
                />

                <ContentBox 
                    title="Follow me"
                    content={[
                        {
                            value: "Facebook",
                            link: "https://www.facebook.com/CodingBearUK",
                            image: "/static/images/facebook-square-brands.png"
                        },
                        {
                            value: "Github",
                            link: "https://github.com/codingbearuk",
                            image: "/static/images/github-brands.png"
                        },
                        {
                            value: "Linkedin",
                            link: "https://www.linkedin.com/in/kamil-pieczyk-b21401167/",
                            image: "/static/images/linkedin-brands.png"
                        }
                    ]}
                />

            </div>

            <div id="bottom">
                    <div></div>

                    <section>
                        <img src="/static/images/bears_head.png" alt="logo"/>
                        <span>
                            © 2019 CODING-BEAR<br/>
                            coding-bear, coding bear logo and bear's head <br/>
                            are registred trademarks of coding-bear
                        </span>
                    </section>

            </div>
        </Container>
        </>
    )
}

export default Footer;