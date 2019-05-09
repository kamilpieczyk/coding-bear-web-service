const express = require('express');
const bodyParser = require('body-parser');

const server = ( handle ) => {
    //create and listen server
    const server = express();
    const apiKey = '9b859fee-242d-4e66-bde3-7febc4c77b95';
    const api = `/api/${ apiKey }/`;

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000');
    });

    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    //api get request
    server.get(api + 'menu', require('./routes/menuRoute'));
    server.get(api + 'home', require('./routes/homeRoute'));

    //api post request
    server.post(api + 'subscribe-email' ,require('./routes/subscribeEmailRoute'));

    //if route is not defined go to next.js
    server.get('*', (req, res) => {
      return handle(req, res);
  });
}

module.exports = server;