var url = 'http://tiy-atl-fe-server.herokuapp.com/collections/zombiekitty';

var Kitty = function(options) {
  options = options || {};
  this.completed = 'false';
  this.deleted = options.deleted || false;
  this.task = options.task || 'Nothing was entered';
  // this.elem = options.elem || {};
};

var lil_kitty;
var todolist;

var input_stuff;
var item_template = $('#item_template').html();
var rendered = _.template(item_template);
var count = 0;
var doneCount = 0;

// Grabbing all ToDo items and showing on page
$.getJSON(url).done( function (data) {

  todolist = data;

  _.each(todolist, function (i) {
    $('.list').append(rendered(i));
  });

});


$('h5').html(count + ' ' + ' Zombie Kitties remaining');

// Creates a new kitty (list) item
$('.input').on('submit', function (event) {
  event.preventDefault();
  var self = this;

  input_stuff = $('#newItem').val();

  lil_kitty = new Kitty ({
    completed: false,
    task: input_stuff,

  }); //lil_kitty

  //Send to our server
    $.ajax({
    type: 'POST',
    url: url,
    data: lil_kitty
  }).done( function (data) {

    //Add to todolist
    todolist.push(data);

    //Show our task on the page
    $('.list').append(rendered(data));

    //Reset my form
    $(self)[0].reset();

  });

  // How many kittys?
  count += 1;
  $('h5').html(count + ' ' + ' Zombie Kitties remaining');

});

// Modifier
var modifier;
$('.list').on('click', 'li', function (event) {
  event.preventDefault();
});

  var focus_id = $(this).attr('id');

  //Find the instance of my task
  modifier = _.findWhere(todolist, { _id: focus_id });

  //If it's done, mark it undone, else mark it done
  if (modifier.completed == 'true') {
    modifier.completed = 'false';
    $(this).removeClass('fin');
  } else {
    modifier.completed = 'true';
    $(this).addClass('fin');
  }

  $.ajax({
    type: 'PUT',
    url: url + "/" + modifier._id,
    data: modifier
  });

// Mark Item As Done
$('ul').on('click', 'li', function (event) {
  event.preventDefault();
  $(this).addClass('completed');
  doneCount += 1;
});
// Unmark Item as Done
$('ul').on('click', '.completed', function (event) {
  event.preventDefault();
  $(this).removeClass('completed');
  doneCount -= 1;
});

// Deletes a bad kitty
$('.list').on('click', '#delete', function() {
  $(this).delay( 1000 ).parent().remove();
  count -=1;
  $('h5').html(count + ' ' + ' Zombie Kitties remaining');
});

//party kitty
$('.party-kitty').hover(function () {
  $(this).toggleClass('animated shake');
});
