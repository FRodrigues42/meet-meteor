// Max messages to retrieve
var LIMIT = 25

// Get the messages for the template
Template.msgs.msgs = function () {
  return Messages.find({}, {limit: LIMIT, sort: [["created", "desc"]]}).fetch().reverse()
}

// When the messages have been rendered, scroll to the bottom of the page
Template.msgs.rendered = function () {
  $("html, body").animate({scrollTop: $(document).height()}, 1000)
}

// Turn an email address into a gravatar URL
Template.msg.gravatar = function (email) {
  return "http://www.gravatar.com/avatar/" + $.md5(email) + "?s=50&d=retro"
}

// Create a fuzzy from time from a timestamp
Template.msg.fromnow = function (ms) {
  return moment(ms).fromNow()
}

// Get or generate the user's handle
Template.input.rendered = function () {
  var handle = localStorage.getItem("handle") || Math.random().toString(36).substring(7) + "@gravatar.com"
  $("#handle").val(handle)
}