Terminal menu programs, using retro ansi terminal menus for serious 80s technicolor business... programs.
---

Who likes install scripts with runtime flags? Really? Guess who doesn't: everyone else (rounded up).

This is a simple bit of polish on top of the [terminal-menu](https://www.npmjs.org/package/terminal-menu) package that gives you a structured terminal program with navigable menus, and togglable checkbox options. Things can happen when you enter or exit menus, things can happen when you toggle a checkbox option, and things can happen when you save or cancel an entire menu of checkbox options.

Have a look at the `test.js` file to see how it all works, but it's pretty much "create a program", "create named menus", "add options for transitioning to other menus, possibly with callbacks" and "create checkbox options, possibly with callbacks on toggles". That's it.

Well, okay, and you can give menus an `onLoad` and `onUnload`, which will trigger when a screen is swapped in and out.

Because part of the beauty of a retro ansi terminal menu program for serious 80s technicolor business is that you don't need a lot to do a lot.

Screenshots?
---
Sure, why not. Bask in the glory of classic terminal menus:

![image](https://cloud.githubusercontent.com/assets/177243/4414059/0e4e9a00-4510-11e4-924e-59db1c523557.png)

![image](https://cloud.githubusercontent.com/assets/177243/4414078/6337fade-4510-11e4-811d-a6555dccacd8.png)

super basic minimal example
---

```
// preamble
var builder = require("terminal-menu-program"),
    program = new builder.Program("Test program"),

// single screen definition
menu = program.menu("main");
menu.text("A Terminal Menu Program");
menu.spacer();
menu.option("menu switch (going to this screen when selected)", "main");
menu.spacer();
menu.check("a toggle option", function(state) { /* ... */ });
menu.check("a checked toggle option", true);
menu.check("a checked toggle callback", true, function(state) { /* ... */ });
menu.spacer();
menu.cancel("exit", function() { program.halt(); process.exit(0); });

// run single screen program
program.run("main");
```

What's the license?
---

Public Domain; in jurisdictions that do not recognise the public domain, MIT.
