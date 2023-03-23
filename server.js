'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

//? LAB 09 BELOW //
const getWeather = require('./modules/weather');
const getMovie = require('./modules/movie');
//? LAB 09 ABOVE  //



const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));


//? LAB 09 BELOW //
app.get('/movie', getMovie);
app.get('/weather', getWeather);
//? LAB 09 ABOVE  //

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
  next(error.message);
});
