var gameOver = function(game) {
  
};

var gameOverTxt;
gameOver.prototype = {
  create: function() {
    gameOverTxt = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER!\nPress 'Enter' to Begin again.", directionsStyle);
  },
  
  update: function() {
    if (game.input.keyboard.isDown(Phaser.KeyCode.ENTER)) {
      game.state.start("gameRound");
    }
  }
};