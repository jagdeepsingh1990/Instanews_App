
$(document).ready(function() {
  $('#select_options').select2();
});



var url = "https://api.nytimes.com/svc/topstories/v2/home.json";

let newsDiv = $(".newsData");
let selectOptionList = $("#select_options")

//on select option
selectOptionList.change(function() {
  var option_text = $("#select_options option:selected")
    .val()
    .replace(" ", "");
  url = "https://api.nytimes.com/svc/topstories/v2/" + option_text + ".json";

  $.ajax({
    url: addApi_key(url),
    method: "GET"
  })
    .done(function(result) {
      var data = result.results;

      newsDiv.empty();
      if (data.length !== 0) {
        addNewsToDiv(data);
      }
      
    })
    .fail(function(err) {
      throw err;
    });
});

// add apiKey to Url
function addApi_key(urlText) {
  urlText +=
    "?" +
    $.param({
      "api-key": "cec89a9c54f24354af812aedc5a43321"
    });
  return urlText;
}

let logoDiv = $(".logo_flex1")
let selectOptionClass = $(".select_option")
let logoImage = $("._logoImg")
let newsContainer = $(".newsData")
selectOptionList.change(function() {
 
  if ($(window).width() >= 600 && $(window).width() <= 1200) {
    
    logoDiv.css({
      height: "14vh",
      "flex-basis": "40%"
    });
    selectOptionClass.css({
      height: "14vh",
      "flex-basis": "57%"
    });
    logoImage.css({
      height: "10vh",
      position: "absolute",

      "margin-right": "6%"
    });
    newsContainer.css({
      "padding-top": "0px"
    });
  } else if ($(window).width() > 1200) {
    
    logoDiv.css({
      height: "16vh",
      
      "flex-basis": "16%",
      "justify-content": "start"
    });
    
    logoImage.css({
      height: "10vh",
      "margin-left":"30px"
    });
    selectOptionClass.css({
      height: "16vh",
      "flex-basis": "83%"
    });
    newsContainer.css({
      "padding-top": "0px"
    });
  } else {
    return
  }
  $(".select_option").css({ height: "auto" });
});
// Add data to news Conatiner

function addNewsToDiv(dataArr) {
  $.each(dataArr, function(index, value) {
    var abstract = value.abstract;
    var newsUrl = value.url;
    if (abstract !== "" && newsUrl !== "" && value.multimedia.length !== 0) {
      var imgurl = value.multimedia[4].url;

      newsDiv.append(
        '<div class= "newsDiv"><img src = "' +
          imgurl +
          '"><a target = "_blank" href = "' +
          newsUrl +
          '" ><p>' +
          abstract +
          "</p></a></div>"
      );
      //
      return index < 11;
    }
  });
}

//Remove duplicate value from Array
// function removeDups(names) {
//   var unique = {};
//   names.forEach(function(i) {
//     if (!unique[i]) {
//       unique[i] = true;
//     }
//   });
//   return Object.keys(unique);
// }
