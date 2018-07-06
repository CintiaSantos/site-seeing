// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");

var exphbs = require("express-handlebars");
var express = require('express');
var bodyParser = require('body-parser');
var paginate = require('handlebars-paginate');
var app = express()
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/site-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars"); 
  
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
