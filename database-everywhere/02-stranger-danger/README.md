```
                           __                          __
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|
      \/      \/      \/                  \/      \/             \/
```

Database Everywhere! - stranger danger.
=======================================

Stage 1
---

In your terminal, run `meteor` in the `stage-1` directory:

```sh
meteor
```

Now you've got a simple Meteor app running. If you can see:

	=> Meteor server running on: http://localhost:3000/

...then all is well.

As per the first demo, you should be able to insert messages into the `People` collection using your browser console:

```javascript
People.insert({name: "Joe"})
People.insert({name: "Bob"})
```

Stage 2
---

We're going to add access control rules to restrict what the client is allowed to do with our data.

Second thing to do is remove the `insecure` package from your meteor app. `insecure` is a core packages included by default in newly created meteor apps.

```sh
meteor remove insecure
```

If you start your server now, you'll not be able to insert or update or delete anymore :(

In `stranger-danger.js` add the following access control rules:

```javascript
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
```

### Now, in your browser console...

You are _allowed_ to insert:

```javascript
People.insert({name: "Mum"}, function (er) {
  if (er) return console.error("Failed to insert Mum")
  console.log("Mum insert success")
})

People.insert({name: "Dad"}, function (er) {
  if (er) return console.error("Failed to insert Dad")
  console.log("Dad insert success")
})
```

You are _not allowed_ to update:

```javascript
var mum = People.findOne({name: "Mum"})

People.update(mum._id, {$set: {name: "Dad"}}, function (er) {
  if (er) return console.log("Failed to rename Mum to Dad")
  console.error("Mum had a sex change") // Unexpected!
})
```

You are allowed to remove, but not allowed to remove Mum or Dad:

```javascript
var joe = People.findOne({name: "Joe"})

People.remove(joe._id, function (er) {
  if (er) return console.error("Failed to remove Joe")
  console.log("Joe removed")
})

var mum = People.findOne({name: "Mum"})

People.remove(mum._id, function (er) {
  if (er) return console.log("Failed to remove Mum")
  console.error("Mum removed") // Unexpected!
})
```

Stage 3
---

Change your update rule to only allow clients to update only the `name` field.

Alter your access control rules to deny inserts if a duplicate exists, either by updating the allow rule for inserts or by creating an explicit [deny rule](http://docs.meteor.com/#deny).
