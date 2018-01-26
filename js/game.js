var now = Date.now();
var delta = 0;
var initialHeight = 700;
var marginBottom = 40;
var roofTimer;
var currentLevelLength = levels[0].length;

var PuzzleGame = function() {
  this.board = new PuzzleBoard();
  this.thrower = new BallThrower(this.board);
  this.newBall = new Ball();
  this.topBalls = [];
  this.score = 0;
  this.ballPoints = 5;
  this.level = 0;
  this.levelColors = ballColors.slice(0);
};

PuzzleGame.prototype.startGame = function() {
  this.renderLevel(this);
  this.addBall(this);
  this.setRoofTimer(this);
  music.play();
};

PuzzleGame.prototype.gameOver = function() {
  clearInterval(window.roofTimer);
  showGameOver();
  failSound.play();
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
    game.board.ctx.save();
    game.board.ctx.beginPath();
    game.board.ctx.filter = 'blur(5px)';
    game.board.ctx.fillStyle = "rgba(255,255,255,.4";
    game.board.ctx.arc(game.topBalls[i].posX - 6, game.topBalls[i].posY - 5, 8, 0, 2 * Math.PI);
    game.board.ctx.fill();
    game.board.ctx.beginPath();
    game.board.ctx.strokeStyle = "rgba(255,255,255,.5";
    game.board.ctx.lineWidth = 4;
    game.board.ctx.arc(game.topBalls[i].posX, game.topBalls[i].posY, game.topBalls[i].radius, 0, 2 * Math.PI);
    game.board.ctx.stroke();
    game.board.ctx.restore();
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

PuzzleGame.prototype.checkGameOver = function(){
  var lowestBall = 0;
  this.topBalls.forEach(function(e){
    if (e.posY > lowestBall){
      lowestBall = e.posY;
    }
  })
  if (lowestBall > this.board.bottomBarrierPos - 30) {
    this.gameOver();
  }
}

PuzzleGame.prototype.addBall = function(game) {
  randomColor = game.levelColors[Math.floor(Math.random() * game.levelColors.length)];
  this.newBall = new Ball(this.board.width / 2, this.board.height - marginBottom, randomColor);
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
  this.topBalls = levels[currentLevel].slice();;
  this.newBall.posY = this.board.height - marginBottom;
}

PuzzleGame.prototype.nextLevel = function(){
  if(this.level == levels.length - 1){
    winSound.play();
    showWin();
    clearInterval(window.roofTimer);
    return;
  }
  levelSound.play();
  this.levelColors = ballColors.slice(0);
  this.level += 1;
  $("#next-level").html(this.level + 1)
  showNextLevel()
  hideNextLevel();
  currentLevelLength = levels[this.level].length;
  this.board.resetBoardSize(this);
  this.renderLevel();
  $("#level").html(this.level + 1)
}

PuzzleGame.prototype.setRoofTimer = function(game){
  roofTimer = setInterval(function(){
    game.board.updateBoardSize(game);
  }, 15000);
}

PuzzleGame.prototype.resetLevel = function(game){
  levels[this.level].splice(currentLevelLength ,levels[this.level].length);
  this.levelColors = ballColors.slice(0);
  this.setRoofTimer(game);
  this.board.resetBoardSize(this);
  this.renderLevel();
}
PuzzleGame.prototype.checkColorRemoval = function(game){
  var remainingColors = [];
  game.topBalls.forEach(function(e){
    if(!remainingColors.includes(e.color)){
      remainingColors.push(e.color);
    }
  })
  for(i = 0; i < game.levelColors.length; i++){
    if(!remainingColors.includes(game.levelColors[i])){
      game.levelColors.splice(i, 1);
    };
  };
}