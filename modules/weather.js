'use strict';
const axios = require('axios');

//? Lab 10 Below //
let cache = {};


async function getWeather(request, response, next){

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityFromFrontEnd = request.query.searchQuery;
    let cityCache = `${cityFromFrontEnd}`;

    if (cache[cityCache] && (Date.now() - cache[cityCache].timestamp) < 100000) {

      console.log('Weather: Cache was hit!!!!!!!!!', cache);
      response.status(200).send(cache[cityCache].data);

    } else {

      console.log('Weather: No items in cache');

      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;
      let weatherResults = await axios.get(url);
      let weatherToSendFrontEnd = weatherResults.data.data.map(dayObj => new Forecast(dayObj));

      cache[cityCache] = {
        data: weatherToSendFrontEnd,
        timestamp: Date.now()
      };
      console.log('Added to cache:', cache);
      //? Lab 10 Above //

    }

  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.date;
    this.description = dayObj.weather.description;
  }
}

module.exports = getWeather;