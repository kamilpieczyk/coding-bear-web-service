const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');

module.exports = passport => ( new Promise( ( resolve, reject ) => {
    const client = new MongoClient(dbConnect.uri, {useNewUrlParser: true});

    client.connect()
        .then( () => {
            const collection = client.db(dbConnect.name).collection('users');

            collection.findOne({ passport })
            .then( item => {
                if( item ) resolve( item.email)
                else reject('authorisation_failed')
            })
            .catch( err => reject('authorisation_failed') );
        } )
}) )