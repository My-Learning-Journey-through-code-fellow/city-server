'use stric';

console.log('Proof of Life.');



//  ********* REQUIRES **********
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');


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

// front end - axios.get(http://localohost:3001/weather?searchQuery=value&lat=anothervalue&lon=anothervalue)
app.get('/weather', (request, response, next) => {
  let cityName = request.query.cityName;
  let latitude = request.query.lat;
  let longitude = request.query.lon;
  try {
    let cityData = data.find(city => city.city_name === cityName);
    let latData = data.find(lat => lat.lat === latitude);
    let lonData = data.find(lon => lon.lon === longitude);
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


app.get('/hello', (request, response) => {
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}, Welcome to the site!`);
});


//  ********* ERROR HANDLING ********

app.get('*', (request, response) => {
  console.log(request.query);
  response.status(404).send('This route doesnt exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


//  ********* SERVER START *********
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
