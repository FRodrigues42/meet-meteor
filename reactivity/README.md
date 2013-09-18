```
                           __                          __                           
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______ 
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|   
      \/      \/      \/                  \/      \/             \/                 
```

Reactivity! - Coping with change.
=================================

This is a common chant oftern heard yelled by web developer outside the offices of the United Inetrnets:

	What do we want? **DATA DRIVEN HTML!**

  How are we going to achieve it? **TEMPLATES!**

	When do we want it? **NOW!**

	When do we next want it? **WHEN THE DATA CHANGES!**

In this secion we're goint to look at how to get Meteor to render your data and automagiaclly re-render when it changes.

Templates
---------

A large chunk of web development is the in the gluing together chunks of HTML and inserting data between angle brackets via templates

Meteor uses Handlebars syntax {{myVariable}} {{>otherTemplate}} {{#if isTrue}} {{/if}} {{#each arrayOfThings}} {{/each}}

You build up some html, calling helper functions and properties to make it dynamic.

So, for example, to get a nice list of dog names like this:

```html
<ul>
  <li>Fido</li>
  <li>Dug</li>
  <li>Hooch</li>
<ul>
```

you'd make a template like this:

```html
<template name="dogNames">
  <ul>
    {{#each dogs}}
    <li>{{name}}</li>
    {{/each}}
  </ul>
</template>
```

The template tag `<template name="dogNames">` tells Meteor that the child elements are a template not raw HTML, and should be processed accordingly.

The `name="dogNames"` gives us the name by which we'll refer to this template from the code, like so:

```js
Template.dogNames.dogs = function () {
  return [{name:'Fido'}, {name:'Dug'}, {name:'Hooch'}]
}
```

When the template is processed the `{{#each dogs}}` helper calls the `dogs` function on the `dogNames` template and renders it's child elements once for each item in the array, in this case producing a list item for each dog's name.


Automagic DOM updates - Reacting to change
------------------------------------------

Much of Meteor's magic is in the reactivity. 

Reactive data sources announce when they change, and Meteor uses this to re-render your templates as the data they use changes.

So if we change the Template code above to use a reactive data source

```js
var Dogs = new Meteor.Collection('AllTheDogs')

Template.dogNames.dogs = function () {
  return Dogs.find()
}
```

Meteor will automatically re-render the dogNames template whenver the Dogs collection is changed.

WAT! THIS IS MAGIC.

Yes, the surprising part is 


Deps - make anything reactive!
------------------------------

