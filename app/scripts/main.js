var Kitty = function(options) {
  options = options || {};
  this.completed = options.completed || false;
  this.task = options.task || 'Nothing was entered';
  this.elem = options.elem || {};
};

var todolist = [];
var input_stuff;

$('#submit').on('click', function (event) {
  event.preventDefault();

  input_stuff = $('#newItem').val();
  $('.list').append("<li>" + input_stuff + "</li>");
});
