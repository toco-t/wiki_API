const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.listen("3000", (req, res) => {
  console.log("Server is running on port 3000...");
});
