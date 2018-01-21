window.onload = function(){
  var game = new PuzzleGame();
  //game.startGame();
  setInterval(function(){
    game.renderGame(game)
  },1000 / fps);
  game.startGame()

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37: // izquierda
        game.thrower.move(game.board,-4);
        break;
      case 39: // derecha
        game.thrower.move(game.board,5);
        break;
      case 32:
        game.thrower.throw(game);
      break;
    }
  };

};
