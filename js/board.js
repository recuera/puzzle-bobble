var PuzzleBoard = function(){
  this.width = document.getElementById("canvas").getAttribute("width");
  this.height = document.getElementById("canvas").getAttribute("height");
  this.ctx = document.getElementById("canvas").getContext("2d");
}

PuzzleBoard.prototype.renderBoard = function(){
  this.ctx.save();
  this.ctx.fillStyle = "#daeced";
  this.ctx.strokeStyle = '#85a5af'; 
  this.ctx.lineWidth = 10;
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.strokeRect(0, 0, this.width, this.height);
  this.ctx.restore();
}
