var createMenu = require("terminal-menu");
var copy = function(o) { return JSON.parse(JSON.stringify(o)); };

var Menu = function(name, program) {
  this.setup(name, program);
};

Menu.prototype = {
  setup: function(name, program) {
    this.name = name;
    this.program = program;
    this.operations = [];
    this.selectables = [];
    this.options = {};
    this._options = {};
  },
  schedule: function(fn) {
    setTimeout(fn.bind(this), 1);
  },
  cacheOptions: function() {
    this._options = copy(this.options);
  },
  restoreOptions: function() {
    this.options = copy(this._options);
    this.selectables.forEach(function(op) { op.toggled = this.options[op.content]; }.bind(this));
  },
  start: function() {
    this.menu = createMenu({
      width: process.stdout.columns - 4,
      height: process.stdout.rows - 4,
      x: 0,
      y: 0
    });
    this.menu.reset();
    this.menu.createStream().pipe(process.stdout);
  },
  reset: function() {
    if(this.menu) {
      this.menu.reset();
      this.setup(this.name, this.program);
    }
  },
  close: function() {
    if(this.menu) {
      this.menu.reset();
      this.menu.close();
    }
  },
  addText: function(s) {
    var label = s + "\n";
    this.operations.push({
      type: "text",
      content: label
    });
  },
  addSpacer: function(s) {
    this.addText('');
  },
  addOption: function(s, n, callback) {
    var op = { type: "option", content: s, screen: n, callback: callback };
    this.addSelectable(op);
  },
  addCheckedOption: function(s, callback) {
    var op = { type: "checkbox", content: s, toggled: false, callback: callback };
    this.addSelectable(op);
    this.options[s] = false;
  },
  setConfirm: function(label, nextScreen, callback) {
    if(typeof nextScreen === "function") {
      callback = nextScreen;
      nextScreen = false;
    }
    var op = { type: "confirm", content: label, screen: nextScreen, callback: callback };
    this.addSelectable(op);
  },
  setCancel: function(label, prevScreen, callback) {
    if(typeof prevScreen === "function") {
      callback = prevScreen;
      prevScreen = false;
    }
    var op = { type: "cancel", content: label, screen: prevScreen, callback: callback };
    this.addSelectable(op);
  },
  addSelectable: function(op) {
    this.operations.push(op);
    this.selectables.push(op);
  },
  handler: function(label) {
    var entry, idx;
    this.selectables.forEach(function(op, i) {
      if(op.label === label) { entry = op; idx = i; }
    });
    if(entry) {
      if(entry.type === "checkbox") {
        entry.toggled = !entry.toggled;
        this.options[entry.content] = entry.toggled;
        if(entry.callback) { entry.callback(entry.toggled); }
        return this.draw(idx);
      }
      if(entry.type === "option") {
        this.departureidx = idx;
        if(entry.screen) {
          this.schedule(function() {
            this.program.run(entry.screen);
          });
        }
        if(entry.callback) {
          entry.callback();
        }
      }
      if(entry.type === "confirm") {
        if(entry.screen) {
          this.program.run(entry.screen);
        }
        if(entry.callback) {
          entry.callback(copy(this.options));
        }
      }
      if(entry.type === "cancel") {
        this.restoreOptions();
        if(entry.screen) {
          this.program.run(entry.screen);
        }
        if(entry.callback) {
          entry.callback(copy(this.options));
        }
      }
    }
  },
  draw: function(optionidx) {
    this.close();
    this.start();
    var menu = this.menu;

    if(arguments[0] === undefined) { this.cacheOptions(); }
    optionidx = optionidx || this.departureidx || 0;
    delete this.departureidx;

    this.operations.forEach(function(op, idx) {
      var label = op.content;
      switch(op.type) {
        case "text": menu.write(label); break;
        case "option":
        case "confirm":
        case "cancel": label = "[" + label + "]"; menu.add(label); break;
        case "checkbox": label = "[" + (op.toggled ? 'x' : ' ') + "] " + label; menu.add(label); break;
      }
      op.label = label;
      if(idx === optionidx) { menu.jump(idx); }
    });
    menu.on('select', this.handler.bind(this));
  }
};

module.exports = Menu;
