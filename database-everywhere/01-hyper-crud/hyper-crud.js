/**                        __                          __                           
  _____    ____    ____  _/  |_       _____    ____  _/  |_   ____    ____  _______ 
 /     \ _/ __ \ _/ __ \ \   __\     /     \ _/ __ \ \   __\_/ __ \  /  _ \ \_  __ \
|  Y Y  \\  ___/ \  ___/  |  |      |  Y Y  \\  ___/  |  |  \  ___/ (  <_> ) |  | \/
|__|_|  / \___  > \___  > |__|      |__|_|  / \___  > |__|   \___  > \____/  |__|   
      \/      \/      \/                  \/      \/             \/                 

Database Everywhere! - How to data.
See README.md for walkthrough...
*/

// Create a collection on both client and server
dogs = new Meteor.Collection('dog');

// Wire up the html template with a function to retrieve all the things.
if (Meteor.isClient) {
  Template.listTemplate.allTheThings = function () {
    return dogs.find();
  };
}
