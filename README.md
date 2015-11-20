Project
==========

Javascript classes and HTML5 game UI. This repository contains the base project structure.

Prerequisites
-------------

Required skills and knowledge for this project:

* javascript
* nodejs and npm
* git
* html5, dom based animation
* css & transitions

Structure
-----------------

Nodejs style project hierarchy, especially
* ```node_modules/gamejs``` for the game code
* ```node_modules/gameui``` for UI code and assets

To start a debug server launch
* ```node server.js```

which will inject [bundle.js](bundle.js) and serve assets from each module's ```res/``` folder. See [bundle.js](bundle.js) for an example to launch game and ui.

The debug server listens on
* http://localhost:8001

CSS
---

All css styles must be inlined and set through javascript.

Assets
------

Assets must be placed in the ```res/``` folder of a module. For example ```node_modules/gameui/res/images/test.png```

To reference, please use relative ```res/gameui/image.png```, instead of absolute ```/res/``` paths.

Logging
-------

Please use [loglevel](https://github.com/pimterry/loglevel) for logging instead of console, which can be turned off for production release.

Code style
-----

Somewhat similar to guide [airbnb/javascript](https://github.com/airbnb/javascript)

Most importantly:

- Maximum line length 80
- Single quotes


node_modules/gamejs
------------

This module contains the Game classes. Those must only run the game logic and do not touch the UI.

The main ```Game``` class can be a [EventEmitter3](https://github.com/primus/eventemitter3) style interface, which will be used by the UI handlers to listen for changes. Emitted events must include:

* move (playerId, ...): Player made a move.
* player (playerId, lastPlayerId): Current player changed
* score (playerId, score): Player's score changed.
* end (playerIdsWin[], playerIdsLose[]): Game ended.

No timeouts or intervals must be used, this should be UI only business.

See template game class ```node_modules/gamejs/lib/Game.js```.

Please write unit tests which go into ```node_modules/gamejs/test``` and the preferred runner is ```mocha```.


node_modules/gameui
-------------------

See example [Ui.js](node_modules/gameui/lib/UI.js) which will attach itself to a given element and game. This file should be the main entry point for the ui.

Save assets to ```node_modules/gameui/res```, which are served like ```<img src="res/image.png">``` when using the debugging server.

Aswell:

* Responsive layout, based on parent element dimensions (not window).
* Use simple placeholder images and sound files which will later be replaced by me.
* Support mouse and touch events.
* For animations, use programmatically set css transitions where possible (vendor prefix support).
* All DOM changes queued ```window.requestAnimationFrame().```

UI Wireframe
------------

Details will be provided as soon as game code completed.


Project timeline
----------------

Please complete the project's tasks in the following chronological order:

1. research game rules, discuss specifics and unresolved questions
2. game classes (node_modules/gamejs)
3. communication for code review/changes
4. game ui (node_modules/gameui)
5. communication for ui review/changes
6. complete :)


Test assignment
---------------

To verify you skills, please complete this small test assignment.

1. as an example see ```node_modules/gameui/lib/ButtonMove.js```, which attaches a listener for 'click' and runs ```game.makeMove(pid, moveId)```
2. change ```node_modules/gameui/lib/MoveHandler.js```, which listens on ```game.on('move', ..)```, so that it creates and appends a div to the ui which shows the playerId and moveId (of whom made the move)
3. implement ```node_modules/gamejs/lib/Game._setNextPlayer()``` to set the next player in order
4. create a new unit test verifying the correct behavious of ```_setNextPlayer```
5. create ```node_modules/gameui/lib/PlayerHandler.js```, which listens for the player event and shows the current player's name in a div
6. after ```game.makeMove``` call ```_setNextPlayer()```
7. run ```node server.js```, clicking the ```Move``` button should now change the current player and append a div with the move information
