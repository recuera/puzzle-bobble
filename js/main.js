window.onload = function() {
  var game = new PuzzleGame();
  window.requestAnimationFrame(function() {
    game.renderGame(game);
  });
  document.getElementById("start").onclick = function() {
    $("#intro").fadeOut(800);
    game.startGame();
    goSound.play();
  };

  document.getElementById("resetLevel").onclick = function(){
    $("#gameOver").fadeOut();
    game.resetLevel(game);
  };

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37: // izquierda
        game.thrower.moving[0] = true;
        break;
      case 39: // derecha
        game.thrower.moving[1] = true;
        break;
      case 32:
        game.thrower.throw(game);
        break;
    }
  };

  document.onkeyup = function(e) {
    switch (e.keyCode) {
      case 37: // izquierda
        game.thrower.moving[0] = false;
        break;
      case 39: // derecha
        game.thrower.moving[1] = false;
        break;
      case 32:
        game.thrower.throw(game);
        break;
    }
  };
  readySound.play();
};

function showGameOver(){
  $("#gameOver").fadeIn();
}
function showNextLevel(){
  $("#next").show();
}
function hideNextLevel(){
  $("#next").delay(600).fadeOut();
}
function showWin(){
  $("#win").fadeIn(200);
}