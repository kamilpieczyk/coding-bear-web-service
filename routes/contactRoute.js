require('dotenv').config();

const nodemailer = require('nodemailer');

module.exports = ( req, res ) => {
    const body = req.body;

    const sendMail = async( data ) => {

        let transport = nodemailer.createTransport({
            host: process.env.email_host,
            port: process.env.email_port,
            secure: false,
            auth: {
                user: process.env.email_sender,
                pass: process.env.email_pass
            }
        });

        await transport.sendMail({
            from: "Coding-bear friendly form <noreplay@coding-bear.co.uk>",
            to: "kamil@coding-bear.co.uk",
            subject: data.subject,
            html: `
                <body style="
                    margin: 0;
                ">
                <div style="
                    width: 80vw;
                    height: auto;
                    text-align: center;
                    font-size: 1em;
                    background: #d6d6d6;
                    border-radius: 10px;
                    margin: 5vh auto;
                ">
                <img style="margin: 20px auto"src="http://coding-bear.co.uk/static/images/logo.png" alt="logo" />
                <article style="
                    background: #601F3C;
                    color: #FFFFFF;
                    padding: 15% 10%;
                ">
                    <h1>Coding-bear friendly form</h1>
                    
                    <strong>from: </strong> ${ data.name }<br/>
                    <strong>from email: </strong> ${ data.email }<br/>
                    <strong>phone no: </strong> ${ data.phone }<br/>
                </article>
    
                <section style="
                    background: #E99B3C;
                    width: 50%;
                    margin: 30px auto 0;
                    padding: 30px;
                    border-radius: 5px;
                ">
                    ${ data.msg }
                </section>
    
                <section style="
                    color: #707070;
                    width: 50%;
                    margin: 0 auto;
                    padding: 30px 0;
                ">
                    this email has been send from coding-bear.co.uk. Please do not respond for this message.
                </section>
                </div>
                </body>
            `
        })
    }

    sendMail( body )
        .then( result => res.json({ status: "ok", result: result }))
        .catch( err => res.json({ status: "fail", error_code: err }))
}