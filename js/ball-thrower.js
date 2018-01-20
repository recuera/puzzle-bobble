var BallThrower = function(board){
  this.angle = 1;
  this.width = 20;
  this.height = 80;
  this.posX =  board.width/2 - this.width / 2;
  this.posY =  board.height - this.height;
}

BallThrower.prototype.renderThrower = function(board){
  board.ctx.fillStyle = "#666";
  board.ctx.fillRect(this.posX, this.posY, this.width, this.height); 
}

BallThrower.prototype.moveThrower = function(){

}