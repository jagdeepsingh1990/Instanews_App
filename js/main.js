var url = "https://api.nytimes.com/svc/topstories/v2/home.json";

var data = [];
var sectionDataArray = [];
var uniqueValues = [];


option value="politics">U.S.</option>
         <option value="world">World</option>
         <option value="national">National</option>
         <option value="upshot">Upshot</option>
         <option value="nyregion">NY Region</option>
         <option value="business">Business</option>
         <option value="technology">samosa</option>
         <option value="science">Science</option>
         <option value="health">Health</option>
         <option value="opinion">Opinion</option>
         <option value="sports">Sports</option>
         <option value="arts">Arts</option>
         <option value="books">Books</option>
         <option value="movies">Movies</option>
         <option value="theater">Theather</option>
         <option value="sundayreview">Sunday Review</option>
         <option value="fashion">Fashion</option>
         <option value="tmagazine">Tmagazine</option>
         <option value="food">Food</option>
         <option value="travel">Travel</option>
         <option value="magazine">Magazine</option>
         <option value="realestate">Real Estate</option>
         <option value="automobiles">Auto Mobiles</option>
         <option value="obituaries">Obituaries</option>
         <option value="insider">Insider</option>
Message Input


$.ajax({
  url: addApi_key(url),
  method: "GET"
})
  .done(function(result) {
    data = result.results;
    console.log(data)
    sectionDataArray = data.map(function(value) {
      return value.section;
    });
    uniqueValues = removeDups(sectionDataArray);
    addOptionsToList(uniqueValues);
  })
  .fail(function(err) {
    throw err;
  });


//Add options to list
function addOptionsToList(value) {
  $.each(value, function(key, value) {
    $("#select_options").append(
      $("<option/>", {
        value: value,
        text: value
      })
    );
  });
}

//on select option
$("#select_options").change(function() {
  var option_text = $("#select_options option:selected")
    .text()
    .replace(" ", "");
  url = "https://api.nytimes.com/svc/topstories/v2/" + option_text + ".json";
  console.log(addApi_key(url))
  $.ajax({
    url: addApi_key(url),
    method: "GET"
  })
    .done(function(result) {
      data = result;
      console.log(data)
    })
    .fail(function(err) {
      throw err;
    });

  addNewsToDiv(data, option_text);
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
// Add data to news Conatiner
function addNewsToDiv(dataArr, val) {
  $.each(dataArr, function(index, value) {
    if (val === value.section) {
      var abstract = value.abstract;
      var newsUrl = value.url;
      if (value.multimedia.length !== 0) {
        var imgurl = value.multimedia[4].url;

        $(".newsData").append(
          '<div class= "newsDiv"><img src = "' +
            imgurl +
            '"><a target = "_blank" href = "' +
            newsUrl +
            '" ><p>' +
            abstract +
            "</p></a></div>"
        );
      }
    }
  });
}

//Remove duplicate value from Array
function removeDups(names) {
  var unique = {};
  names.forEach(function(i) {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}
