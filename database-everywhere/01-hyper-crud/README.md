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

In your terminal, run `meteor` in this directory:
	
	meteor
	open http://localhost:3000

Now you've got a simple Meteor app running. If you can see:

	=> Meteor server running on: http://localhost:3000/

...then all is well. Now let's CRUD. In your browsers dev console try:

```javascript
dogs.insert({name:'rover', breed:'pointer'})
dogs.insert({name:'fido', breed:'poodle'})
dogs.insert({name:'dug', breed:'golden retriever'})
```

As you insert objects to the collection, you should see them appear on the page. 
Now try some queries to retrieve them:

```javascript
dogs.find().fetch()
dogs.find({breed: /^po/}).fetch()
dogs.findOne({name:'rover'})
```