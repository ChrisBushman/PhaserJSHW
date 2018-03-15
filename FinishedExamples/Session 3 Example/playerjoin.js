var playerJoin = function(game) {
	console.log("Player join screen");
};
// Handles for Player objects
var players = [];
var gamePads = [];
var connectedPads = [];

// Handles for GamePad objects
var gamepad1, gamepad2, gamepad3, gamepad4;

// Handle for Instructional text
var instructionsText;
// Styling for Instructional text
var directionsStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };
  
playerJoin.prototype = {
  
	preload: function() {
    game.load.image('player', 'assets/Images/square.png');

    cursors = game.input.keyboard.createCursorKeys();
    // Starts the gamepad manager
    game.input.gamepad.start();

    // Assign gamepads to handles
		
    if (game.input.gamepad.pad1) {
			gamePads.push(game.input.gamepad.pad1);
    }

    if (game.input.gamepad.pad2) {
			gamePads.push(game.input.gamepad.pad2);
    }

    if (game.input.gamepad.pad3) {
			gamePads.push(game.input.gamepad.pad3);
    }

    if (game.input.gamepad.pad4) {
			gamePads.push(game.input.gamepad.pad4);
    }
	},
  
	create: function() {
		// Create instructional text and render to the screen
		instructionsText = game.add.text(game.world.centerX, game.world.centerY, "Press 'A' to Join.\nPress 'Enter' to Begin.", directionsStyle);
		instructionsText.anchor.set(0.5);
	},
  
    update: function() {
			
			gamePads.forEach(function(gamePad) {
				if (gamePad.justPressed(Phaser.Gamepad.XBOX360_A)) {
					players.push({
						// Must figure out best way to iterate starting positions
						x: 100,
						y: 100,
						pad: gamePad,
						// Also need to figure out how to iterate tint
						sprite: 'player'
					});
				}
			});
			
      // Check 'Enter' key on keyboard to "start game"
      if (game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
        game.state.start("gameRound");
      }
    }
}
