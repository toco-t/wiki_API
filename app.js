const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
  Article.find({}, (err, foundArticles) => {
    if (!err) {
      res.render("index", {data: foundArticles});
    } else {
      console.log(err);
    };
  });
});

app.listen("3000", (req, res) => {
  console.log("Server is running on port 3000...");
});
