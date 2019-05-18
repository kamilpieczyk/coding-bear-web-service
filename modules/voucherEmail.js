const nodemailer = require('nodemailer');

const voucherMail = async(email, name, phone, value, description) => {
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