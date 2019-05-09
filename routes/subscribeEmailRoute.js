const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');

const home = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, { useNewUrlParser: true });
    const email = req.body.email;
    console.log(req.body.email);
    
    client.connect( err => {
        test.equal(null,err);
        
        const collection = client.db(dbConnect.name).collection('emails');

        collection.insert({
            email
        }, ( err, result ) => {
            test.equal(null, err);
            const response = { status: "ok", result };
            res.json( response );
        })
        
    })

    client.close();

}

module.exports = home;