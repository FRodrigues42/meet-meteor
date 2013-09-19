
var straps = [
  "A hotchpotch of handlebars",
  "Curly braces for a lovely faces",
  "Markup grooming maketh man",
  "Temple of plate brushes",
]

var Mustaches = new Meteor.Collection('mustaches');

if (Meteor.isClient) {
  
  Template.header.strapline = function () {
    return straps[getRandomInt(0, straps.length - 1)]
  };

  Template.header.events({
    click: function (evt) {
      $('header span').html(Template.header.strapline());
    },
  });  

  Template.mustaches.isEmpty = function () {
    return Mustaches.find().count() < 1;
  }  

  Template.mustaches.allOfThem = function () {
    return Mustaches.find({}, {sort:[['createdDate','desc']]});
  };

  Template.search.events({
    submit: function (evt) {
      evt.preventDefault();
    
      var term = $('#searchInput').val()
    
      console.log($('#searchInput').val())

      var stachId = Mustaches.insert({createdDate: Date.now(), name: term});

      findGif(term, function(url){
        // Mustaches.update(stachId, {img: url});
        Mustaches.update(stachId, {$set: {img: url}});
      });
  
    },
  });

  function findGif(search, cb) {
    $.getJSON("http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+search+"+moustache+animated+filetype:gif&callback=?",
    function(data){
      $.each(data.responseData.results, function(i,item){
        cb(item.unescapedUrl);
        if ( i == 0 ) return false;
      });
    });
  }

}

// TRY ME: Replace this with http://docs.meteor.com/#random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}