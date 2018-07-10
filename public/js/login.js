$(document).ready(function() {

    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
  
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
      if (!userData.email || !userData.password) {
        return;
      }
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });

    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
      })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    }

    function onSignIn(googleUser) {
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    };

  });

