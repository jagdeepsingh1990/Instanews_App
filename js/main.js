var url = "https://api.nytimes.com/svc/topstories/v2/home.json";

var data = [];
var sectionDataArray = [];
url +=
  "?" +
  $.param({
    'api-key': "cec89a9c54f24354af812aedc5a43321"
  });
  console.log(url)
$.ajax({
  url: url,
  method: "GET"
  
}).done(function(result) {
     data = result.results;
    console.log(result);
     sectionDataArray = data.map(function(value) {
      return value.section;
    });
    console.log(sectionDataArray);
    
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
    var uni = removeDups(sectionDataArray);
    console.log(uni);

    // $('#select_options').append($('<option>', {
    //     value: 1,
    //     text: 'My option'
    // }));
    $('#select_options').empty();
    $.each(uni, function(key, value) {
      $('#select_options').append(
        $('<option/>', {
          value: value,
          text: value
        })
      );
    });
    $('#select_options').change(function() {
        var val = $('#select_options option:selected').text().replace(" ", "");
        console.log(val);
        $.each( data, function( index, value ){
          if (val == value.section){
            console.log(value.section)
            // console.log("True")
          }
      });
      });
  })
  
  
  .fail(function(err) {
    throw err;
  });


 

