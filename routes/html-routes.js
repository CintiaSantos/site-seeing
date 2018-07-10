var isAuthenticated = require("../config/middleware/isAuthenticated");

// Import the model to use its database functions.
var db = require("../models/");

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
    db.Site.findAll({}).then(function(data) {
      var hbsObject = {
        sites: data
      };
      console.log(hbsObject);
      res.render("sitespage", hbsObject);
    });
  });

};