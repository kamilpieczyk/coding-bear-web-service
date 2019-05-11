const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');

const subscribeEmail = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, { useNewUrlParser: true });
    const email = req.body.email;
    
    client.connect( err => {
        test.equal(null,err);
        
        const collection = client.db(dbConnect.name).collection('emails');
        collection.find({email: email}).toArray( (err,data) => {
            test.equal(null, err);
            console.log( data[0] );
            if( data[0] ){
                const response = {
                    status: "exist"
                };
                res.json(response);
            }

            else{
                collection.insert({
                    email
                }, ( err, result ) => {
                    test.equal(null, err);
                    const response = JSON.stringify({ status: "added"});
                    res.json( response );
                })
            }

        } );
        
    })

    client.close();

}

module.exports = subscribeEmail;