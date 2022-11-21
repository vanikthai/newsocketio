const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;
const picsupload = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    let lname = originalname.split(".");
    let newname = `${uuid()}.${lname[1]}`;
    picsupload.push(newname);
    cb(null, newname);
  },
});
const upload = multer({ storage });
const route = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated,
  ensureAdmin,
} = require("../authen.js");

route.get("/", forwardAuthenticated, (req, res) => {
  res.render("index.ejs");
});
route.get("/main", ensureAuthenticated, (req, res) => {
  res.render("main.ejs");
});
route.get("/upload", ensureAuthenticated, (req, res) => {
  res.render("upload.ejs");
});

route.get("/register", (req, res) => {
  res.render("register.ejs");
});

route.post("/login", require("./login"));
route.get("/logout", require("./logout"));
route.post("/upload", ensureAuthenticated, upload.array("pic"), (req, res) => {
  res.send(picsupload);
  picsupload = "";
});
module.exports = route;
