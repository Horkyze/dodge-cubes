
game.models.Ball = function(x,y,z,dx,dy,dz,r){

	// position
	this.x  = x;
	this.y  = y;
	this.z  = z;

	// movement
	this.dx = dx;
	this.dy = dy;
	this.dz = dz;

	// radius
	this.r  = r;
	
}

game.models.Ball.prototype.draw = function(){
	game.ctx.beginPath();
	//arc(x, y, radius, sAngle, eAngle, counterclockwise);
	game.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	game.ctx.stroke();
}

game.models.Ball.prototype.drawGL = function(){
	game.ctx.beginPath();
	//arc(x, y, radius, sAngle, eAngle, counterclockwise);
	game.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	game.ctx.stroke();
}