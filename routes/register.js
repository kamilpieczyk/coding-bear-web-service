const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');
const bcrypt =require('bcrypt');
const passportGenerator = require('hash-generator');
const registrationMail = require('../modules/registrationMail');
const register = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, { useNewUrlParser: true });
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    const userPassword = bcrypt.hashSync(body.password, salt);
    const passport = passportGenerator(20);
    const newUser = {
        passport: passport,
        email: body.email,
        password: userPassword,
        name: body.name,
        company: body.company,
        website: body.website,
        status: "notApproved"
    }
    
    if(!newUser.email){
        res.json({
            status: "emailEmpty"
        })
    }
    else if(!body.password){
        res.json({
            status: "passwordEmpty"
        })
    }
    else if(!newUser.name){
        res.json({
            status: "nameEmpty"
        })
    }
    else if(!newUser.company){
        res.json({
            status: "companyEmpty"
        })
    }
    else{
        client.connect( err => {
            test.equal(null,err);
            
            const collection = client.db(dbConnect.name).collection('users');
            collection.find({email: newUser.email}).toArray( (err, data) => {
                test.equal(err, null);
                if(data[0]){
                    console.log(data[0]);
                    res.json({status: "exist"});
                }
                else{
                    collection.insertOne(newUser, (err) => {
                        test.equal(null, err);
                        console.log("user added to database");
                        res.json({status: "ok"});
                        registrationMail(newUser.email, newUser.name, newUser.passport).catch(console.error);
                    })
                }
            })
                   
        })
    
        client.close();
    }
}

module.exports = register;