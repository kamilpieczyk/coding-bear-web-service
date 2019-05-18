const MongoClient = require('mongodb').MongoClient;
const test = require('assert').equal;
const dbConnect= require('../dbConnect');

const voucher = ( req,res ) => {

    const client = new MongoClient(dbConnect.uri, {useNewUrlParser: true});
    const voucher = req.body.code;
    const email = req.body.email;
    
    client.connect(err => {
        const collection = client.db(dbConnect.name).collection('vouchers');
        test(null, err);
        collection.findOne({code: voucher})
            .then(result => {
                if(result){
                    const value = result.for;

                    if(result.used) res.json({status: "used"})
                    else {
                        collection.update({code: voucher}, {$set:{used: true}})
                            .then(result => {
                                res.json({
                                status: "ok",
                                value: value
                            })})
                            .catch(() => res.redirect("/500"))
                    }
                }
                else{
                    res.json({
                        status: "notExist"
                    })
                }
            })
            .catch( () => res.redirect('/500'))
    });

    client.close();
    
}

module.exports = voucher;