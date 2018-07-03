var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
    
    });

    app.post("/api/signup", function(req, res) {
        console.log(req.body);
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/users", function(req, res) {
        db.User.findAll({
            include: [db.Site]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });



};