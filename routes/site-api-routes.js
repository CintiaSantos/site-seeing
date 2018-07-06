var db = require("../models");

module.exports = function(app) {
  app.post("/api/sites", function(req, res) {
      console.log(req.body);
      db.Site.create(req.body).then(function() {
        res.redirect(307, "/index");
      }).catch(function(err) {
        res.json(err);
      });
    });

  // --------------- sorted query --------------------
  app.delete("/api/sites/:id", function(req, res) {
    db.Site.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSite) {
        res.redirect(307, "/");
      }).catch(function(err) {
        res.json(err);
      });
    });

  app.get("/api/sites/:id", function(req, res) {
    db.Site.findAll({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbSite) {
      res.json(dbSite);
    });
  });

  app.get("/api/sites/:category", function(req, res) {
    db.Site.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbSite) {
      res.json(dbSite);
    });
  });

  app.get("/api/sites/:rating", function(req, res) {
    db.Site.findAll({
      where: {
        rating: req.params.rating
      }
    }).then(function(dbSite) {
      res.json(dbSite);
    });
  });
  // --------------- end sorted query --------------------
  
  app.get("/api/sites", function(req, res) {
      db.Site.findAll({})
      .then(function(dbSite) {
          res.json(dbSite);
      });
  });


};
