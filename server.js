'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD:app.js
const passport = require('passport');

var path = require('path');
=======
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee:server.js

const routes = require('./routes/index');
const users = require('./routes/users');
const blockchain = require('./routes/blockchain');

<<<<<<< HEAD:app.js

var users = require('./routes/users');
var blockchain = require('./routes/blockchain');

const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');


mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

=======
mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { User } = require('./models/users');


const app = express();
>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee:server.js

app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('common'));
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD:app.js


passport.use(localStrategy);
passport.use(jwtStrategy);
app.use('/api/auth/', authRouter);
=======
//app.use('/', routes);
>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee:server.js
app.use('/users', users);
app.use('/blockchain', blockchain);


<<<<<<< HEAD:app.js

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});





let server;
=======
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   next();
// });

// app.use('*', function (req, res) {
//   res.status(404).json({ message: 'nothing to see here' });
// });


let server;

>>>>>>> 6f46eafac3a981ba0a3c887468af05de0a5312ee:server.js
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