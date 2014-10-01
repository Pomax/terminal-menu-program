var tmp = require("./index"),
    program = new tmp.Program("Test program");

var mainMenu = (function(program) {
  var menu = program.menu("main");
  menu.text("Terminal menu programs, using retro ansi terminal menus for serious 80s technicolor business");
  menu.text("--------------------------------------------------------------------------------------------");
  menu.spacer();
  menu.text("Welcome to the test app. It's four screens (this one, and the three option screens).");
  menu.spacer();
  menu.option("option 1", "main1");
  menu.option("option 2", "main2");
  menu.option("option 3", "main3");
  menu.spacer();
  menu.text("The next two options are 'live' options, in that toggling them will trigger a callback for");
  menu.text("them, with their current state as boolean argument.");
  menu.spacer();
  menu.check("toggle 1", function(state) { /* ... */ });
  menu.check("toggle 2", function(state) { /* ... */ });
  menu.spacer();
  menu.cancel("exit", function() {
    program.halt();
    process.exit(0);
  });
  return menu;
}(program));

var subMenu1 = (function(program) {
  var menu = program.menu("main1");
  menu.text("Sub menu 1");
  menu.spacer();
  menu.text("There isn't much here other than a back option");
  menu.spacer();
  menu.cancel("back", "main");
  return menu;
}(program));

var subMenu2 = (function(program) {
  var menu = program.menu("main2");
  menu.text("Sub menu 2");
  menu.spacer();
  menu.text("There isn't much here, either other than a back option.");
  menu.text("Going back will drop your 'cursor' on this menu's option, though!");
  menu.spacer();
  menu.cancel("back", "main");
  return menu;
}(program));

var toggleMenu =(function(program){
  var menu = program.menu("main3");
  menu.text("Sub menu 3: a toggle menu");
  menu.spacer();
  menu.text("This is an integral options page, where you can set any combination of states,");
  menu.text("and saving will do a callback with all states in an options object. Cancel restores");
  menu.text("the state to what it was when you entered this menu.");
  menu.spacer();
  menu.check("toggle 1", true);
  menu.check("toggle 2", true);
  menu.check("toggle 3");
  menu.check("toggle 4");
  menu.check("toggle 5");
  menu.spacer();
  menu.confirm("save", "main", function(data) { /* ... */ });
  menu.cancel("cancel", "main", function(data) { /* ... */ });
}(program));

program.run("main");
