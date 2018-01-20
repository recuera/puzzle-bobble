var PuzzleBoard = function(){
  this.width = document.getElementById("canvas").getAttribute("width");
  this.height = document.getElementById("canvas").getAttribute("height");
  this.ctx = document.getElementById("canvas").getContext("2d");
}

PuzzleBoard.prototype.renderBoard = function(){
  this.ctx.fillStyle = "#bdd";
  this.ctx.fillRect(0, 0, this.width, this.height); 
}