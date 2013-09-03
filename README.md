Meet Meteor - Turn ideas into webapps, fast. 
============================================

A beginner friendly workshop, getting reactive & real-timey with Node, Mongo DB, WebSockets & Meteor magic sauce.

Who are we?
-----------
[@olizilla](https://twitter.com/olizilla), [@_alanshaw](https://twitter.com/_alanshaw),[@cwaring](https://twitter.com/cwaring)

Co-organisers of the Meteor London meetup, the 2nd largest Meteor user group in the world. (SF is hard to beat)

For the back story see: http://meet-meteor-london.meteor.com/

Topics that we'll cover
-----------------------

- **What's a Meteor made of?**: How Meteor fits together, and where it fits in the firmament.
- **Database Everywhere**: Client-side Mongo, data on the wire, pub/sub, access control and latency compensation.
- **Reactivity**: Autogmagic DOM updates, Handlebars++, Deps dependency tracking and custom CRUD event handlers.
- **Users & Auth, Sessions & Smart Packages**
- **Getting up**: Deploying to meteor.com & custom hosting.


What's a Meteor made of?
------------------------

### A full stack web framework
- Manages client **and** server side.
- Things like Rails manage server side issues.
- Things like Ember & Angular provide front-end structure.
- Meteor helps out with both.
- It's Node + MongoDB + Socket.io + Handlebars, in a package designed to get you up and running, fast.

### It's focused on realtime reactivity
- Most existing frameworks cater for the traditional model; server handles a request by sending back html, the client renders it and we all twiddle our thumbs and wait until the user interacts with the page.
- Meteor doesn't do that.
- Meteor is all about data and diffs, autosync'd and live updated. It still all ends up as angle brackets and web pages, but Meteor has grown up in a world where client side templating is a thing, and user experience matters.

### Keeping it simple
- Your client gets a collection. When they add something to it, Meteor syncs the change to the server, and pushes it out to all the other connected clients.
- That's it.
- ...and that's why it's awesome.
- Your client and server code is all JS.
- The collection api is just a subset of the mongo api.
- There are just less things to keep in your brain-stack.
- And so the velociraptor of complexity is kept at bay long enough for you to crank out your ideas.

### React! Respond! Deploy!
- It's fun. **Try it.**
- Graphs that dance in front of your eyes, maps that track in realtime, collaborative drawing boards. Formally all the domain of desktop apps and wizards.
- Even if you are smart enough to have an idea on how you'd build a twitter like website that updates as you're looking at it, it's not trivial to get going. There's a lot of choices to make and beasties to dodge.
- It is super simple to install Meteor then create and deploy your first reactive app. Look:

```
  	 curl https://install.meteor.com | /bin/sh      // EGADS! Running a script off the internet! 
                                                    // Go look at the source if you're worried.

  	 meteor create flipping-awesome-app             // create a working template app
  	 meteor                                         // runs it
  	 meteor deploy flipping-awesome                 // deploys it to flipping-awesome.meteor.com
```

### WAT MOAR DO U WANT?

**Proof, dammit! I want proof.**

- http://goto.meteor.com
- http://meet.meteor.com
- http://foam.meteor.com
- http://browpie.meteor.com
- http://blackboard.meteor.com
- http://competition.orlebarbrown.com/
- http://listerly.co/
- http://www.wigwamm.com/
- http://pegleg.it/

**Slides, dammit! I want slides.**

- http://the-medium-is-the-message.meteor.com/
- https://github.com/jongd/realworld-realtime

**Oh. Ok. Sounds fun. Let's go!**
- http://meteor.com/
- http://www.meetup.com/Meteor-London/
