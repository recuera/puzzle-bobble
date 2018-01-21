var Ball = function(posX,posY,color){
  this.radius = 30;
  this.posX = posX;
  this.posY = posY;
  this.color = color;
  this.speed = 0;
  this.angle = 0;
}

Ball.prototype.addBall = function(game){
  var newBall = new Ball(game.board.width / 2, game.board.height - marginBottom , "#3ec6e8")
  ballsToThrow.push(newBall);  
}

Ball.prototype.renderBall = function(game){
  this.updatePos(game);
  game.board.ctx.strokeStyle = '#000';  
  game.board.ctx.beginPath();
  game.board.ctx.fillStyle = ballsToThrow[0].color;
  game.board.ctx.arc(ballsToThrow[0].posX, ballsToThrow[0].posY, ballsToThrow[0].radius, 0, 2 * Math.PI);
  game.board.ctx.fill();

}

Ball.prototype.updatePos = function(game){
  var correctAngle = (game.newBall.angle - 90) * Math.PI / 180;
  var bounceAngleX = (game.newBall.angle + 90) * Math.PI / 180;

  if (ballsToThrow[0].mustBounce(game)){
    game.newBall.angle = -game.newBall.angle;
    ballsToThrow[0].posX += this.speed * Math.cos(bounceAngleX);
    ballsToThrow[0].posY += this.speed * Math.sin(correctAngle);
  }
  else if (ballsToThrow[0].mustStop(game)){
    this.speed = 0;
  }
  else{
    ballsToThrow[0].posX += this.speed * Math.cos((correctAngle));
    ballsToThrow[0].posY += this.speed * Math.sin((correctAngle));
  }
}

Ball.prototype.mustBounce = function(game){
  return ballsToThrow[0].posX < 0 + this.radius - this.speed || ballsToThrow[0].posX > game.board.width - this.radius + this.speed;
}

Ball.prototype.mustStop = function(game){
  return ballsToThrow[0].posY < 0 + this.radius - game.newBall.speed  ;
}