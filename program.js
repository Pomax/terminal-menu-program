var Menu = require("./menu");
var clear = function() { process.stdout.write("\u001b[2J\u001b[0;0H"); };

var Program = function(name) {
  this.name = name;
  this.menus = {};
  this.active = false;
};

Program.prototype = {
  addMenu: function(name) {
    var menu = new Menu(name, this);
    this.menus[name] = menu;
    return menu;
  },
  reset: function() {
    if (this.active) {
      this.active.close();
      clear();
    }
  },
  run: function(name, idx) {
    this.reset();
    if(!!name) {
      this.active = this.menus[name];
      this.active.draw(idx);
    }
  },
  halt: function() {
    this.reset();
  },
  debug: function(s) {
    this.active.menu.write(s+"\n");
  }
};

module.exports = Program;
