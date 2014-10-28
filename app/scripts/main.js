var Kitty = function(options) {
  options = options || {};
  this.completed = options.completed || false;
  this.task = options.task || 'Nothing was entered';
  this.elem = options.elem || {};
};
