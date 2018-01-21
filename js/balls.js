var Ball = function(posX,posY,color){
  this.radius = 20;
  this.posX = posX;
  this.posY = posY;
  this.color = color;
}

Ball.prototype.addBall = function(game){
  var newBall = new Ball(game.board.width / 2, game.board.height - this.radius , "#847")
  ballsToThrow.push(newBall);  
}

Ball.prototype.renderBall = function(board){
  board.ctx.beginPath();
  board.ctx.fillStyle = ballsToThrow[0].color;
  board.ctx.arc(ballsToThrow[0].posX, ballsToThrow[0].posY, ballsToThrow[0].radius, 0, 2 * Math.PI);
  board.ctx.fill();
}