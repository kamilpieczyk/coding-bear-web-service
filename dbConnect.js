const MongoClient = require('mongodb').MongoClient;
const db = 'codingBear';
const uri = "mongodb+srv://codingbear:Aez@2478144@cluster0-scgdz.mongodb.net/test?retryWrites=true";

const getData = (collectionName) => {

    const client = new MongoClient(uri, { useNewUrlParser: true });
    const data = [];
    
    client.connect( err => {
        if (err) throw err;
        const collection = client.db(db).collection(collectionName);

        collection.find().toArray( (err, items)=> {
            if (err) throw err;
            
            items.forEach( ( item,err ) => {
                if(err) throw err;
                data.push(item);
            })
            
        });
        
    })

    client.close();
    
}

const insertData = (collectionName, dataToInsert) => {

    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect( err => {
        if (err) throw err;
        const collection = client.db(db).collection(collectionName);
        collection.insert(dataToInsert, ( err,doc) => {
            if(err) throw err;
            else console.log('data has been add' + doc);
        })
        client.close();
    })
    
}


const dbConnect = {
    getData,
    insertData
}

module.exports = dbConnect;