$(document).ready(function() {

  var newItemInput = $("input.new-item"); 
  $(document).on("sumbmit", "#inputSite", insertSite);
  $(document).on("click", "button.close", deleteSite);
  $(document).on("click", "button.close", reload);
  $(document).on("click", "button.addUrl", reload);

  // add a site to site list and database
  function insertSite(event) {
    event.preventDefault();

    var newSite = {
      url: newItemInput.val().trim()
    }; 

    // Send the POST request.
    $.ajax("/api/sites", {
      type: "POST",
      data: newSite
    }).then(function() {
      console.log("created new site");
      // Reload the page to get the updated list
      reload();
    });

    newItemInput.val("");
  }

  // remove a site from site list and database
  function deleteSite(event) {
    event.stopPropagation();

    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/sites/" + id
    }).then(function() {
      console.log("deleted site with id: " + id);
      // Reload the page to get the updated list
      reload();
    });
  }
  
  function reload() {
    location.reload();
  } 

});

// ------------------------------------------------------

  // "<li class='list-group-item'>",
  // "<a href=",
  // "https://",
  // sites.url,
  // " ",
  // "target=",
  // "_blank",
  // ">",
  // "<span>",
  // sites.url,
  // "</span>",
  // "</a>",
  // "<button type=",
  // "button",
  // " ",
  // "class=",
  // "close",
  // " ",
  // "data-dismiss=",
  // "modal",
  // " ",
  // "aria-label=",
  // "Close",
  // ">",
  // "<span",
  // " ",
  // "class=",
  // "'glyphicon glyphicon-remove-circle pull-right'",
  // ">",
  // "</span>",
  // "</button>",
  // "</li>"
  

// --------------------------------------------------------

  // "<li class='list-group-item'>",
  // "<a href=",
  // "https://",
  // sites.url,
  // " ",
  // "target=",
  // "_blank",
  // ">",
  // "<span>",
  // sites.url,
  // "</span>",
  // "</a>",
  // "</li>"

