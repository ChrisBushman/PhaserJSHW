var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// . Game Objects
var rockets;
var rocket;
var player;
var launcher;
var cursors;

// . Other variables
var nextFire = 0; // . This controls when the next rocket is fired!
var fireRate = 1000;
var willFire = false;


function preload() {
  // . Load our sprites/sprite sheets
  game.load.spritesheet('ship', 'assets/Images/sht_ship2.png', 48, 48);
  game.load.spritesheet('rocket', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAoCAYAAABuIqMUAAABs0lEQVRYR+2XsU7DQAyG7xjLEGY2noAilMy9lQExMCFWhHgAdl6j4iWYujasyQCMRDwEGcJIkC05pJeC4ktEbIksSSsn/uzz+fxbw7yyLKvjODZ5npskSSzz9VHNg5xLCSAIHtI3Pz6v4V5/fpiXp1Xwd4YsRbDTw6OT2u7M0PdUAQTDt7M/VQCD4Kn2aen/ehN34Ou1Wfh1aJ1Jt9WmDw821tpBCeHsgcZRB3pvsW4+9J66fDfD39AeARqer67vOL562d4vu9+sqso45zpJwT8a8Dbw/JvdPDtTzJbovCxLE0URPo8Nvw2cIga/cF1c3uL9rXi0dgO8DezliV4GcHoeE/43cEI5PbtB37ASWKKq4VWXDS2J2g3bLm+VrbJXH/OMxB1SnCBoOFM3HqgezNSOxGrFiBRwPGE5GxRsVcNLCoCdeVoptRsWAlDdKiEAtYdUu/aplCbXsJzuI0bD/jgaQz91JiXdKk7DbggSisIT4MX+K4paURq2A07QngAvDx4wLFEaVj286rLpIwNFb1hOiyRbca2SE8S/huVky7MNnipVD2ZqR2IpaopdNlLAofy/AGncoFg/t4P6AAAAAElFTkSuQmCC', 47, 20);
  game.load.image('launcher', 'assets/Images/square.png');
  
  // . Load our keyboard input

  cursors = game.input.keyboard.createCursorKeys();
}

function create() {
  // . Start the Arcade physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // . Add a game group for rockets, set their physics
  rockets = game.add.group();
  rockets.enableBody = true;
  rockets.physicsBodyType = Phaser.Physics.ARCADE;
  
  // . Add 50 rockets to our rockets queue; check the world bounds, kill any rockets that go out of bounds
  rockets.createMultiple(50, 'rocket');
  rockets.setAll('checkWorldBounds', true);
  rockets.setAll('outOfBoundsKill', true);
  
  // . Call animation.add() on each of the items in our rockets group
  rockets.callAll('animations.add', 'animations', 'moving', [0,1], 15, true);
  rockets.callAll('anchor.setTo', 'anchor', 0.5,0.5);
  willFire = true;

  
  // . Create the player object (ship); add it to the game
  player = game.add.sprite(725, 550, 'ship', [0]);
  
  // . Set the player's properties for animation, physics, and others
  player.animations.add('moving', [1,2], 10, true);
  player.animations.add('idle', [0], 0, false);
  player.anchor.setTo(0.5, 0.5);
  player.tint = Math.random() * 0xffffff;
  
  // . Enable Arcade physics for the player object
  game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
  
  //player.body.onCollide = new Phaser.Signal();
  //player.body.onCollide.add(gameOver, this);
  
  // . Create the missile launcher object, set its properties
  launcher = game.add.image(400,300, 'launcher');
  
  launcher.anchor.setTo(0.5,0.5);

}

function update() {
  game.physics.arcade.collide(player, rockets, gameOver, null, this);
  
  if (cursors.left.isDown)
  {
      // . Move to the left
      player.position.x = player.position.x - 5;
      
      // . Set animation to 'moving; rotate sprite to the left

      player.animations.play('moving');
      player.angle = 180;
    
    
  }
  else if (cursors.right.isDown)
  {
      // . Move to the right
       player.position.x = player.position.x + 5;
    
      // . Set animation to 'moving; rotate sprite to the right
      player.animations.play('moving');
      player.angle = 0;
  }
  
  else if (cursors.up.isDown)
  {
      // . Move to the left
      player.position.y = player.position.y - 5;
    
      // . Set animation to 'moving; rotate sprite to the right
      player.animations.play('moving');
      player.angle = 270;
  }
  else if (cursors.down.isDown)
  {
      // . Move to the right
       player.position.y = player.position.y + 5;
    
      // . Set animation to 'moving; rotate sprite to the right
      player.animations.play('moving');
      player.angle = 90;
      
  }
  else
  {
      // . Player is idle; Play the idle animation
      player.animations.play('idle');
  }
  
  fire();
  
  
}

function fire(){
    // . Check if the next rocket is ready to fire
    // . ..and if at least 1 rocket is dead (recycling the rockets we fire)
    if (game.time.now > nextFire && rockets.countDead() > 0 && willFire === true)
    {
      // . Set the next fire time for the next rocket to be fired
      nextFire = game.time.now + fireRate;
      // . To save resources, we will recycle the first dead rocket that was fired
      rocket = rockets.getFirstDead();
      
      // . Reset the rocket at the launcher's position
      rocket.reset(launcher.x, launcher.y);
      
      // . Simultaneous launch rockets to the target while rotating them to the proper direction
      // . NOTE: moveToObject() returns a number in radians, which is used to calculate the angle that the rocket was fired
      rocket.rotation = game.physics.arcade.moveToObject(rocket, player, 300);
      
      // . Start the animation of the rocket
      rocket.animations.play('moving');

    }
  }

function gameOver(obj1, obj2){
  // . Do the necessary stuff to end the game
  
  //stop firing rockets 
  willFire = false;
  player.kill();
  game.stage.backgroundColor = '#992d2d';
  
}