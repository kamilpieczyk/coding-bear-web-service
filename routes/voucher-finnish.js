const MongoClient = require('mongodb').MongoClient;
const test = require('assert').equal;
const dbConnect= require('../dbConnect');
const voucherMail = require('../modules/voucherEmail');
const generator = require('hash-generator');

const voucherFinnish = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, {useNewUrlParser: true});
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const value = req.body.value;
    const description = req.body.description;
    const title = `${new Date().getUTCDate()}/${new Date().getMonth()}/${new Date().getFullYear()}/${generator(4)}`;
    
    client.connect(err => {
        const collection = client.db(dbConnect.name).collection('projects');
        test(null, err);

        collection.insertOne({
            title,
            email,
            name,
            phone,
            value,
            description,
            progress: "0%",
            status: "processing",
            message: "waiting for recipience"
        })
            .then(result => {
                voucherMail(email, name, phone, value, description);
                res.json({
                    status: "ok"
                })
                .catch(err => res.json({
                    status: "err"
                }))
            })
    });

    client.close();
    
}

module.exports = voucherFinnish;