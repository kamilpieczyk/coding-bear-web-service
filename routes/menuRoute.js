const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const db = 'codingBear';
const uri = "mongodb+srv://codingbear:Aez@2478144@cluster0-scgdz.mongodb.net/test?retryWrites=true";

const menu = ( req,res ) => {

    const client = new MongoClient(uri, { useNewUrlParser: true });
    
    client.connect( err => {
        if (err) throw err;
        const collection = client.db(db).collection('menu');

        collection.find({}).toArray( (err, items)=> {
            test.equal(null,err);
            console.log(items, items.length);
            
            res.json(items);            
        });
        
    })

    client.close();

}

module.exports = menu;