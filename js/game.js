var now = Date.now();
var delta = 0;
var marginBottom = 40;

var PuzzleGame = function() {
  this.board = new PuzzleBoard();
  this.thrower = new BallThrower(this.board);
  this.newBall = new Ball();
  this.score = 0;
  this.topBalls = [];
};

PuzzleGame.prototype.startGame = function() {
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
