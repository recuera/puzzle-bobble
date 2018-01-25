var BallThrower = function(board) {
  this.angle = 180;
  this.width = 16;
  this.height = 100;
  this.posX = board.width / 2 ;
  this.posY = board.height - marginBottom ;
  this.moving = [false,false]
};

BallThrower.prototype.renderThrower = function(board) {
  board.ctx.fillStyle = "#324142";
  board.ctx.save();
  board.ctx.translate(this.posX, this.posY);
  board.ctx.rotate(Math.PI / 180 * this.angle);
  board.ctx.fillRect( - this.width / 2, 0, this.width, this.height);
  board.ctx.restore();
  board.ctx.beginPath();
  board.ctx.arc(board.width / 2, board.height - marginBottom, 40, 0, 2 * Math.PI);
  board.ctx.fill();
};

BallThrower.prototype.rotateThrower = function(board, direction) {
  if (this.angle > 105 && this.angle < 250) {
    this.angle += direction;
  } else if (this.angle <= 105) {
    this.angle = 106;
  } else {
    this.angle = 249;
  }
};

BallThrower.prototype.throw = function(game){
  game.newBall.speed = -800;
  game.newBall.angle = game.thrower.angle;
  throwSound.play();
}