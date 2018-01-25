var PuzzleBoard = function() {
  this.width = document.getElementById("canvas").getAttribute("width");
  this.height = document.getElementById("canvas").getAttribute("height");
  this.ctx = document.getElementById("canvas").getContext("2d");
  this.bottomBarrierPos = this.height - 100;
};

PuzzleBoard.prototype.renderBoard = function() {
  this.ctx.save();
  this.ctx.fillStyle = "#f2f4f4";
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = "#103da2";
  this.ctx.fillRect(0, this.bottomBarrierPos, this.width, 5);
  this.ctx.restore();
};

PuzzleBoard.prototype.updateBoardSize = function(game){
  roofSound.play();
  game.board.height -= 60;
  document.getElementById("canvas").setAttribute("height",game.board.height);
  game.board.bottomBarrierPos = game.board.height - 100;
  game.newBall.posY = game.newBall.posY - 60;
  game.thrower.posY = this.height - marginBottom;
  game.checkGameOver()
}

PuzzleBoard.prototype.resetBoardSize = function(game){
  this.height = initialHeight;
  this.bottomBarrierPos = this.height - 100;
  document.getElementById("canvas").setAttribute("height",this.height);
  game.newBall.posY = game.newBall.posY - 60;
  game.thrower.posY = this.height - marginBottom;
}

