```
                           __                          __                           
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______ 
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|   
      \/      \/      \/                  \/      \/             \/                 
```

Database Everywhere! - How to data.
===================================

Stage 1
---

In your terminal, run `meteor` in this directory:

	meteor
	open http://localhost:3000

Now you've got a simple Meteor app running. If you can see:

	=> App running at: http://localhost:3000/

...then all is well.

Stage 2
---

Now let's CRUD. In your browsers dev console try:

```javascript
dogs.insert({name:'rover', breed:'pointer'})
dogs.insert({name:'fido', breed:'poodle'})
dogs.insert({name:'dug', breed:'golden retriever'})
```

As you insert objects to the collection, you should see them appear on the page.

Stage 3
---

Now, using the [meteor collection docs](http://docs.meteor.com/#find) as a helping hand, try some queries in your browser console to CRUD them:

* Fetch (pun intended) all dogs from the database
* Fetch a single dog by name
* Delete all dogs whose name is "rover"
* Insert some new dogs with profile pictures into the database by adding a field `url` to the object you insert
* Add a profile picture to an existing dog