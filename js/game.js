var now = Date.now();
var delta = 0;

var PuzzleGame = function(){
  this.board = new PuzzleBoard();
  this.thrower = new BallThrower(this.board);
}

PuzzleGame.prototype.startGame = function(){
 
}

PuzzleGame.prototype.gameOver = function(){
  
}

PuzzleGame.prototype.renderGame = function(game){
  game.board.ctx.clearRect(0, 0, game.board.width, game.board.height);
  game.board.renderBoard();
  game.thrower.renderThrower(game.board);
}