$(document).ready(function() {

var sites = [];
getSites();

var $newItemInput = $("input.new-item");
$(document).on("submit", "#inputSite", insertSite);
$(document).on("click", "button.close", deleteSite);
$(document).on("click", "button.close", myFunction);
$(document).on("click", "button.addUrl", myFunction);

function deleteSite(event) {
  event.stopPropagation();
  var id = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/sites/" + id
  }).then(getSites);
}

function insertSite(event) {
    event.preventDefault();
    var site = {
      url: $newItemInput.val().trim(),
    //   complete: false
    };

    $.post("/api/sites", site);
    $newItemInput.val("");
  }

  function myFunction() {
    location.reload();
}

var $siteContainer = $(".site-container");

function initializeRows() {
    $siteContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < sites.length; i++) {
      rowsToAdd.push(createNewRow(sites[i]));
    }
    $siteContainer.prepend(rowsToAdd);
  }

function getSites() {
    $.get("/api/sites", function(data) {
      sites = data;
      console.log(sites);
      initializeRows();
    });
  }

  function createNewRow(sites) {

    console.log(sites);
    
    $.get("/api/users", function(req, res) {
      for (i=0; i<req.length; i++) {
        console.log(req[i].id);
      }
      
  });
    
    if (sites.UserId === 2) {
      var $newInputRow = $(
        [
          "<li class='list-group-item'>",
          "<a href=",
          "https://",
          sites.url,
          " ",
          "target=",
          "_blank",
          ">",
          "<span>",
          sites.url,
          "</span>",
          "</a>",
          "<button type=",
          "button",
          " ",
          "class=",
          "close",
          " ",
          "data-dismiss=",
          "modal",
          " ",
          "aria-label=",
          "Close",
          ">",
          "<span",
          " ",
          "class=",
          "'glyphicon glyphicon-remove-circle pull-right'",
          ">",
          "</span>",
          "</button>",
          "</li>"
        ].join("")
      );
      console.log($newInputRow);
  
      $newInputRow.find("button.close").data("id", sites.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("todo", sites);
      if (sites.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
    else {
      var $newInputRow = $(
        [
          "<li class='list-group-item'>",
          "<a href=",
          "https://",
          sites.url,
          " ",
          "target=",
          "_blank",
          ">",
          "<span>",
          sites.url,
          "</span>",
          "</a>",
          "</li>"
        ].join("")
      );
      console.log($newInputRow);
  
      $newInputRow.find("button.close").data("id", sites.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("todo", sites);
      if (sites.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  }
    

});