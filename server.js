'use strict';

//***Requires***//

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');


// *** Once we bring in express, we call it to create the server ***
// app === server/
const app = express();

// *** Middleware - CORS ***
app.use(cors());

// *** PORT that my server will run on ***
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));



app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});


app.get('/hello', (request, response) => {
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;
  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to the server!`);
});

function getWeather(request, response) {
  let {searchquery} = request.query;
  console.log('Request ' + request.query);
  let city = weatherData.find(city => city.city_name.toLowerCase() === searchquery.toLowerCase());
  console.log('City' + city);
  try {
    let weather = city.data.map(day => new Forecast(day));
    response.status(200).send(weather);
  } catch (error) {
    response.status(500).send('Nope');
  }
}

// *** GET WEATHER ***
app.get('/weather', getWeather);

// *** GROOM BULKY DATA ***

function Forecast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;

}


// ** Catch all with 404 Error **

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
  next(error.message);
});
