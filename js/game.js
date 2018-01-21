var now = Date.now();
var delta = 0;
var ballsToThrow = [];
var marginBottom = 30;

var PuzzleGame = function(){
  this.board = new PuzzleBoard();
  this.thrower = new BallThrower(this.board);
  this.newBall = new Ball();
  this.score = 0;
}

PuzzleGame.prototype.startGame = function(){

}

PuzzleGame.prototype.gameOver = function(){
  
}

PuzzleGame.prototype.renderGame = function(game){
  game.board.ctx.clearRect(0, 0, game.board.width, game.board.height);
  game.board.renderBoard();
  game.thrower.renderThrower(game.board);
  if(ballsToThrow.length == 0){
    game.newBall.addBall(game);
  }
  game.newBall.renderBall(game);
}