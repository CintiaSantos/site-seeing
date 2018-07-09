// Dependencies
// =============================================================
const passport = require("passport");


// local Auth Strategy-----------------------------------------------------------------
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(new LocalStrategy(
    {
        usernameField: "email"
    },
    function(email, password, done) {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));



// Google Auth Strategy----------------------------------------------------------------

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys");

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  },
  (accessToken, refreshToken, profile, done) => {
    db.User.findOrCreate({where:
      { username: profile.displayName}, defaults: {email: "email@email.com", password: null}})
      .spread((user, created)=> {
        console.log(user.get({
          plain: true
        }))
        console.log(created);
        done(null, user);
      })
     }));

// ------------------------------------------------------------------------------------




passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id).then((user) => {
    done(null, user);
  })
});

module.exports = passport;
