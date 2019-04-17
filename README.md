## luckyRat 

### Background

luckyRat is a game where a player can move a character ('luckyRat') side-to-side in order to avoid projectiles (pigeon droppings) that are released by opponents (pigeons) overhead. 

Each level, luckyRat starts with an four-slice pizza pie. Everytime luckyRat is hit by a dropping it loses a slice. The player loses the game if luckyRat runs out of slices before the end of the level. 

The game has 13 levels, with each level lasting 30 seconds. Pizza slices remaining at the end of each level are added to the total score. 

### Functionality & MVPs

In luckyRat, users will be able to:

- [ ] Start, pause, and reset the game board
- [ ] Move luckyRat side-to-side

Pigeons will be able to:

- [ ] Make a dropping
- [ ] Have a velocity
- [ ] Have a sinusoidal trajectory

Droppings will be able to:

- [ ] Have an angle
- [ ] Have an acceleration
- [ ] Trigger luckyRat's collision detection 

Pizza pie will be able to:

- [ ] Lose a slice in response to dropping collision
- [ ] Have its slices added to the total score after each level
- [ ] Trigger the end of the game if at zero slices with time remaining in the current level.

In addition, this project will include:

- [ ] A production README

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript` for overall structure and game logic,
- `HTML Canvas` for DOM manipulation and rendering,
- `Webpack` to bundle js files.

In addition to the webpack entry file, there will be four scripts involved in this project:

`index.js`: this script will handle the logic for creating and updating the necessary DOM elements.

`rat.js`: this script will house the physics logic for luckyRat.

`pigeon.js`: this script will house the physics logic for pigeons.

`dropping.js`: this script will house the physics logic for the droppings.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 4 scripts outlined above. Learn the basics of `HTML Canvas`.  Goals for the day:

- Learn enough `HTML Canvas` to render an object.

**Day 2**: Dedicate this day to learning more about `HTML Canvas`.  First, build out the `luckyRat` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the luckyRat.  Build in the ability to move the object side-to-side.  Goals for the day:

- Render a luckyRat
- Make the luckyRat moveable side-to-side

**Day 3**: Create the game logic backend.  Build out physics for each object.  Incorporate the physics into the `Board.js` rendering.  Goals for the day:

- Export a `Pigeon` and `Dropping` object with correct type and handling logic

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for stop, start, and reset
- Have nice looking controls and title

### Bonus features

There are many directions in which this project could evolve.

- [ ] Pigeons have multiple droppings, velocities, and trajectories
- [ ] Droppings have multiple angles and accelerations