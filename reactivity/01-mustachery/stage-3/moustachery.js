/**                        __                          __                           
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______ 
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|   
      \/      \/      \/                  \/      \/             \/                 

Reactivity! - How to template.
See README.md for walkthrough...
*/

var Mustaches = new Meteor.Collection('mustaches');

if (Meteor.isClient) {
  
  var straps = [
    "A hotchpotch of handlebars",
    "Curly braces for a lovely faces",
    "Markup grooming maketh man",
    "Temple of plate brushes",
  ]  

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

  // TRY ME: Replace this with http://docs.meteor.com/#random
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }  
}

