const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');
const bcrypt = require('bcrypt');
const passportGenerator = require('hash-generator');

const signin = ( req, res ) => {

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
                
                    const password = data[0].password;
                    const status = data[0].status;

                    if(status === "notApproved"){
                        res.json({status: "notApproved"})
                    }
                    else{
                        if(bcrypt.compareSync(user.password, password)){
                            const passport = passportGenerator(20);
                            collection.updateOne({email: user.email}, {$set: { passport }});
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

                }
                else{
                    res.json({
                        status: "notExist"
                    })
                }
            })
        })

        client.close();
    }
    
}

module.exports = signin;