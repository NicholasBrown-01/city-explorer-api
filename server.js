'use strict';

// SERVER IS WORKING

//***Requires***//

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const weather = require('./data/weather.json');
//?LAB 08 BELOW//
const axios = require('axios');
const { application } = require('express');
//?LAB 08 ABOVE//


// *** PORT that my server will run on ***
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));


// *** Create Endpoints *** //
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});


/*
 *** FOR YOUR LAB - WEATHER
 *** http://api.weatherbit.io/v2.0/forecast/daily?key=<your API key>&lat=<from your frontend>&lon=<from your frontend>&days=5&units=I



 *** FOR YOUR LAB - MOVIES ***
 *** https://api.themoviedb.org/3/search/movie?api_key=<your MOVIE DB KEY>&query=<city info from frontend>
*/

// TODO: BUILD AN ENDPOINT THAT WILL CALL OUT TO AN API
// app.get('/movie'), async (request, response, next) => {

//   try {

//     response.status(200).send('This was a test');
//   } catch (error) {
//     next(error);
//   }
// });

// TODO: BUILD ANOTHER CLASS TO TRIM DOWN THAT DATA


app.get('/hello', (request, response) => {
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;
  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to the server!`);
});

app.get('/weather', (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityName = request.query.searchQuery;

    let city = weather.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());
    let weatherToSendFrontEnd = city.data.map(dayObj => new Forecast(dayObj));
    response.status(200).send(weatherToSendFrontEnd);

  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.date;
    this.description = dayObj.weather.description;

  }


}

// function getWeather(request, response) {
//   let {searchquery} = request.query;
//   console.log('Request ' + request.query);
//   let city = weather.find(city => city.city_name.toLowerCase() === searchquery.toLowerCase
//   ());
//   console.log('City' + city);
//   try {
//     let weather = city.data.map(day => new Forecast(day));
//     response.status(200).send(weather);
//   } catch (error) {
//     response.status(500).send('Nope');
//   }
// }


// app.get('/weather', getWeather);



// function Forecast(day) {
//   this.date = day.valid_date;
//   this.description = day.weather.description;

// }


// ** Catch all with 404 Error **

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
  next(error.message);
});
