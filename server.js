const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const server = ( handle ) => {
    //create api key and route to api
    const apiKey = '9b859fee-242d-4e66-bde3-7febc4c77b95';
    const api = `/api/${ apiKey }/`;
    //create and listen server
    const server = express();
    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000');
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

    //apply email route
    server.get('/register', require('./routes/applyEmail'));

    //if route is not defined go to next.js
    server.get('*', (req, res) => {
      return handle(req, res);
  });
}

module.exports = server;