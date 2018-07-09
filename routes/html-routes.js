// **********************************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// **********************************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


    app.get('/', function (req, res) {
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

  };
