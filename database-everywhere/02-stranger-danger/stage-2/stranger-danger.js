// Create a collection on both client and server
People = new Meteor.Collection("people")

// Setup access control rules
People.allow({
  // Allow all inserts
  insert: function (userId, doc) {
    return true
  },
  // Disallow all updates
  update: function update (userId, doc, fieldNames) {
    return false
  },
  // Allow friendly people to become strangers, unless they're Mum or Dad
  remove: function (userId, doc) {
    if (["mum", "dad"].indexOf(doc.name.toLowerCase()) != -1) {
      return false
    }
    return true
  }
})

// Wire up the html template with a function to retrieve all the people
if (Meteor.isClient) {
  Template.friendlies.people = function () {
    return People.find()
  }
}