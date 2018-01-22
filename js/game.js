var now = Date.now();
var delta = 0;
var marginBottom = 40;

var PuzzleGame = function(){
  this.board = new PuzzleBoard();
  this.thrower = new BallThrower(this.board);
  this.newBall = new Ball();
  this.score = 0;
  this.topBalls = []
}

PuzzleGame.prototype.startGame = function(){
  this.newBall.addBall(this);
}

PuzzleGame.prototype.gameOver = function(){
  this.renderGame
}

PuzzleGame.prototype.renderTopBalls = function(game){
  for (i = 0; i < game.topBalls.length; i++){ 
    game.board.ctx.beginPath();
    game.board.ctx.fillStyle = game.topBalls[i].color;
    game.board.ctx.arc(game.topBalls[i].posX, game.topBalls[i].posY, game.topBalls[i].radius, 0, 2 * Math.PI);
    game.board.ctx.fill();
  }
}

PuzzleGame.prototype.renderGame = function(game){
  then = now;
  now = Date.now();
  delta = now - then;
  game.board.ctx.clearRect(0, 0, game.board.width, game.board.height);
  game.board.renderBoard();
  game.thrower.renderThrower(game.board);
  game.renderTopBalls(this);
  game.newBall.renderBall(game,delta);
  window.requestAnimationFrame(function(){
    game.renderGame(game)
  })
}