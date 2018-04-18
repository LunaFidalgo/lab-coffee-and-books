// index.js
const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

router.get("/new", (req, res, next) => {
  res.render("new");
});

router.post("/", (req, res, next) => {
  // Get Params from POST
  let location = {
    type: "Point",
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new Restaurant with location
  const newPlace = new Place({
    name: req.body.name,
    description: req.body.description,
    location: location
  });

  // Save the restaurant to the Database
  newPlace.save(error => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/list");
    }
  });
});

router.get("/list", (req, res, next) => {
  Place.find((error, places) => {
    if (error) {
      next(error);
    } else {
      res.render("list", { places: JSON.stringify(places) });
    }
  });
});

module.exports = router;
