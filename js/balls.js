var ballColors = ["#3ec6e8","#d11027","#23a85a","#e86800"]

var Ball = function(posX,posY,color){
  this.radius = 30;
  this.posX = posX;
  this.posY = posY;
  this.color = color;
  this.speed = 0;
  this.angle = 0;
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
    this.placeBall(this);
    game.topBalls.push(this);
    game.addBall(game);
  }
  else{
    this.posX += (this.speed * Math.cos(correctAngle)) / 1000 * delta;
    this.posY += (this.speed * Math.sin(correctAngle)) / 1000 * delta;
  }
}

Ball.prototype.mustBounce = function(game){
  return this.posX < 0 + this.radius || this.posX > game.board.width - this.radius;
}

Ball.prototype.mustStop = function(game){
  var checkX = this.posX;
  var checkY = this.posY;
  
  var ballDistanceY = game.newBall.radius * Math.sqrt(3);
  var ballDistanceX =  (ballDistanceY * 2 )/ Math.sqrt(3);
  for (i = 0; i < game.topBalls.length; i++){
    if(checkY <= game.topBalls[i].posY + ballDistanceY ){
      if(checkX <= game.topBalls[i].posX + ballDistanceX && checkX >= game.topBalls[i].posX - ballDistanceX){  
        return true;
      }
    }
  }
  if(checkY < 0 + this.radius){
    return true;
  }
  return false;
}

Ball.prototype.checkBallsAround = function(game){
  var checkX = this.posX;
  var checkY = this.posY;
  var collidingBalls = [];
  game.topBalls.map(function(ball){
    var distanceX = checkX - ball.posX;
    var distanceY = checkY - ball.posY; 
    //Math.abs convierte la distancia a un número positivo
    var distance = Math.abs(Math.sqrt( distanceX * distanceX + distanceY * distanceY ));
    
    if(distance <= game.newBall.radius * 2){
      collidingBalls.push(ball)
    }
  })
  return collidingBalls;
 
}

Ball.prototype.placeBall = function(ball){
  var ballDistanceY = (ball.radius * Math.sqrt(3)) / 2;
  var ballRow = Math.floor(ball.posY/(ballDistanceY * 2));
  ball.placeBallY(ball,ballDistanceY,ballRow);
  ball.placeBallX(ball,ballRow);
}

Ball.prototype.placeBallY = function(ball,ballDistanceY,ballRow){
  if (ballRow == 0){
    ball.posY = 30;
  }
  else{
    ball.posY = ((ballDistanceY * 2 * ballRow) + ball.radius);
  }
}

Ball.prototype.placeBallX = function(ball,ballRow){
  if (ballRow % 2 == 0){
    if(Math.round(ball.posX/60) <= 1){
      ball.posX = 30;
    }
    else{
      ball.posX = Math.round(ball.posX/60) * 60 + 30;
    }
  }
  else{
    if(ball.posX + ball.speed < 60){
      ball.posX = 60;
    }
    else{
      ball.posX = Math.round(ball.posX/60) * 60;
    }
  }
}