$(document).ready(function() {

var sites = [];
var rowsToAdd = [];
getSites();

var $newItemInput = $("input.new-item");
var $newItemInput2 = $("input.new-item2");
$(document).on("click", "button.thumb", thumbsUp);
$(document).on("submit", "#inputSite", insertSite);
$(document).on("click", "button.close", deleteSite);
$(document).on("click", "button.close", myFunction);
$(document).on("click", "button.addUrl", myFunction);

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function thumbsUp(event) {
console.log(sites);
//set a id on each element
// this.attr("id")
//sites.this.attr(id).rating
  // event.preventDefault();
  event.stopPropagation();
  var id = $(this).data("id");
  var rating = $(this).data("rating");
    var rate = {
      rating: rating +1,
      id: id
    };
    console.log(rate)
    $.post("/api/rank/" +id, rate);
    myFunction()
    // $newItemInput.val("");
    // $.ajax({
    //   method: "POST",
    //   url: "/api/rank/" + id,
    //   rating: "test"
    // })
    // .then(getSites);
}

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
      url: $newItemInput.val().trim().replace('www.','').replace('http://','').replace('https://',''),
      description: $newItemInput2.val().trim()
    };
    console.log(site)
    $.post("/api/sites", site);
    $newItemInput.val("");
  }

  function myFunction() {
    location.reload();
}

var $siteContainer = $(".site-container");

function initializeRows() {
  console.log("initialize");
  $siteContainer.empty();

  for (var i = 0; i < sites.length; i++) {
    // rowsToAdd.push(createNewRows(sites[i]));
    createNewRows(sites[i],i);
  }
}

function getSites() {
    $.get("/api/sites", function(data) {
      sites = data;
      console.log(sites);
      initializeRows();
      getCurrentUser();
    });
  }

  function getCurrentUser() {
    return $.ajax({ url: "/api/user", method: "GET" });
  }

  function createNewRows(sitesArr,i) {
    getCurrentUser().then(function(currentUserID) {
      console.log("inside the promise");
      // console.log(currentUserID);
      // .then( function(data){
      // console.log(typeof(data))
      // console.log(sites.UserId);
      // console.log(req);

    if (sitesArr.UserId === currentUserID) {
      console.log(sitesArr);
    
      var $newInputRow = $(
        [
          "<li class='list-group-item' style='overflow: auto;'>",
          "<canvas id='myCanvas" +i + "'width='100' height='100' style='border-width:3px; border-style:solid; border-color: blueviolet; float:left; vertical-align: text-top;'></canvas>",
          "&#8194;",
          "<a href=",
          "https://",
          sitesArr.url,
          " ",
          "target=",
          "_blank",
          ">",
          "<span>",
          sitesArr.url,
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
          "<br>",
          "&#8194;",
          "<span>",
          sitesArr.description,
          "</span>",
          "<button type='button' id='thumb' class='thumb pull-right'>",
          "<span class='glyphicon glyphicon-thumbs-up'></span>",
          " ",
          sitesArr.rating,
          "</button>",
          "</li>"
        ].join("")
      );
      console.log($newInputRow);
  
      $newInputRow.find("button.thumb").data("id", sitesArr.id,);
      $newInputRow.find("button.thumb").data("rating", sitesArr.rating,);
      $newInputRow.find("button.close").data("id", sitesArr.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("todo", sites);
      if (sites.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      rowsToAdd.push($newInputRow);
        console.log(rowsToAdd);
        $siteContainer.prepend(rowsToAdd);
    }
    else {
      var $newInputRow = $(
        [
          "<li class='list-group-item' style='overflow: auto;'>",
          "<canvas id='myCanvas" +i + "' width='100' height='100' style='border-width:3px; border-style:solid; border-color: blueviolet; float: left; vertical-align: text-top;'></canvas>",
          "&#8194;",
          "<a href=",
          "https://",
          sitesArr.url,
          " ",
          "target=",
          "_blank",
          ">",
          "<span>",
          sitesArr.url,
          "</span>",
          "</a>",
          "<br>",
          "&#8194;",
          "<span>",
          sitesArr.description,
          "</span>",
          "<button type='button' id='thumb' class='thumb pull-right'>",
          "<span class='glyphicon glyphicon-thumbs-up'></span>",
          " ",
          sitesArr.rating,
          "</button>",
          "</li>"
        ].join("")
      );
      // console.log($newInputRow);
  
      $newInputRow.find("button.thumb").data("id", sitesArr.id,);
      $newInputRow.find("button.thumb").data("rating", sitesArr.rating,);
      $newInputRow.find("button.close").data("id", sitesArr.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("todo", sites);
      if (sites.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      rowsToAdd.push($newInputRow);
        $siteContainer.prepend(rowsToAdd);
    }

    var canvas = document.getElementById("myCanvas"+i);
    console.log(canvas);
    var ctx = canvas.getContext("2d");
    
    // Create gradient
    var grd=ctx.createLinearGradient(0,0,200,0);
    var value1 = Math.floor((Math.random() * 255) + 0);
    var value2 = Math.floor((Math.random() * 255) + 0);
    var value3 = Math.floor((Math.random() * 255) + 0);
    var value4 = Math.floor((Math.random() * 255) + 0);
    var value5 = Math.floor((Math.random() * 255) + 0);
    var value6 = Math.floor((Math.random() * 255) + 0);
    grd.addColorStop(0,"rgb("+value1+", "+value2+", "+value3+")");
    grd.addColorStop(1,"rgb("+value4+", "+value5+", "+value6+")");
    
    // Fill with gradient
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,200,100);
    
    var img = sitesArr.url[0];
    ctx.font = "80px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.fillText(img,22,75);

  });

  }

});