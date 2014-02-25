Meteor.publish("messages", function (opts) {
  return Messages.find({}, {limit: opts.limit, sort: [["created", "desc"]]})
})