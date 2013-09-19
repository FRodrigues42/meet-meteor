// Create a collection on both client and server
People = new Meteor.Collection("people")

// Setup access control rules
People.allow({
  // Allow all inserts
  insert: function (userId, doc) {
    return true
  },
  // Allow updates to ONLY name field
  update: function update (userId, doc, fieldNames) {
    if (fieldNames.length == 1 && fieldNames[0] == "name") {
      return true
    }
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

People.deny({
  // Don't allow duplicates
  insert: function (userId, doc) {
    if (People.findOne({name: doc.name})) {
      console.log("Disallowing insert of duplicate person", doc.name)
      return true
    }
    return false
  }
})

// Wire up the html template with a function to retrieve all the people
if (Meteor.isClient) {
  Template.friendlies.people = function () {
    return People.find()
  }
}