var url = 'http://tiy-atl-fe-server.herokuapp.com/collections/zombiekitty2';
// Item Constructor
// --------------------------------------------------------------------------------------------------------------------------------------------
var Kitty = function(options) {
  options = options || {};
  this.deleted = 'false';
  this.task = options.task || 'Nothing was entered';
  this.done = 'false';
};
// Variables
// --------------------------------------------------------------------------------------------------------------------------------------------
var lil_kitty;
var todolist;
var input_stuff;
var item_template = $('#item_template').html();
var rendered = _.template(item_template);
var count = 0;
var deleteCount = 0;
var taskCompleted = 0;

// Grabbing all ToDo items and showing on page
// --------------------------------------------------------------------------------------------------------------------------------------------
$.getJSON(url).done( function (data) {

  todolist = data;

  _.each(todolist, function (i) {
    if (i.deleted === 'true') {
      deleteCount += 1;
    } else if (i.deleted === 'false'){
      count += 1;
      $('.list').append(rendered(i));
      count = (todolist.length - deleteCount)
    }
  });
  // count = (todolist.length);
  $('h5').html(count + ' ' + ' Zombie Kitties remaining');
});

// List Item Count
// --------------------------------------------------------------------------------------------------------------------------------------------
$('h5').html(count + ' ' + ' Zombie Kitties remaining');

// Creates a new kitty (list) item
// --------------------------------------------------------------------------------------------------------------------------------------------
$('.input').on('submit', function (event) {
  event.preventDefault();
  var self = this;

  input_stuff = $('#newItem').val();

  lil_kitty = new Kitty ({
    completed: false,
    task: input_stuff,

  }); //lil_kitty

  //Send to our server
  // --------------------------------------------------------------------------------------------------------------------------------------------
  $.ajax({
    type: 'POST',
    url: url,
    data: lil_kitty
  }).done( function (data) {

    //Add to todolist
    // -----------------------------------------------------------------------------------------------------------------------------------------
    todolist.push(data);

    //Show our task on the page
    // ----------------------------------------------------------------------------------------------------------------------------------------
    $('.list').append(rendered(data));

    //Reset my form
    // ----------------------------------------------------------------------------------------------------------------------------------------
    $(self)[0].reset();

  });

  // How many kittys?
  // --------------------------------------------------------------------------------------------------------------------------------------------
  count += 1;
  $('h5').html(count + ' ' + ' Zombie Kitties remaining');

}); // end creating new list item

// Modifier
// --------------------------------------------------------------------------------------------------------------------------------------------
$('.list').on('click', 'li', function (event) {
  event.preventDefault();
  // Take ID # from rendered item
  var ID = $(this).attr('id');

  // Find the instance of my task
  var modifier = _.findWhere(todolist, { _id: ID });
  // If it's done, mark it undone, else mark it done
  if (modifier.done === 'true') {
    modifier.done = 'false';
    $(this).removeClass('done');
    $('.allDone').css('color', 'HSLA(97, 57%, 68%, 1)');
    $(this).css('background-color','');
  } else {
    modifier.done = 'true';
    $(this).addClass('done');
    // $(this).append('<div class="allDone">COMPLETED</div>');
    $('.list').append(this);
    $(this).css('background-color', 'HSLA(122, 98%, 22%, 1)');
  }
  // ajax call to update completed status
  $.ajax({
    type: 'PUT',
    url: url + "/" + modifier._id,
    data: modifier
  });
}); //Modifier $(.list)

// // Mark Item As Done
// $('ul').on('click', 'li', function (event) {
//   event.preventDefault();
//   $(this).addClass('completed');
//   doneCount += 1;
// });
// // Unmark Item as Done
// $('ul').on('click', '.completed', function (event) {
//   event.preventDefault();
//   $(this).removeClass('completed');
//   doneCount -= 1;
// });

// Deletes a bad kitty
// --------------------------------------------------------------------------------------------------------------------------------------------
$('#clearCompleted').on('click', function(event) {
  event.preventDefault();
  console.log('clicked');
  $('.list').html('');
  _.each(todolist, function(item) {
    item.deleted = 'true';
    var ID = item._id;

    if (item.deleted==='true') {
      $.ajax({
        type: 'DELETE',
        url: url + "/" + ID,
        data: item
      });
    };

  });
  count = 0;
  $('h5').html(count + ' ' + ' Zombie Kitties remaining');
});

// party kitty
// --------------------------------------------------------------------------------------------------------------------------------------------
$('.party-kitty').hover(function () {
  $(this).toggleClass('animated shake');
});
