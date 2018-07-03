var db = require("../models");

var passport = require("../config/passport");

module.exports = function(app) {

    app.post("/api/login", function(req, res) {
  
      res.json("/members");
  
    })};