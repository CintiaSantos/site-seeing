var isAuthenticated = require("../config/middleware/isAuthenticated");

// Import the model (site.js) to use its database functions.
var site = require("../models/site.js");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/sitespage");
    }

    res.render("login");
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/sitespage");
    }

    res.render("signup");
  });

  app.get("/sitespage", isAuthenticated, function(req, res) {
    site.all(function(data) {
      var hbsObject = {
        sites: data
      };
      console.log(hbsObject);
      res.render("sitespage", hbsObject);
    });
  });

};