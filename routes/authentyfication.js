const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');

const authentyfication = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, {useNewUrlParser: true});
    const passport = req.body.passport;

    client.connect(err => {
        test.equal(null, err);
        const collection = client.db(dbConnect.name).collection('users');
        collection.find({passport: passport}).toArray( (err, data) => {
            test.equal(null, err);

            const user = data[0];
            if(user){
                res.json({
                    status: "ok",
                    email: user.email,
                    name: user.name
                })
            }
            else{
                res.json({
                    status: "404"
                })
            }
        })
    })

    client.close();
}

module.exports = authentyfication;