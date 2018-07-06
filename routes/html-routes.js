// **********************************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// **********************************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  
    app.get("/", function(req, res) {
      if (req.user) {
        res.redirect("/members");
      }
      res.render("signup");
    });
  
    api.get("/login", function(req, res) {
      if (req.user) {
        res.render("members");
      }
    });

    app.get('/members', isAuthenticated, function (req, res) {
      res.render("members");
    });
  
  };