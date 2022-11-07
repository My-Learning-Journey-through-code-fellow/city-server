'use strict';

const axios = require('axios');


async function getMovies(request, response, next) {
  try {
    let cityName = request.query.city_name;
    let url = await axios.get`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${cityName}&language=en-US&page=1&include_adult=false`;
    let movieResults = await axios.get(url);
    let dataToSend = movieResults.data.results.map(mov => new Movie(mov));
    response.status(200).send(dataToSend);
  } catch (error) {
    console.log('movie error');
    next(error);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.original_title,
    this.overview = movieObj.overview,
    this.img = movieObj.poster_path;
  }
}


module.exports = getMovies;
