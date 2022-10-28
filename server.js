'use stric';

console.log('Proof of Life.');



//  ********* REQUIRES **********
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');


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


// front end - axios.get(http://localhost:3001/weather?cityName=Seattle)
app.get('/weather', async (request, response, next) => {
  // console.log(request.data);
  let cityName = request.query.cityName;
  // console.log(cityName, lati, long);
  try {
    let cityData = data.find(city => city.city_name === cityName);
    let lat = cityData.lat;
    let lon = cityData.lon;
    console.log(lat, lon);
    let groomedData = cityData.data.map(day => new Forecast(day));
    response.status(200).send(groomedData);
  } catch (error) {
    next(error);
  }
});


class Forecast {

  constructor(dayObj) {
    this.date = dayObj.datetime;
    this.description = dayObj.weather.description;
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
