'use strict';

// SERVER IS WORKING

//***Requires***//

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
//?LAB 08 BELOW//
// const weather = require('./data/weather.json');
const axios = require('axios');
// const {application} = require('express');
//?LAB 08 ABOVE//


// *** PORT that my server will run on ***
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

/*
 *** FOR YOUR LAB - WEATHER
 *** http://api.weatherbit.io/v2.0/forecast/daily?key=<your API key>&lat=<from your frontend>&lon=<from your frontend>&days=5&units=I



 *** FOR YOUR LAB - MOVIES ***
 *** https://api.themoviedb.org/3/search/movie?api_key=<your MOVIE DB KEY>&query=<city info from frontend>
*/

//? Lab08 Below//
// *** BUILD AN ENDPOINT THAT WILL CALL OUT TO AN API Thank you Andrew Vreeland with Class Code Review ***
app.get('/movie', async (request, response, next) => {

  try {

    let city = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_KEY}&query=${city}`;
    let movieResultsFromAxios = await axios.get(url);

    //! How do I research and look at the data do determine what data you need
    let moviesToSendFront = movieResultsFromAxios.data.results.map(movieData => new Movie(movieData));

    console.log(moviesToSendFront);

    response.status(200).send(moviesToSendFront);

  } catch (error) {
    next(error);
  }
});

class Movie {
  constructor(movieData) {
    // *** Map the relevant fields from the API response to this object
    this.data = movieData;
  }
}
//? Lab08 Above//


app.get('/hello', (request, response) => {
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;
  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to the server!`);
});


//? Lab08 Below//
app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;
    let weatherResults = await axios.get(url);
    console.log(weatherResults.data);

    // ! How do I know this needs 2 .data?
    let weatherToSendFrontEnd = weatherResults.data.data.map(dayObj => new Forecast(dayObj));

    response.status(200).send(weatherToSendFrontEnd);
    //? Lab08 Above//

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
