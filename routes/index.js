const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.render("index.ejs");
});
route.get("/register", (req, res) => {
  res.render("register.ejs");
});

module.exports = route;
