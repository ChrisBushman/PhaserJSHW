var game = new Phaser.Game(800, 600, Phaser.CANVAS, "game");
game.state.add("gameRound", gameRound);
game.state.add("playerJoin",playerJoin);
game.state.add("GameOver",gameOver);
game.state.start("playerJoin");