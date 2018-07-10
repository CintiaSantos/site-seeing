$(document).ready(function() {

  var sites = [];
  var currentUser;
  getSites();

  getCurrentUser();

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
    console.log("initialize")
      $siteContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < sites.length; i++) {
        rowsToAdd.push(createNewRows(sites[i]));
      }
      // let rowsToAdd=sites.map(x=>{

      // })
      console.log(rowsToAdd)
      $siteContainer.prepend(rowsToAdd);
  }

  function getSites() {
    $.get("/api/sites", function(data) {
      sites = data;
      console.log(sites);
      initializeRows();
    });
  }

  function getCurrentUser(passThis) {
    $.ajax({url:"/api/user", method:"GET"}).then(
      function(data){

        currentUser = data;
        console.log(currentUser, "get request");
        createNewRows(passThis)
    });
  }

  function createNewRows(sites){
    console.log(currentUser, "global")
      // .then( function(data){
        // console.log(typeof(data))
      // console.log(sites.UserId);
      // console.log(req);

      if (2 == 2) {
        console.log("this is running");
        console.log(sites.UserID);
        console.log(currentUser);
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
        // console.log($newInputRow);
    
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