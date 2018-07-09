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

const authRoutes = require("./routes/auth-routes");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

// Sets up the Express App
// =============================================================
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))



// Routes
// =============================================================
require("./routes/site-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/html-routes.js")(app);


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
