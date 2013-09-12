Meteor.publish("messages", function (opts) {
  return Messages.find({channel: opts.channel}, {limit: opts.limit, sort: [["created", "desc"]]})
})