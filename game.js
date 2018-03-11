var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var pad1, pad2, pad3, pad4;
var sqPlayer1, sqPlayer2, sqPlayer3, sqPlayer4;
var gameStart = false;
var instructionsText;
var directionsStyle = { font: "30px Arial", fill: "#ff0044", align: "center" };

function preload() {
  game.load.image('player', 'assets/Images/square.png');
  
  cursors = game.input.keyboard.createCursorKeys();
  game.input.gamepad.start();
  
  if (game.input.gamepad.pad1) {
    pad1 = game.input.gamepad.pad1;
  }
  
  if (game.input.gamepad.pad2) {
    pad2 = game.input.gamepad.pad2;
  }
  
  if (game.input.gamepad.pad3) {
    pad3 = game.input.gamepad.pad3;
  }
  
  if (game.input.gamepad.pad4) {
    pad4 = game.input.gamepad.pad4;
  }
  
}

function create() {
  instructionsText = game.add.text(game.world.centerX, game.world.centerY, "Press 'A' to Join.\nPress 'Enter' to Begin", directionsStyle);
  instructionsText.anchor.set(0.5);
}

function update() {
  
  if (gameStart === false) {
    initPlayers();
  }
  
  else {
    if (pad1 && pad1.connected && sqPlayer1) {
      movePlayer(pad1, sqPlayer1);
    }

    if (pad2 && pad2.connected && sqPlayer2) {
      movePlayer(pad2, sqPlayer2);
    }

    if (pad3 && pad3.connected && sqPlayer3) {
      movePlayer(pad3, sqPlayer3);
    }

    if (pad4 && pad4.connected && sqPlayer4) {
      movePlayer(pad4, sqPlayer4);
    }

    keyboardMovement();
  }
}

function movePlayer(gamepad, player) {
  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT))  {
    player.position.x = player.position.x - 5;
  }
  
  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT))  {
    player.position.x = player.position.x + 5;
  }
  
  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP))  {
    player.position.y = player.position.y - 5;
  }
  
  if (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN))  {
    player.position.y = player.position.y + 5;
  }

  if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) &&
     (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 ||
     gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1))
  {
      player.position.x += (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) * 5;
  }

  if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) &&
     (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 ||
     gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1))
  {
      player.position.y += (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y)) * 5;
  }
}

function keyboardMovement() {
  if (cursors.left.isDown)  {
    if (sqPlayer1) {
      sqPlayer1.position.x = sqPlayer1.position.x - 5;
    }
    
    if (sqPlayer2) {
      sqPlayer2.position.x = sqPlayer2.position.x - 5;
    }
    
    if (sqPlayer3) {
      sqPlayer3.position.x = sqPlayer3.position.x - 5;
    }
    
    if (sqPlayer4) {
      sqPlayer4.position.x = sqPlayer4.position.x - 5;
    }
  }
  
  if (cursors.right.isDown)  {
    if (sqPlayer1) {
      sqPlayer1.position.x = sqPlayer1.position.x + 5;
    }
    
    if (sqPlayer2) {
      sqPlayer2.position.x = sqPlayer2.position.x + 5;
    }
    
    if (sqPlayer3) {
      sqPlayer3.position.x = sqPlayer3.position.x + 5;
    }
    
    if (sqPlayer4) {
      sqPlayer4.position.x = sqPlayer4.position.x + 5;
    }
  }
  
  if (cursors.up.isDown)  {
    if (sqPlayer1) {
      sqPlayer1.position.y = sqPlayer1.position.y - 5;
    }
    
    if (sqPlayer2) {
      sqPlayer2.position.y = sqPlayer2.position.y - 5;
    }
    
    if (sqPlayer3) {
      sqPlayer3.position.y = sqPlayer3.position.y - 5;
    }
    
    if (sqPlayer4) {
      sqPlayer4.position.y = sqPlayer4.position.y - 5;
    }
  }
  
  if (cursors.down.isDown)  {
    if (sqPlayer1) {
      sqPlayer1.position.y = sqPlayer1.position.y + 5;
    }
    
    if (sqPlayer2) {
      sqPlayer2.position.y = sqPlayer2.position.y + 5;
    }
    
    if (sqPlayer3) {
      sqPlayer3.position.y = sqPlayer3.position.y + 5;
    }
    
    if (sqPlayer4) {
      sqPlayer4.position.y = sqPlayer4.position.y + 5;
    }
  }
}

function initPlayers() {
  if (sqPlayer1 === undefined && ((pad1.connected && 
     pad1.justPressed(Phaser.Gamepad.XBOX360_A)) ||
     game.input.keyboard.isDown(Phaser.KeyCode.A))) {
    sqPlayer1 = game.add.sprite(100, 100, 'player');
  }
  
  if (pad2.connected && sqPlayer2 === undefined &&
     pad2.justPressed(Phaser.Gamepad.XBOX360_A)) {
    sqPlayer2 = game.add.sprite(500, 100, 'player');
    sqPlayer2.tint =  0x777777;
  }
  
  if (pad3.connected && sqPlayer3 === undefined && 
     pad3.justPressed(Phaser.Gamepad.XBOX360_A)) {
    sqPlayer3 = game.add.sprite(100, 500, 'player');
    sqPlayer3.tint =  0xAAAAAA;
  }
  
  if (pad4.connected && sqPlayer4 === undefined && 
     pad4.justPressed(Phaser.Gamepad.XBOX360_A)) {
    sqPlayer4 = game.add.sprite(500, 500, 'player');
    sqPlayer4.tint =  0xDDDDDD;
  }
  
  if (game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
    gameStart = true;
    instructionsText.destroy();
  }
}