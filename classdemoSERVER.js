'use strict';

console.log('Yass our first server :)!!');

// *** REQUIRES ***** (Like import but for the backend)
const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('./data/data.json');


// *** ONCE WE BRING IN EXPRESS WE CALL IT TO CREATE THE SERVER ***
// ** app === server
const app = express();

// *** MIDDLEWARE  - CORS ***
app.use(cors());

// *** PORT THAT MY SERVER WILL RUN ON ***
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on port ${PORT}!`));

// *** ENDPOINTS ****

// *** BASE ENDPOINT - PROOF OF LIFE
// ** 1st arg - string url in quotes
// ** 2nd arg - callback that will execute when that endpoint is hit

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;

  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
});


// *** HELPFUL START FOR YOUR LAB ***
app.get('/weather', (request,response,next)=>{

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;

    // finish this portion using the weather.json file and your class you will build...

  } catch (error) {
    console.log(error.message);
    next(error.message);
  }
});



app.get('/pet', (request, response, next) => {
  try {
    let queriedSpecies = request.query.species;

    let dataToGroom = data.find(pet => pet.species === queriedSpecies);
    let dataToSend = new Pet(dataToGroom);

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

// *** CLASS TO GROOM BULKY DATA ***

class Pet {
  constructor(petObj){
    this.name = petObj.name;
    this.breed = petObj.breed;
  }
}


// *** CATCH ALL - AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});