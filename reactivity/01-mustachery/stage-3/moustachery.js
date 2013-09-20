/**                        __                          __                           
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______ 
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|   
      \/      \/      \/                  \/      \/             \/                 

Reactivity! - How to template.
See ../README.md for walkthrough
*/

// Collection is shared between client and server
Mustaches = new Meteor.Collection('mustaches');

if (Meteor.isClient) {
  
  // Non-reactive, plain old array.
  var straps = [
    "A hotchpotch of handlebars",
    "Curly braces for a lovely faces",
    "Markup grooming maketh man",
    "Temple of plate brushes"
  ]
  
  // Store a random strapline in the reactive Session object on the client.
  Session.set('strapline', randomStrapLine());

  // Add a helper to retrieve a strapline
  Template.header.strapline = function () {
    // Meteor notices this templates is dependant on the Session's strapline value, and will re-render when it chages.
    return Session.get('strapline');
  };

  // on click: pick another random strapline and set it on the Session
  Template.header.events({
    click: function (evt) {
      Session.set('strapline', randomStrapLine());
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

      findImg(term, function (url) {
        Mustaches.update(stachId, {$set: {img: url}});
      });
    },
  });  
}

// ---- Helper function, ignore for now ---------------------------------------

// TRY ME LATER: Replace this with http://docs.meteor.com/#random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomStrapLine () {
  return straps[getRandomInt(0, straps.length - 1)]
} 

// Search google for an image url...
function findImg(search, cb) {
  
  // add `+animated+filetype:gif` to the search for maximum funtimes
  
  $.getJSON("http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+search+"+moustache&callback=?",
  function(data){
    // TRY ME LATER: What about storing the whole doc in the the Mustaches collection?
    // TRY ME LATER: Use the additional results as a backup in case the first image fails to load...
    $.each(data.responseData.results, function(i,item){
      cb(item.unescapedUrl);
      if ( i == 0 ) return false;
    });
  });
}
