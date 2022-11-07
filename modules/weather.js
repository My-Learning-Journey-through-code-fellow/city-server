'use strict';

const axios = require('axios');

async function getWeather(request, response, next) {
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
}


class CityWeather {
  constructor(cityData) {
    this.data = cityData.data;
  }
}


module.exports = getWeather;
