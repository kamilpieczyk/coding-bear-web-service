const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');

const applyEmail = (req, res) => {
    const client = new MongoClient(dbConnect.uri, { useNewUrlParser: true });
    const passport = req.query.user;

    client.connect( err => {
        test.equal(null,err);
        
        const collection = client.db(dbConnect.name).collection('users');
        // collection.find({passport: passport}).toArray((err,data)=>{
        //     test.equal(null, err);
        //     const user = data[0];

        //     collection.update({passport}, {
        //         passport: user.passport,
        //         email: user.email,
        //         password: user.password,
        //         name: user.name,
        //         company: user.company,
        //         website: user.website,
        //         status: "approved"
        //     })
        // })
        collection.update({passport}, {$set:{status: "approved"}})
            .then(() => res.redirect('/emailapproved'))
            .catch(err => test.equal(null,err));
        
    })

    client.close();
}

module.exports = applyEmail;