
game.models.Vehicle = function(x,y,z){

	this.vx = 10;
	this.vy = 10;
	
	this.max = {}
	this.max.vx = 80;
	this.max.vy = 80;

	this.ax = 10;
	this.ay = 80;

	this.instance;

	this.instance = new THREE.Mesh( 
		new THREE.CubeGeometry( 100, 100, 100 ), 
		new THREE.MeshBasicMaterial( { 
		    color: 0xFF0000, 
		    shading: THREE.FlatShading,
		    vertexColors: THREE.VertexColors 
		})
	);

	this.instance.position.set(x,y,z);
	
}

game.models.Vehicle.prototype.getInstance = function(){
	return this.instance;
}

