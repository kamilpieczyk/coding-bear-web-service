const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
const dbConnect= require('../dbConnect');
const generator = require('hash-generator');
const auth = require('../modules/authentyfication');

module.exports = ( req, res ) => {
    const client = new MongoClient(dbConnect.uri, {useNewUrlParser: true});
    const body = req.body;
    const title = `${new Date().getUTCDate()}/${new Date().getMonth()}/${new Date().getFullYear()}/${generator(4)}`;

    auth(body.passport).then( user => {

        client.connect()
            .then( () => {
        
                const collection = client.db(dbConnect.name).collection('projects');
                collection.insertOne({
                    title,
                    email: user,
                    name: body.name,
                    phone: body.phone,
                    value: `
                    BUDGET FOR THIS PROJECT IS: ${body.budget} 
                    MY FUNCTION IN COMPANY: ${ body.functionInCompany } 
                    VISUAL IDENTYFICATION: ${ body.visualIdentyfication } 
                    DEADLINE: ${ body.deadline }
                    DESCRIPTION: ${ body.description } `,
                    progress: "0%",
                    status: "processing",
                    message: "waiting for recipience"
                }).then( ()=> res.json( { status: "ok" } ) )
        
            } )
            .catch( err => res.json({ status: err }))

    } );

}
