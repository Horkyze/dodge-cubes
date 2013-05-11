
game.models.Vehicle = function(x,y,z){

	// position
	this.x  = x;
	this.y  = y;
	this.z  = z;

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

