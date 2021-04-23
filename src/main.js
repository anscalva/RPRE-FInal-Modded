// Anthony Alvarez
// Rocket Patrol Modded 
// 4/23/2021
// 9 hours for base game tutorial finish
// 2 hours for Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// 6 hours for Implement a simultaneous two-player mode (30)

// Total worktime 17 hours
// Current Point Total: 50

// Planned additional mods 
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
//  Display the time remaining (in seconds) on the screen (10)
// Total planned point total 80

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyS, keyD;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;