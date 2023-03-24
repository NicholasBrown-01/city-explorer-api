'use strict';
const axios = require('axios');

//? LAB 10 Below //
let cache = {};

async function getMovie(request, response, next) {

  try {
    let city = request.query.searchQuery;
    let movieFromFrontEnd = request.query.searchQuery;
    let movieCache = `${movieFromFrontEnd}`;

    if (cache[movieCache] && (Date.now() - cache[movieCache].timestamp) < 100000) {

      console.log('Movie: Cache was hit!!!!!!!!!', cache);
      response.status(200).send(cache[movieCache].data);

    } else {

      console.log('Movie: No items in cache');

      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_KEY}&query=${city}`;
      let movieResultsFromAxios = await axios.get(url);
      let moviesToSendFront = movieResultsFromAxios.data.results.map(movieData => new Movie(movieData));

      cache[movieCache] = {
        data: moviesToSendFront,
        timestamp: Date.now()
      };
      console.log('Added to cache:', cache);
    }
    //? Lab 10 Above //

  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieData) {
    this.data = movieData;
  }
}

module.exports = getMovie;