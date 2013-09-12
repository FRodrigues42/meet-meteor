```
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______ 
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|   
      \/      \/      \/                  \/      \/             \/                 
```

Database Everywhere! - sub/pub banter.
======================================

In your terminal, run `meteor` in this directory:

```sh
meteor
```

Now you've got a simple Meteor app running. If you can see:

	=> Meteor server running on: http://localhost:3000/

...then all is well. Now let's chat.

The interesting files are:

```
shared.js
server/main.js
client/js/main.js
```

`shared.js` is code run on _both_ the client _and_ the server. It defines a shared collection called 'messages'.

`server/main.js` publishes a record set called 'messages' that the client can subscribe to. The client can pass parameters when it subscribes, in this case the server is expecting `channel` and `limit` parameters.

`client/js/main.js` subscribes to the feed, renders and re-renders the message list automatically whenever the data in it's messages collection changes. It can also insert messages into the collection that are automatically propogated to the server and any other connected clients.

What now?
---

Create a button that when clicked will retrieve the prior 25 messages in the conversation.