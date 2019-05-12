const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');
const bcrypt = require('bcrypt');

const signin = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, {useNewUrlParser: true});
    const body = req.body;
    const user = {
        email: body.email,
        password: body.password
    };
    const regEx = /<>{}\[\]/;
    if(regEx.test(user.email)){
        res.json({
            status: "invalidEmail"
        })
    }
    else if(regEx.test(user.password)){
        res.json({
            status: "invalidPassword"
        })
    }
    else{
        client.connect( err => {
            test.equal(null, err);

            const collection = client.db(dbConnect.name).collection('users');
            collection.find({email: user.email}).toArray((err, data) => {
                test.equal(null, err);
                if(data[0]){
                    const passport = data[0].passport;
                    const password = data[0].password;
                    if(bcrypt.compareSync(user.password, password)){
                        res.cookie("passport", passport, {maxAge: 14400000});
                        res.json({
                            status: "ok",
                        });
                    }
                    else{
                        res.json({
                            status: "invalidPassword"
                        })
                    }

                }
                else{
                    res.json({
                        status: "notExist"
                    })
                }
            })
        })
    }
    
}

module.exports = signin;