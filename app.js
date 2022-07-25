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

////////// Requests tartgeting all articles //////////
app.route("/articles")

  .get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);

        // Send articles to ejs file instead... -> res.render("index", {data: foundArticles});
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    Article.create({
      title: req.body.title,
      content: req.body.content
    }, (err) => {
      if (!err) {
        res.send("Successfully added a new article!");
      } else {
        res.send(err);
      }
    });
  })

  .delete((req, res) => {
    Article.deleteMany({}, (err) => {
      if (!err) {
        res.send("Successfully deleted all articles in the database...");
      } else {
        res.send(err);
      }
    });
  });


////////// Requests tartgeting a specific article //////////
app.route("/articles/:articleTitle")

  .get((req, res) => {
    Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found...");
      }
    });
  })

  // .put((req, res) => {
  //   Article.findOneAndUpdate(
  //     {title: req.params.articleTitle},
  //     {title: req.body.title, content: req.body.content},
  //     (err, updatedArticle) => {
  //     if (!err) {
  //       res.send("Successfully replaced the document!");
  //     } else {
  //       res.send(err);
  //     }
  //   });
  // })

  .patch((req, res) => {
    Article.findOneAndUpdate(
      {title: req.params.articleTitle},
      {$set: req.body},
      (err, updatedArticle) => {
        if (!err) {
          res.send("Successfully updated the document!");
        } else {
          res.send(err);
        }
      }
    );
  });

app.listen("3000", (req, res) => {
  console.log("Server is running on port 3000...");
});
