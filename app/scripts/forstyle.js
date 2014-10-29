// Delete button animation
$('ul').on('mouseover', '.delete', function(event) {
  event.preventDefault();
  $(this).css('padding-left', '65px').html('delete');
  $('ul').on('mouseout', '.delete', function(event) {
    event.preventDefault();
    $(this).css('padding-left','').html('X');
  })
});
