window.onload = function(){
  var game = new PuzzleGame();
  //game.startGame();
  setInterval(function(){game.renderGame(game)},40);
};
