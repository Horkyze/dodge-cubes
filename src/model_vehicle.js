
game.models.Vehicle = function(x,y,z){

	this.v = []
	this.v.x = 40;
	this.v.y = 80;
	
	this.max_v = []
	this.max_v.x = 150;
	this.max_v.y = 150;

	this.a = []
	this.a.x = 10;
	this.a.y = 1;

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

