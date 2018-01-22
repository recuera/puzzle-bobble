var Ball = function(posX,posY,color){
  this.radius = 30;
  this.posX = posX;
  this.posY = posY;
  this.color = color;
  this.speed = 0;
  this.angle = 0;
}

Ball.prototype.addBall = function(game){
  game.newBall = new Ball(game.board.width / 2, game.board.height - marginBottom , "#3ec6e8");
}

Ball.prototype.renderBall = function(game,delta){
  this.updatePos(game, delta);
  game.board.ctx.beginPath();
  game.board.ctx.fillStyle = this.color;
  game.board.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
  game.board.ctx.fill();

}

Ball.prototype.updatePos = function(game){
  var correctAngle = (this.angle - 90) * Math.PI / 180;
  var bounceAngleX = (this.angle + 90) * Math.PI / 180;

  if (this.mustBounce(game)){
    this.angle = -game.newBall.angle;
    this.posX += (this.speed * Math.cos(bounceAngleX)) / 1000 * delta;
    this.posY += (this.speed * Math.sin(correctAngle)) / 1000 * delta;
  }
  else if (this.mustStop(game)){
    this.speed = 0;
    game.topBalls.push(this);
    game.newBall.addBall(game);
  }
  else{
    this.posX += (this.speed * Math.cos(correctAngle)) / 1000 * delta;
    this.posY += (this.speed * Math.sin(correctAngle)) / 1000 * delta;
  }
}

Ball.prototype.mustBounce = function(game){
  return this.posX < 0 + this.radius + 5 || this.posX > game.board.width - this.radius - 5;
}

Ball.prototype.mustStop = function(game){
  return this.posY < 0 + this.radius + 5;
}