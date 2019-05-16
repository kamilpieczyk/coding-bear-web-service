const nodemailer = require('nodemailer');

const registrationMail = async(email, name, passport) => {
    let transport = nodemailer.createTransport({
        host: "smtp.ionos.co.uk",
        port: "587",
        secure: false,
        auth: {
            user: "auto-sender@coding-bear.co.uk",
            pass: "Aez@2478144"
        }
    });

    await transport.sendMail({
        from: "Coding Bear Registration <auto-sender@coding-bear.co.uk>",
        to: email,
        subject: "Coding-Bear Portal Registration",
        // attachments: [{
        //     filename: "logo.png",
        //     path: '../static/images/logo.png',
        //     cid: 'logo'
        // }],
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
                <h1>Welcome to coding-bear.co.uk</h1>
                Thank you for signing up ${name}.<br/>
                We are so happy you're there. We build coding-bear to
                help companies to get gorgeous apps and websites.
                As a special treat enjoy 15% off for you first project.<br/>
                Please click on the link below to finnish your registration
            </article>

            <section style="
                background: #E99B3C;
                width: 50%;
                margin: 30px auto 0;
                padding: 30px;
                border-radius: 5px;
            ">
                <a href="https://coding-bear.co.uk/register?user=${passport}">https://coding-bear.co.uk/register?user=${passport}</a>
            </section>

            <section style="
                color: #707070;
                width: 50%;
                margin: 0 auto;
                padding: 30px 0;
            ">
                this email has been send automaticly after user registration. Please do not respond for this message. If you didin't register on coding-bear.co.uk please ignore this email.
            </section>
            </div>
            </body>
        `
    });
}

module.exports = registrationMail;