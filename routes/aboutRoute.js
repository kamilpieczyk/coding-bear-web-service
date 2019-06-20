const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');

module.exports = ( req, res ) => {
    const client = new MongoClient(dbConnect.uri, { useNewUrlParser: true });

    client.connect()
        .then( () => {
            const collection = client.db(dbConnect.name).collection('about');
            collection.find().toArray( (err, items) => {
                test.equal( err, null );
                if(err){
                    res.json({ status: "error"})
                }
                res.json({ 
                    status: "ok",
                    about: items
                })
            })
        })
}