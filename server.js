'use stric';

console.log('Proof of Life.');


const { request, response } = require('express');
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
//
app.get('/', (request, response) => {
  console.log('Passed test!');
  response.status(200).send('Welcome!');
});

app.get('/hello', (request, response) => {
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}, Welcome to the site!`);
});


app.get('/city', (request, response) => {
  try {
    let city = request.query.data;

    console.log(city);
    let dataToGroom = data.find(city => city.data === data);
    let dataToSend = new City(dataToGroom);
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

class City {
  constructor(cityObj) {
    this.city_name = cityObj.name;
    this.lat = cityObj.lat;
    this.lon = cityObj.lon;
    this.weather = cityObj.weather;
  }
}




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
