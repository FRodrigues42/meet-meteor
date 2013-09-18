var things = [{name: 'Alf'}, {name: 'Bob'}, {name: 'Cat'}]
var thongs = new Meteor.Collection('thongs')

if (Meteor.isClient) {

  Template.hello.foo = 'foo'

  Template.hello.bar = things  

  Template.hello.tao = thongs

  Template.hello.zok = function () {
    return thongs
  }

  /* Thie is the only one that will trigger a reactive change... but the array based one will re-render too, if it's in the same template. The reactive one triggers the re-render, the non-reactive one piggybacks.
  */
  Template.hello.wee = function () {
    return thongs.find().fetch()
  }

  Template.hello.greeting = function () {
    return "Welcome to blackboard.";
  };

  Template.hello.events({
    'click input' : function () {
      
      things.push({name: 'XXX'});

      thongs.insert({name: 'XXX'});

      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  if(thongs.find().count() < 1){
      thongs.insert({name: 'Zaphod'})
      thongs.insert({name: 'Yazz'})
      thongs.insert({name: 'Xavier'});
    }
  });
}
