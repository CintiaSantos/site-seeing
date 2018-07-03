var exphbs = require("express-handlebars");
var express = require('express');
var bodyParser = require('body-parser');
var app = express()
var PORT = process.env.PORT || 8080;
 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/', function (req, res) {
    // res.send('Hello World')
    res.render("index");
  })
   
  app.listen(PORT, function(){
      console.log("listening at " + PORT);
  })