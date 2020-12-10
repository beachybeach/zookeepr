const express = require("express");
const { animals } = require("./data/animals");
//instantiated the server - allows us to chain chain methods to the Express.js server
const app = express();

//this func will take in req.query as an argument and filter through the animals returning new filtered array
function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  //Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    //save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    //loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach((trait) => {
      //check the trait agains each animal in the filteredResults array.
      //Remember, it is initially a copy of the animalsArray but here were updating it for each train the .forEach() loop
      //for each trait being targeted by the filter, the filteredResults array will then contain only the entries that contain the trait,
      //so at the end we'll have an array of animals that have every one of the traits when the foreach is finished
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

//get takes two arguments (1)a string that describes the route the client will have to fetch from
//(2) is a callback function that will execute every time that route is accessed with a GET request
app.get("/api/animals", (req, res) => {
  //we are using send() from res(response) parameter to send string Hello! to client
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results); //using json returns json format
});

//app.listen() returns an http.Server object
app.listen(3001, () => {
  console.log(`API server now on port 3001!`); //port gives exact destination to host like a building on a campus
});
