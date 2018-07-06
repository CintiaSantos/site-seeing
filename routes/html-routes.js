// **********************************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// **********************************************************************************************

// Dependencies
// =============================================================
// var path = require("path");

// // Routes
// // =============================================================
// module.exports = function(app) {

//     // Each of the below routes just handles the HTML page that the user gets sent to.
  
//     // index route loads view.html
//     app.get("/", function(req, res) {
      
//       res.render("index");
//     });
  
//     // cms route loads cms.html
//     app.get('/api/members', function (req, res) {
//       // res.send('Hello World')
//       res.render("members");
//     })
  
//     // blog route loads blog.html
//     app.get('/api/signup', function (req, res) {
//       // res.send('Hello World')
//       res.render("signup");
//     })
  
//     // authors route loads author-manager.html
//     // app.get("/authors", function(req, res) {
      

//     // });
  
//   };

  //testing above

  //my stuff below

  var path = require("path");

  var isAuthenticated = require("../config/middleware/isAuthenticated");

  module.exports = function(app) {

    app.get("/", function(req, res) {
      if (req.user) {
        res.redirect("/members");
      }
      // res.sendFile(path.join(__dirname, "../public/signup.html"));
      res.render("index");
    });

    app.get("/signup", function(req, res) {
      if (req.user) {
        res.redirect("/members");
      }
      // res.sendFile(path.join(__dirname, "../public/login.html"));
      res.render("signup");
    });
  
    app.get("/members", isAuthenticated, function(req, res) {
      // res.sendFile(path.join(__dirname, "../public/members.html"));
      res.render("members");
    });
  };