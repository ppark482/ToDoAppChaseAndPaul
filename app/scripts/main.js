var Kitty = function(options) {
  options = options || {};
  this.completed = options.completed || false;
  this.deleted = options.deleted || false;
  this.task = options.task || 'Nothing was entered';
  this.elem = options.elem || {};
};

var lil_kitty;
var todolist = [];

var input_stuff;
var item_template = $('#item_template').html();
var rendered = _.template(item_template);

// Creates a new kitty (list) item
$('.input').on('submit', function (event) {
  event.preventDefault();

  input_stuff = $('#newItem').val();
  // $('.list').append("<li>" + input_stuff + "</li>");

  lil_kitty = new Kitty ({
    completed: false,
    task: input_stuff,
    elem: $(rendered({ task: input_stuff }))[0]

  }); //lil_kitty

  todolist.push(lil_kitty);

  $('.list').append(lil_kitty.elem);

  $(this)[0].reset();

  // How many kittys?
  if (todolist.length > 0) {
    $('h6').html(todolist.length);
  };

});

// Deletes a bad kitty
$('.list').on('click', '#delete', function() {
  $(this).parent().remove();
});

// if (kitty.deleted = true) {
//
// }
