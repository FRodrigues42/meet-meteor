// Max messages to retrieve
var LIMIT = 25

Meteor.subscribe("messages", {channel: window.location.pathname, limit: LIMIT})

// Send a message by inserting into the Messages collection
function sendMsg () {
  var msg = $("#msg")
  
  if (!msg.val()) return;
  
  Messages.insert({
      channel: window.location.pathname
    , handle: $("#handle").val()
    , msg: msg.val()
  })
  
  msg.val("")
}

// Events for sending messages and saving handle and font selection to localStorage
Template.input.events({
  "click #send": sendMsg,
  "keyup #handle": function () {
    if (localStorage) {
      localStorage.setItem("handle", $("#handle").val())
    }
  },
  "keypress #msg": function (event) {
    if (event.which == 13) {
      event.preventDefault()
      sendMsg()
    }
  }
})

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