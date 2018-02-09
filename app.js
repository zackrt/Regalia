'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

var path = require('path');

var logger = require('morgan');

var routes = require('./routes/index');
var users = require('./routes/users');
var blockchain = require('./routes/blockchain');
// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;
// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require('./config');
//const { User } = require('./models/users');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup .use means it applies to all end points

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/blockchain', blockchain);
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});
// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;
// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}
// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}
// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}
module.exports = { app, runServer, closeServer };