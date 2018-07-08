$(document).ready(function() {

var sites = [];
getSites();

var $newItemInput = $("input.new-item");
$(document).on("submit", "#inputSite", insertSite);

function insertSite(event) {
    event.preventDefault();
    var site = {
      url: $newItemInput.val().trim(),
    //   complete: false
    };

    $.post("/api/sites", site);
    $newItemInput.val("");
  }

//   $('#addUrl').submit(function(e) {
//     e.preventDefault();
//     // Coding
//     $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('hide');
//     return false;
// });

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
    var $newInputRow = $(
      [
        "<li class='list-group-item'>",
        "<span>",
        sites.url,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );
    
    $newInputRow.find("button.delete").data("id", sites.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", sites);
    if (sites.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

});