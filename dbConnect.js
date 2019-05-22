require('dotenv').config();

const dbConnect = {
    name: process.env.db_name,
    uri: process.env.db_uri
}

module.exports = dbConnect;