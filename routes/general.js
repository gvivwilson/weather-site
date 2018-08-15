/*jshint esversion: 6*/

const express = require("express"),
      router = express.Router(),
      {Pool} = require("pg"),
      request = require("request-promise"),
      geocoding = require("../database/geocoding"),
      genQueryValidation = require("../middlewares/generalQueryValidation"),
      clientCheckout = require("../database/clientCheckout"),
      asyncHandler = require("express-async-handler");

const pool = new Pool(geocoding.connectionString);

router.get("/", genQueryValidation, asyncHandler(async (req, res, next) => {
  let dbres = await clientCheckout(pool, geocoding.coordinatesQuery, [req.query.id]);
  let coordinates = `${dbres.rows[0].latitude},${dbres.rows[0].longitude}`;
  let city = { name:dbres.rows[0].city, country:dbres.rows[0].country };
  let uri = `https://api.darksky.net/forecast/${process.env.API_KEY_DS}/${coordinates}?units=auto`;
  let data = await request({uri: uri, json: true});
  res.render("general", {title: "General", data: data, city: city});
}));

router.get("/search", asyncHandler(async (req, res, next) => {
  let params = [req.query.city, `${req.query.city}%`];
  let dbres = await clientCheckout(pool, geocoding.cityQuery, params);
  res.status(200).json(dbres.rows);
}));

module.exports = router;
