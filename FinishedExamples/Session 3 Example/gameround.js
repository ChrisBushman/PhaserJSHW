var gameRound = function(game) {}


gameRound.prototype = {
  create: function() {
    players.forEach( function(player) {

      player.obj = game.add.sprite(player.x, player.y, player.sprite);
      
      if (player.tint) {
        player.obj.tint = player.tint;
      }
    });
  },
  
  update: function() {
    
    players.forEach( function(player) {
      movePlayer(player.pad, player.obj);
      
      if (player.obj.x > 600) {
        game.state.start("GameOver");
      }
    });
  }
}

// generic function to check for input
function movePlayer(gamepad, player) {
  // Check for D-Pad input
  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ) {
    player.position.x = player.position.x - 5;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
    player.position.x = player.position.x + 5;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)) {
    player.position.y = player.position.y - 5;
  }

  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)) {
    player.position.y = player.position.y + 5;
  }

  // Check for Analog Stick input
  if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) && 
     (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 ||
     gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) {
    player.position.x = player.position.x + (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) * 5;
  }

  if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) && 
     (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 ||
     gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)) {
    player.position.y = player.position.y + (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)) * 5;
  }
}