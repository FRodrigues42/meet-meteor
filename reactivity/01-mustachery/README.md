```
                           __                          __                           
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______ 
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|   
      \/      \/      \/                  \/      \/             \/                 
```

Reactivity! - Moustachery: Curly braces for a lovely faces
==========================================================

Stage 1
-------

In your terminal, run `meteor` in the `stage-1` directory:

```sh
meteor
```

Now you've got a simple Meteor app running. If you can see:

	=> Meteor server running on: http://localhost:3000/

...then all is well. Marvel at the mustaches.

Stage 2
-------

Goals: 

**1. The strap line in the header should be randomly selected from a list**

For this you will need to:

- Pull the contents of the header element into a template element after the closing body tag

```html

<header>{{> header}}</header>

<template name="header">
	<h1>...</h1>
</template>
```

- Replace the hardcoded strapline with a handlebars template variable called `{{strapline}}`

- In the .js file, create a corresponding template helper using the template name and variable name

```js

Template.header.strapline = function () {
	// return the `strapline` value from the Session object
}

```

- For bonus marks, add a `click` handler to the header template and have it pick another random strapline

```js

Template.header.events({
	'click': function (evt) { /* update the Session with a new strapline */ }
})

```

**2. Have the search input do a search on submit**

For this you will need to:

- Pull the `.search` div into a template called `search` after the closing body tag

- Add a `submit` handler to the `search` template in the .js file as you did with the header template.
  - You'll need to `evt.preventDefault()` to stop the submit from re-loading the page
  - Get the value of the #searchInput to find the search term
  - Insert a new object with a timestamp and the search term into the `Mustaches` Collection, and hang on to the id that it returns

```js
{createdDate: Date.now(), name: term}  
```
  - Call the provided fingImg(...) function with the search term and a callback function that updates the same item we just added to the `Mustaches` collection, adding a `img` property with the following. You can use the id as the first argument to `.update` and the syntax for setting a field is here: http://docs.mongodb.org/manual/reference/operator/set/

  - Call `alert` with the returned url so we can eyeball the data. Next up, LET'S RENDER SOME 'STACHES.

Stage 3
-------

Using what you've learnt so far, try:

1. Replace the repeated `.stache` divs with a `<template name="mustaches">`
  - Wrap the template in an `{{#each allOfThem}}...{{/each}}` helper so it repeats, and use the {{img}} and {{name}} variables in place of the hardcoded image src and h2 text.

  - Create a helper function on a `Template.mustaches` onject in the .js file called `allOfThem` that returns all of the objects in the `Mustaches` Collection.

  - Add an `isEmpty` helper on the same template that returns true if the Collection count is 0;

  - Use the `isEmpty` helper to show a *Search for some mustach* message when the collection is empty, by adding an {{/if isEmpty}} block to the template.


SUPER BOUNS ROUND
-----------------

- Sometimes the img url returned fails to load. Can we fix that? We get a pile of results from the search, as JSON, that we could store along with the search term in the Mustaches collection...
