var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

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

    res.render("sitespage");
  });

};