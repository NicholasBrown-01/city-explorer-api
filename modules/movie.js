'use strict';
const axios = require('axios');


async function getMovie(request, response, next){

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
}

class Movie {
  constructor(movieData) {
    this.data = movieData;
  }
}

module.exports = getMovie;