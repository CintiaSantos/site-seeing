$(document).ready(function() {
  $.get("/api/sites").then(function(data) {
    $(".site-list").text(data.title);
  });
});




