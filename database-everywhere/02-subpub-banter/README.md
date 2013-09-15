```
                           __                          __                           
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______ 
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|   
      \/      \/      \/                  \/      \/             \/                 
```

Database Everywhere! - sub/pub banter.
======================================

Stage 1
---

In your terminal, run `meteor` in the `stage-1` directory:

```sh
meteor
```

Now you've got a simple Meteor app running. If you can see:

	=> Meteor server running on: http://localhost:3000/

...then all is well.

As per the first demo, you should be able to insert messages into the `Messages` collection using your browser console:

```javascript
Messages.insert({
  handle: "meteor@example.org",
  msg: "Oh HAI!",
  created: Date.now()
})
```

Stage 2
---

Second thing to do is remove the `insecure` and `autopublish` packages from your meteor app. These are two core packages included by default in newly created meteor apps.

```sh
meteor remove insecure
meteor remove autopublish
```

Create a file `server/main.js` and add some code to publish a record set called 'messages' sorted by creation date (DESC), allowing the client to specify the `limit` when they subscribe.

```javascript
Meteor.publish("messages", function (opts) {
  return Messages.find({}, {limit: opts.limit, sort: [["created", "desc"]]})
})
```

In `shared.js` add some code that'll allow clients to _insert_ into the collection:

```javascript
Messages.allow({
  insert: function (userId, msg) {
    msg.created = Date.now() // Add timestamp server side so client can't effect message ordering
    return true
  }
})
```

In `client/js/main.js` subscribe to the `messages` feed:

```javascript
Meteor.subscribe("messages", {limit: LIMIT})
```

Sub out the functionality to post a message by attaching events to some DOM elements:

```javascript
// Send a message by inserting into the Messages collection
function sendMsg () {
}

// Events for sending messages
Template.input.events({
  "click #send": sendMsg,
  "keypress #msg": function (event) {
    if (event.which == 13) {
      event.preventDefault()
      sendMsg()
    }
  }
})
```

Stage 3
---

Implement the `sendMsg` function.

Use `window.location.pathname` to create chat rooms in your app. Your published record set will need to accept a chat room parameter and filter the records accordingly. When sending messages you'll have to save the chat room name.

### Bonus points

Create a button that when clicked will retrieve the prior 25 messages in the conversation.