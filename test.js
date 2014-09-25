var tmp = require("./index"),
    program = new tmp.Program("Test program");

var mainMenu = (function(program) {
  var menu = program.addMenu("main");
  menu.addText("Terminal menu programs, using retro ansi terminal menus for serious 80s technicolor business");
  menu.addText("--------------------------------------------------------------------------------------------");
  menu.addSpacer();
  menu.addText("Welcome to the test app. It's four screens (this one, and the three option screens).");
  menu.addSpacer();
  menu.addOption("option 1", "main1");
  menu.addOption("option 2", "main2");
  menu.addOption("option 3", "main3");
  menu.addSpacer();
  menu.addText("The next two options are 'live' options, in that toggling them will trigger a callback for");
  menu.addText("them, with their current state as boolean argument.");
  menu.addSpacer();
  menu.addCheckedOption("toggle 1", function(state) { /* ... */ });
  menu.addCheckedOption("toggle 2", function(state) { /* ... */ });
  menu.addSpacer();
  menu.setCancel("exit", function() {
    program.halt();
    process.exit(0);
  });
  return menu;
}(program));

var subMenu1 = (function(program) {
  var menu = program.addMenu("main1");
  menu.addText("Sub menu 1");
  menu.addSpacer();
  menu.addText("There isn't much here other than a back option");
  menu.addSpacer();
  menu.setCancel("back", "main");
  return menu;
}(program));

var subMenu2 = (function(program) {
  var menu = program.addMenu("main2");
  menu.addText("Sub menu 2");
  menu.addSpacer();
  menu.addText("There isn't much here, either other than a back option.");
  menu.addText("Going back will drop your 'cursor' on this menu's option, though!");
  menu.addSpacer();
  menu.setCancel("back", "main");
  return menu;
}(program));

var toggleMenu =(function(program){
  var menu = program.addMenu("main3");
  menu.addText("Toggle menu");
  menu.addSpacer();
  menu.addText("This is an integral options page, where you can set any combination of states,");
  menu.addText("and saving will do a callback with all states in an options object. Cancel restores");
  menu.addText("the state when you entered the menu.");
  menu.addSpacer();
  menu.addCheckedOption("toggle 1");
  menu.addCheckedOption("toggle 2");
  menu.addCheckedOption("toggle 3");
  menu.addCheckedOption("toggle 4");
  menu.addCheckedOption("toggle 5");
  menu.addSpacer();
  menu.setConfirm("save", "main", function(data) { /* ... */ });
  menu.setCancel("cancel", "main", function(data) { /* ... */ });
}(program));

program.run("main");
