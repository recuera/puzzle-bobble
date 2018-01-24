var now = Date.now();
var delta = 0;
var marginBottom = 40;

var PuzzleGame = function() {
  this.board = new PuzzleBoard();
  this.thrower = new BallThrower(this.board);
  this.newBall = new Ball();
  this.topBalls = [];
  this.score = 0;
  this.ballPoints = 5;
  this.level = 0;
};

PuzzleGame.prototype.startGame = function() {
  this.renderLevel();
  this.addBall(this);
};

PuzzleGame.prototype.gameOver = function() {
  window.alert("GAME OVER :(");
};

PuzzleGame.prototype.move_thrower = function() {
  if (this.thrower.moving[0] == true) {
    this.thrower.rotateThrower(this.board, -1.3);
  } else if (this.thrower.moving[1] == true) {
    this.thrower.rotateThrower(this.board, 1.3);
  }
};

PuzzleGame.prototype.renderTopBalls = function(game) {
  for (i = 0; i < game.topBalls.length; i++) {
    game.board.ctx.beginPath();
    game.board.ctx.fillStyle = game.topBalls[i].color;
    game.board.ctx.arc(game.topBalls[i].posX,game.topBalls[i].posY,game.topBalls[i].radius,0,2 * Math.PI);
    game.board.ctx.fill();
  }
};

PuzzleGame.prototype.renderGame = function(game) {
  then = now;
  now = Date.now();
  delta = now - then;
  game.board.ctx.clearRect(0, 0, game.board.width, game.board.height);
  game.board.renderBoard();
  this.move_thrower();
  game.thrower.renderThrower(game.board);
  game.renderTopBalls(this);
  game.newBall.renderBall(game, delta);
  window.requestAnimationFrame(function() {
    game.renderGame(game);
  });
};

PuzzleGame.prototype.addBall = function(game) {
  randomColor = ballColors[Math.floor(Math.random() * ballColors.length)];
  game.newBall = new Ball(game.board.width / 2, game.board.height - marginBottom, randomColor);
};

PuzzleGame.prototype.addPoints = function(points){
  this.score += points;
  this.updateScore();
}

PuzzleGame.prototype.updateScore = function(){
  document.getElementById("score").innerHTML = this.score;
}

PuzzleGame.prototype.updateLevel = function(){
  document.getElementById("level").innerHTML = (this.level + 1);
}
PuzzleGame.prototype.renderLevel = function(){
  var currentLevel = this.level;
  this.topBalls = levels[currentLevel];
}