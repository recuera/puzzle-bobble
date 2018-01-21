var BallThrower = function(board) {
  this.angle = 180;
  this.width = 16;
  this.height = 100;
  this.posX = board.width / 2 ;
  this.posY = board.height - this.height;
};

BallThrower.prototype.renderThrower = function(board) {
  board.ctx.save();
  board.ctx.fillStyle = "#688";
  board.ctx.translate(this.posX, board.height);
  board.ctx.rotate(Math.PI / 180 * this.angle);
  board.ctx.fillRect(-this.width / 2, 0, this.width, this.height);
  board.ctx.beginPath();
  board.ctx.arc(0, 30, 30, 0, 2 * Math.PI);
  board.ctx.fill();
  board.ctx.restore();
};

BallThrower.prototype.move = function(board, direction) {
  if (this.angle > 105 && this.angle < 250) {
    this.angle += direction;
  } else if (this.angle <= 105) {
    this.angle = 106;
  } else {
    this.angle = 249;
  }
};

BallThrower.prototype.throw = function(){

}