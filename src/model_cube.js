
game.models.Cube = function(x,y,z,dx,dy,dz,size){

	// position
	this.x  = x;
	this.y  = y;
	this.z  = z;

	// movement
	this.dx = dx;
	this.dy = dy;
	this.dz = dz;

	this.size = size;


	this.instance = new THREE.Mesh( 
		new THREE.CubeGeometry( this.size, this.size, this.size ), 
		new THREE.MeshNormalMaterial() 
	);
	this.instance.position.set(x,y,z);
	
}

game.models.Cube.prototype.getInstance = function(){
	return this.instance;
}
