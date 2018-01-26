
/* COLORS */ 
var blue = "#2eb2d3";
var red = "#d11027";
var green = "#23a85a";
var orange = "#e86800";
var ballColors = [blue, red, green, orange]

var Ball = function(posX, posY, color) {
  this.radius = 30;
  this.posX = posX;
  this.posY = posY;
  this.color = color;
  this.speed = 0;
  this.angle = 0;
};

Ball.prototype.renderBall = function(game, delta) {
  this.updatePos(game, delta);
  game.board.ctx.beginPath();
  game.board.ctx.fillStyle = this.color;
  game.board.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
  game.board.ctx.fill();
  game.board.ctx.save();
  game.board.ctx.beginPath();
  game.board.ctx.filter = 'blur(5px)';
  game.board.ctx.fillStyle = "rgba(255,255,255,.4";
  game.board.ctx.arc(this.posX - 6, this.posY - 5, 8, 0, 2 * Math.PI);
  game.board.ctx.fill();
  game.board.ctx.beginPath();
  game.board.ctx.strokeStyle = "rgba(255,255,255,.5";
  game.board.ctx.lineWidth = 4;
  game.board.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
  game.board.ctx.stroke();
  game.board.ctx.restore();
};

Ball.prototype.updatePos = function(game) {
  var correctAngle = (this.angle - 90) * Math.PI / 180;
  var bounceAngleX = (this.angle + 90) * Math.PI / 180;

  if (this.mustBounce(game)) {
    this.angle = -game.newBall.angle;
    this.posX += this.speed * Math.cos(bounceAngleX) / 1000 * delta;
    this.posY += this.speed * Math.sin(correctAngle) / 1000 * delta;
    bounceSound.play();
  } else if (this.mustStop(game)) {
    prevSpeed = this.speed;
    this.speed = 0;
    this.placeBall(this, game, prevSpeed);
  } else {
    this.posX += this.speed * Math.cos(correctAngle) / 1000 * delta;
    this.posY += this.speed * Math.sin(correctAngle) / 1000 * delta;
  }
};

Ball.prototype.mustBounce = function(game) {
  return (
    this.posX < 0 + this.radius || this.posX > game.board.width - this.radius
  );
};

Ball.prototype.mustStop = function(game) {
  var checkX = this.posX;
  var checkY = this.posY;
  var ballDistanceY = game.newBall.radius * Math.sqrt(3);
  var ballDistanceX = ballDistanceY * 2 / Math.sqrt(3);

  for (i = 0; i < game.topBalls.length; i++) {
    if (checkY <= game.topBalls[i].posY + ballDistanceY) {
      if (
        checkX <= game.topBalls[i].posX + ballDistanceX &&
        checkX >= game.topBalls[i].posX - ballDistanceX
      ) {
        return true;
      }
    }
  }
  if (checkY < 0 + this.radius) {
    return true;
  }
  return false;
};

Ball.prototype.checkBallsAround = function(game, ball) {
  var checkX = this.posX;
  var checkY = this.posY;
  var collidingBalls = [];
  game.topBalls.map(function(topBall) {
    var distanceX = checkX - topBall.posX;
    var distanceY = checkY - topBall.posY;
    //Math.abs convierte la distancia a un número positivo
    var distance = Math.abs(
      Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    );
    if (distance <= game.newBall.radius * 2 + 1) {
      collidingBalls.push(topBall);
    }
  });
  return collidingBalls;
};

Ball.prototype.removeBalls = function(ballsToRemove, game) {
  ballsToRemove.forEach(function(ball) {
    var i = game.topBalls.indexOf(ball);
    game.topBalls.splice(i, 1);
    popSound.play();
  });
  game.checkColorRemoval(game);
};

Ball.prototype.findMatchingBalls = function(ball, arr) {
  var matchingBalls = arr.filter(function(ballChecked) {
    if (ballChecked.color == ball.color) {
      return ballChecked;
    }
  });
  return matchingBalls;
};

Ball.prototype.checkBallsRemoval = function(game, ball) {
  var ballsAround = ball.checkBallsAround(game, ball);

  var matchingBalls = ball.findMatchingBalls(ball, ballsAround);

  if (matchingBalls.length > 0) {
    var keepSearching = true;
    while (keepSearching) {
      for (i = 0; i < matchingBalls.length; i++) {
        var ballsToCheck = matchingBalls[i].checkBallsAround(
          game,
          matchingBalls[i]
        );
        ballsToCheck = ball.findMatchingBalls(ball, ballsToCheck);
        ballsToCheck.forEach(function(ballChecked) {
          var addToMatchingballs = [];
          if (!matchingBalls.includes(ballChecked)) {
            addToMatchingballs.push(ballChecked);
          }
          addToMatchingballs.forEach(function(e) {
            matchingBalls.push(e);
          });
          if (addToMatchingballs.length == 0) {
            keepSearching = false;
          }
        });
      }
    }
  }
  if (matchingBalls.length > 1) {
    game.newBall.removeBalls(matchingBalls, game);
    game.addPoints((matchingBalls.length + 1) * game.ballPoints);
    game.newBall.findFloatingBalls(game);
    if(game.topBalls.length == 0){
      game.nextLevel();
    }
    game.addBall(game);
  } else {
    game.topBalls.push(game.newBall);
    game.addBall(game);
  }
};

Ball.prototype.findFloatingBalls = function(game) {
  game.topBalls.forEach(function(e) {
    var ballGroup = e.checkBallsAround(game, e);

    if (ballGroup.length > 0) {
      var keepSearching = true;
      while (keepSearching) {
        for (i = 0; i < ballGroup.length; i++) {
          var ballsToCheck = ballGroup[i].checkBallsAround(game, ballGroup[i]);
          ballsToCheck.forEach(function(e) {
            var addToGroup = [];
            if (!ballGroup.includes(e)) {
              ballGroup.push(e);
              addToGroup.push(e);
            }
            if (addToGroup.length == 0) {
              keepSearching = false;
            }
          });
        }
      }
    }

    var minPosY = game.board.height;
    ballGroup.forEach(function(y) {
      if (y.posY < minPosY) {
        minPosY = y.posY;
      }
    });
    if (minPosY > 30) {
      game.addPoints(ballGroup.length * game.ballPoints * 2);
      game.newBall.removeBalls(ballGroup, game);
    }
  });
};

Ball.prototype.placeBall = function(ball, game, prevSpeed) {
  var originPosX = ball.posX;
  var originPosY = ball.posY;
  var ballDistanceY = ball.radius * Math.sqrt(3) / 2;
  var ballRow = Math.floor(ball.posY / (ballDistanceY * 2));
  var ballShouldContinue = false;
  ball.placeBallY(ball, ballDistanceY, ballRow);
  ball.placeBallX(ball, ballRow);
  for (i = 0; i < game.topBalls.length; i++) {
    if (
      ball.posX == game.topBalls[i].posX &&
      ball.posY == game.topBalls[i].posY
    ) {
      if (originPosX < game.topBalls[i].posX) {
        ball.posX = game.topBalls[i].posX - ball.radius * 2;
      } else {
        ball.posX = game.topBalls[i].posX + ball.radius * 2;
      }
    }
  }
  var ballsAround = game.newBall.checkBallsAround(game, ball);
  if (ball.posY > 30 && ballsAround.length == 0) {
    ball.posY = originPosY - 2;
    if (ball.angle > -180) {
      ball.posX = originPosX + 2;
    } else {
      ball.posX = originPosX - 2;
    }
    ball.speed = prevSpeed;
    var correctAngle = (this.angle - 90) * Math.PI / 180;
    this.posX += this.speed * Math.cos(correctAngle) / 1000 * delta;
    this.posY += this.speed * Math.sin(correctAngle) / 1000 * delta;
    ballShouldContinue = true;
  }
  //Cuando la bola colisiona y debe detenerse:
  if (!ballShouldContinue) {
    this.checkBallsRemoval(game, ball);
    bounceSound.play();
    game.checkGameOver();
  }
};

Ball.prototype.placeBallY = function(ball, ballDistanceY, ballRow) {
  if (ballRow == 0) {
    ball.posY = 30;
  } else {
    ball.posY = ballDistanceY * 2 * ballRow + ball.radius;
  }
};

Ball.prototype.placeBallX = function(ball, ballRow) {
  if (ballRow % 2 == 0) {
    if (Math.round(ball.posX / 60) <= 1) {
      ball.posX = 30;
    } else {
      ball.posX = Math.round(ball.posX / 60) * 60 + 30;
    }
  } else {
    if (ball.posX + ball.speed < 60) {
      ball.posX = 60;
    } else {
      ball.posX = Math.round(ball.posX / 60) * 60;
    }
  }
};