require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
// const https = require('https');

const server = ( handle ) => {
    //create api keys and certificates
    const apiKey = process.env.api_key;
    const api = `/api/${ apiKey }/`;
    const certificate = fs.readFileSync('certificate.cer');
    const privateKey = fs.readFileSync('key.key');
    const credentials = {key: privateKey, cert: certificate};
    //create and listen server
    const server = express();
    // const httpsServer = https.createServer(credentials, server);
    // httpsServer.listen(3000, (err) => {
    //   if (err) throw err
    //   console.log(path.join(__dirname));
    // });

    server.listen(3000, (err) => {
      if (err) throw err
      console.log(path.join(__dirname));
    });

    //midleware
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(cookieParser());

    //api get request
    server.get(api + 'menu', require('./routes/menuRoute'));
    server.get(api + 'home', require('./routes/homeRoute'));

    //api post request
    server.post(api + 'subscribe-email' , require('./routes/subscribeEmailRoute'));
    server.post(api + 'register' , require('./routes/register'));
    server.post(api + 'signin' , require('./routes/signin'));
    server.post(api + 'authentyfication' , require('./routes/authentyfication'));
    server.post(api + 'voucher' , require('./routes/voucher'));
    server.post(api + 'voucher-finnish' , require('./routes/voucher-finnish'));
    server.post(api + 'get-projects' , require('./routes/getProjects'));

    //apply email route
    server.get('/register', require('./routes/applyEmail'));

    //if route is not defined go to next.js
    server.get('*', (req, res) => {
      // if(req.protocol === 'https'){
      //   return handle(req, res);
      // }
      // else if (req.protocol === 'http'){
      //   res.redirect('https://' + req.headers.host + req.url);
      // }
      return handle(req, res);
  });
}

module.exports = server;