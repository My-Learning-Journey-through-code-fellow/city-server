'use stric';
console.log('Proof of Life.');


//  ********* REQUIRES **********
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const { request } = require('express');


// once express is in we need to use it.
//  app === sevrer
const app = express();


// middleware to share on the internet.
app.use(cors());


// define my port
const PORT = process.env.PORT || 3002;
// 3002 - indicates issue with .env file, or importing. Or is being.


//  ********* ENDPOINTS *********
app.get('/', (request, response) => {
  console.log('Passed test!');
  response.status(200).send('Welcome!');
});


app.get('/weather', async (request, response, next) => {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;

    let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API}&lat=${lat}&lon=${lon}&units=i&days=5`);
    console.log(weatherData);


    const weatherObj = new CityWeather(weatherData);

    const arrayToGroom = weatherObj.data.data.map(day => {
      return ({
        date: day.datetime,
        description: `Low of ${day.low_temp}F, high of ${day.high_temp}F, with ${day.weather.description}`
      });
    });
    const dataToSend = {
      description: arrayToGroom
    };
    response.status(200).send(dataToSend);
  } catch (error) {
    console.log('weather error');
    next(error);
  }
});

class CityWeather {
  constructor(cityData) {
    this.data = cityData.data;
  }
}


app.get('/movies', async (request, response, next) => {
  try {
    const cityName = request.query.city_name;

    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&query=${cityName}&include_adult=false`);


    const movieObj = new Movie(movieData);

    const arrayToGroom = movieObj.data.data.map( Movie => {
      return ({
        title: movie.original_title,
        overview: movie.overview,
        averageVotes: movie.vote_average,
        totalVotes: movie.vote_count,
        img: movie.poster_path,
        popularity: movie.popularity,
        releaseDate: movie.release_date
      });
    });
    const dataToSend = {
      description: arrayToGroom
    };
    response.status(200).send(dataToSend);
  } catch (error) {
    console.log('movie error');
    next(error);
  }
});

class Movie {
  constructor(movieData) {
    this.data = movieData;
  }
}


//  ********* ERROR HANDLING ********

app.get('*', (request, response) => {
  console.log(request.query);
  response.status(404).send('Error 404: Server Not Found');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


//  ********* SERVER START *********
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
