var exphbs = require("express-handlebars");
var express = require('express');
var bodyParser = require('body-parser');
var paginate = require('handlebars-paginate');
var app = express()
var PORT = process.env.PORT || 8080;
 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/', function (req, res) {
    // res.send('Hello World')
    res.render("index");
  })

  app.get('/api/members', function (req, res) {
    // res.send('Hello World')
    res.render("members");
  })

  app.get('/api/signup', function (req, res) {
    // res.send('Hello World')
    res.render("signup");
  })
   
  app.listen(PORT, function(){
      console.log("listening at " + PORT);
  })