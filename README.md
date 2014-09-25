Terminal menu programs, using retro ansi terminal menus for serious 80s technicolor business.
---

Who likes install scripts with runtime flags? Really? Guess who doesn't: everyone else (rounded up).

This is a simple bit of polish on top of the [terminal-menu](https://www.npmjs.org/package/terminal-menu) package that gives you a structured terminal program with navigable menus, and togglable checkbox options. Things can happen when you enter or exit menus, things can happen when you toggle a checkbox option, and things can happen when you save or cancel an entire menu of checkbox options.

Have a look at the `test.js` file to see how it all works, but it's pretty much "create a program", "create named menus", "add options for transitioning to other menus, possibly with callbacks" and "create checkbox options, possibly with callbacks on toggles". That's it.

Because part of the beauty of a retro ansi terminal menu program for serious 80s technicolor business is that you don't need a lot to do a lot.

super basic minimal example
---

```
// preamble
var builder = require("terminal-menu-program"),
    program = new builder.Program("Test program"),

// single screen definition
menu = program.addMenu("main");
menu.addText("A Terminal Menu Program");
menu.addSpacer();
menu.addOption("menu switch (going to this screen when selected)", "main");
menu.addSpacer();
menu.addCheckedOption("a toggle option", function(state) { /* ... */ });
menu.addSpacer();
menu.setCancel("exit");

// run single screen program
program.run("main");
```

What's the license?
---

Public Domain; in jurisdictions that do not recognise the public domain, MIT.
