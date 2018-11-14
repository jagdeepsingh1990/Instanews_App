// -------------------------------DropDown Menu----------------
$(document).ready(function() {
  $('#select_options').select2();
});



let newsDiv = $('.newsData');
let selectOptionList = $('#select_options');
var loader = $('.pageloader');
loader.hide();
// ---------------------------------on select options
selectOptionList.change(function() {
  loader.show();
  var option_text = $('#select_options option:selected')
    .val()
    .replace(' ', '');
  let url = urlUpdateByValue(option_text)

  $.ajax({
    url: addApi_key(url),
    method: 'GET'
  })
    .done(function(result) {
      loader.hide();
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
// ------------------------------------add apiKey to Url
function urlUpdateByValue(value) {
  return ('https://api.nytimes.com/svc/topstories/v2/' + value + '.json')
}

// ------------------------------------add apiKey to Url
function addApi_key(urlText) {
  urlText +=
    '?' +
    $.param({
      'api-key': 'cec89a9c54f24354af812aedc5a43321'
    });
  return urlText;
}

let logoDiv = $('.logo_flex1');
let selectOptionClass = $('.select_option');
let logoImage = $('._logoImg');
let newsContainer = $('.newsData');

// ------------------------------On_click_manage css------------------
selectOptionList.change(function() {
  $('#select_options option[value="none"]').remove();
  if ($(window).width() >= 600 && $(window).width() <= 1200) {
    logoDiv.css({
      'height': '16vh',
      'flex-basis': '40%'
    });
    selectOptionClass.css({
      'height': '16vh',
      'flex-basis': '57%'
    });
    logoImage.css({
      'height': '10vh',
      'position': 'absolute',

      'margin-right': '6%'
    });
    newsContainer.css({
      'padding-top': '0px'
    });
  } else if ($(window).width() > 1200) {
    logoDiv.css({
      'height': '16vh',

      'flex-basis': '16%',
      'justify-content': 'start'
    });

    logoImage.css({
      'height': '10vh',
      'margin-left': '30px'
    });
    selectOptionClass.css({
      'height': '16vh',
      'flex-basis': '83%'
    });
    newsContainer.css({
      'padding-top': '0px'
    });
  } else {
    logoDiv.css({
      'height': '40vh'
    });
    selectOptionClass.css({
      'height': '12vh'
    });
    newsContainer.css({
      'padding-top': '0px',
      'margin-top': '-30px'
    })
  }
  $('.select_option').css({ height: 'auto' });
});
// // ------------------------------------Add data to news Conatiner

function addNewsToDiv(dataArr) {
  $.each(dataArr, function(index, value) {
    let abstract = value.abstract;
    let newsUrl = value.url;
    if (abstract !== '' && newsUrl !== '' && value.multimedia.length !== 0) {
      let imgurl = value.multimedia[4].url;

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
