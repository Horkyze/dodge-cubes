
game.models.Sphere = function(x,y,z,dx,dy,dz,r){

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

	this.instance = new THREE.Mesh(
		new THREE.SphereGeometry(
			r, 
			new THREE.MeshLambertMaterial({
        		color: 0x000022
    		})
    	)
    );

	this.instance.position.set(x,y,z);
	
}

game.models.Sphere.prototype.getInstance = function(){
	return this.instance;
}
