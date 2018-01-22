window.onload = function(){
  var game = new PuzzleGame();

  game.startGame()
  window.requestAnimationFrame(function(){
       game.renderGame(game)
  })

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37: // izquierda
        game.thrower.move(game.board,-3);
        break;
      case 39: // derecha
        game.thrower.move(game.board,3);
        break;
      case 32:
        game.thrower.throw(game);
      break;
    }
  };

};
