/* global describe, it */

(function () {
  'use strict';

  describe('To Do List', function () {

    var kitty;

    beforeEach(function() {
      kitty = new Kitty();
    });

    describe('kitty creation', function () {

      it('should be an instance of Kitty', function () {
        expect(kitty).to.be.an.instanceof(Kitty);
      });

    }); //kitty creation

    describe('kitty properties', function () {

      it('should have completed of false', function() {
        expect(kitty.completed).to.equal(false);
      });

    }); //kitty properties

  }); //To Do List

})();



// Set up constructor
// Set up instance for each item
// Set up input field
// On enter create new li
// append to last li
// count of items left
// count of items completed
// be able to delete li on click
// be able to mark as completed
// be able to unmark as completed
// auto move completed to end of list
// new items append to bottom of incompete items
