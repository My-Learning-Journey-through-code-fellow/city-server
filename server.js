'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather.js');
const app = express();
app.use(cors());

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

app.get('*', (request, response) => {
  console.log(request.query);
  response.status(404).send('Error 404: Server Not Found');
});
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
