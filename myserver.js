'use strict';
console.log('Proof of Life.');

//  ********* REQUIRES **********
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const getWeather = require ('./modules/weather');
const getMovies = require('./modules/movies');

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

app.get('/weather', getWeather);
app.get('/movies', getMovies);

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
