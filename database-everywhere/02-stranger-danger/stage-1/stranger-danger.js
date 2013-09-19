// Create a collection on both client and server
People = new Meteor.Collection("people")

// Wire up the html template with a function to retrieve all the people
if (Meteor.isClient) {
  Template.friendlies.people = function () {
    return People.find()
  }
}