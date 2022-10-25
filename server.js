'use stric';

console.log('LIFE!');


const { request, response } = require('express');
//  ********* REQUIRES **********
const express = require('express');
require('dotenv').config();
let data = require('./data/pets.json');


// once express is in we need to use it.
//  app === sevrer
const app = express();




// define my port
const PORT = process.env.PORT || 3002;
// 3002 - indicates issue with .env file, or importing. Or is being.



//  ********* ENDPOINTS *********
//
app.get('/', (request, response) => {
  console.log('Pass test!');
  response.status(200).send('Passed the test!');
});

app.get('/hello', (request, response) => {
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}, Welcome to the site!`);
});


app.get('/pet', (request, response) => {
  try {
    let species = request.query.species;
    console.log(species);
    let dataToGroom = (pet => pet.species === sepcies);
    let dataToSend = new Pet(dataToGroom);
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

Class City {
  constructor(cityObj){
    this.name = cityObj.name;
    this.lat = cityobj.name;
  }
}




app.get('*', (request, response) => {
  console.log(request.query);
  response.status(404).send('This route doesnt exist');
});
//  ********* ERROR HANDLING ********
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});




//  ********* SERVER START *********
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
