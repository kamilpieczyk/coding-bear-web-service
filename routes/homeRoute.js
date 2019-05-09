const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');

const home = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, { useNewUrlParser: true });
    
    client.connect( err => {
        test.equal(null,err);
        
        const collection = client.db(dbConnect.name).collection('sites');

        collection.find().toArray( (err, items)=> {
            test.equal(null,err);            
            res.json(items);            
        });
        
    })

    client.close();

}

module.exports = home;