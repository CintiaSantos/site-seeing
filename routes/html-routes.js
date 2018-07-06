// **********************************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// **********************************************************************************************

var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {
  
    app.get("/", function(req, res) {
      // if user is authenticated, redirect to main page, else render login/signup
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

    app.get("/signup", function(req, res) {
      res.render("signup");
    });

    // If user is authenticated, render members/main page
    app.get("/members", isAuthenticated, function (req, res) {
      res.render("members");
    });
  
  };