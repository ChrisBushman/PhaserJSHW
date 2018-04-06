var playerJoin = function(game) {

};

var instructionsText;
var gamePads = [];
  
playerJoin.prototype = {
  
	preload: function() {

    // Starts the gamepad manager
    game.input.gamepad.start();

    // Assign gamepads to handles
    if (game.input.gamepad.pad1) {
			gamePads.push({
				padID: game.input.gamepad.pad1,
				assigned: false
			});
    }

    if (game.input.gamepad.pad2) {
			gamePads.push({
				padID: game.input.gamepad.pad2,
				assigned: false
			});
    }

    if (game.input.gamepad.pad3) {
			gamePads.push({
				padID: game.input.gamepad.pad3,
				assigned: false
			});
    }

    if (game.input.gamepad.pad4) {
			gamePads.push({
				padID: game.input.gamepad.pad4,
				assigned: false
			});
    }
	},
  
	create: function() {
		// Create instructional text and render to the screen
		instructionsText = game.add.text(game.world.centerX, game.world.centerY, "Press 'A' to Join.\nPress 'Enter' to Begin.", instructionsStyle);
		instructionsText.anchor.set(0.5);
	},
  
    update: function() {
			
			gamePads.forEach(function(gamePad) {
				if (gamePad.assigned === false &&
						gamePad.padID.justPressed(Phaser.Gamepad.XBOX360_A)) {
					console.log("Button was pressed!");
					players.push({
						// Must figure out best way to iterate starting positions
						pad: gamePad.padID,
						obj: undefined,
						// Adding 1 to array length to account for player not being added to array yet.
						id: players.length + 1
					});
					
					gamePad.assigned = true;
					game.add.text(Math.random() * 800, Math.random() * 600, "Player " + players.length + " has joined.", instructionsStyle);
				}
			});
			
      // Check 'Enter' key on keyboard to "start game"
      if (game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
        game.state.start("gameRound");
      }
    }
}
