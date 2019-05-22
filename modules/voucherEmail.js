require("dotenv").config();

const nodemailer = require('nodemailer');

const voucherMail = async(email, name, phone, value, description) => {
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
        from: "Coding Bear Voucher <auto-sender@coding-bear.co.uk>",
        to: "kamil@coding-bear.co.uk",
        subject: "Coding-Bear Voucher",
        html: `
            Name: ${name} <br/>
            email: ${email}<br/>
            phone: ${phone}<br/>
            value: ${value}<br/>
            description: ${description}<br/>
        `
    });
}

module.exports = voucherMail;