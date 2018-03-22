var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('square', 'assets/Images/square.png');
  game.load.spritesheet('ship', 'assets/Images/sht_ship2.png', 48, 48);
  cursors = game.input.keyboard.createCursorKeys();
}

function create() {
  player = game.add.image(370, 270, 'ship');
  player.animations.add('moving', [1,2], 15, true);
  player.animations.add('idle', [0], 0, false);
  player.anchor.setTo(0.5, 0.5);
  player.tint = Math.random() * 0xffffff;
}

function update() {
  if (cursors.left.isDown)
  {
      //  Move to the left
      player.position.x = player.position.x - 5;
      
      //  Set animation to 'moving; rotate sprite to the left
      player.animations.play('moving');
      player.angle = 180;
    
    
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
       player.position.x = player.position.x + 5;
    
      //  Set animation to 'moving; rotate sprite to the right
      player.animations.play('moving');
      player.angle = 0;
  }
  
  else if (cursors.up.isDown)
  {
      //  Move to the left
      player.position.y = player.position.y - 5;
    
      //  Set animation to 'moving; rotate sprite to the right
      player.animations.play('moving');
      player.angle = 270;
  }
  else if (cursors.down.isDown)
  {
      //  Move to the right
       player.position.y = player.position.y + 5;
    
      //  Set animation to 'moving; rotate sprite to the right
      player.animations.play('moving');
      player.angle = 90;
  }
  else
  {
      // Player is idle; Play the idle animation
      player.animations.play('idle');
  }
}