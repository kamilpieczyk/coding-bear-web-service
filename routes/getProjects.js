const MongoClient = require('mongodb').MongoClient;
const test = require('assert').equal;
const dbConnect= require('../dbConnect');

const getProjects = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, {useNewUrlParser: true});
    const email = req.body.email;
    
    client.connect(err => {
        const collection = client.db(dbConnect.name).collection('projects');
        test(null, err);
        collection.find({email}).toArray((err,data) => {
            test(null,err);
            if (data[0]) res.json({
                status: "ok",
                projects: data
            })
            else res.json({
                status: "notExist"
            })
        })
        
    });

    client.close();
    
}

module.exports = getProjects;