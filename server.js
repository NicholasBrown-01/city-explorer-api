'use strict';

console.log('Our first server');

//***Requires***//

const express = require('express');
require('dotenv').config();
const cors = require('cors');
// let data = require('./data/weather.json');


// ***Once we bring in express, we call it to create the server***
// app === server/
const app = express();

// *** Middleware - CORS ***
app.use(cors());

// PORT that my server will run on
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

// *** Endpoints


//*** 1st arg - string url in quotes


//*** 2nd arg - call that will execute when that endpoint is hit

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response) => {
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;
  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to the server!`);
});


//? Change this from pet//

app.get('/pet', (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// ** Catch all with 404 Error **

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
