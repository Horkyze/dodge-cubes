function msg(text_msg)
{
	var text3d = null;
	text3d = new THREE.TextGeometry( text_msg, {
		size: 500,
		height: 200,
		curveSegments: 5,
		font: "helvetiker"
	});
	text3d.computeBoundingBox();

	var middle	= new THREE.Vector3();
	middle.x	= ( text3d.boundingBox.min.x + text3d.boundingBox.max.x ) / 2;
	middle.y	= ( text3d.boundingBox.min.y + text3d.boundingBox.max.y ) / 2;
	middle.z	= ( text3d.boundingBox.min.z + text3d.boundingBox.max.z ) / 2;

	console.log(middle);

	var textMaterial = new THREE.MeshBasicMaterial( { color: /*Math.random() * */ 0xffe200, overdraw: true } );
	var text = new THREE.Mesh( text3d, textMaterial );

	text.position.x = game.vehicle.instance.position.x + 1000;
	text.position.y = game.vehicle.instance.position.y + middle.x; 
	text.position.z = 100;

	text.rotation.x = 0;
	text.rotation.y = -Math.PI / 2;
	text.rotation.z = -Math.PI / 2;

	var parent = new THREE.Object3D();
	parent.add( text );
	game.three.scene.add(parent);
}

game.models.Text = function(x,y,z){

	this.text = "Good luck!";
	this.text3d = null;
	this.instance = null;


	// create text3D
	this.text3d = new THREE.TextGeometry( this.text, {
		size: 80,
		height: 20,
		curveSegments: 2,
		font: "helvetiker"
	});

	this.text3d.computeBoundingBox();

	var centerOffset = -0.5 * ( this.text3d.boundingBox.max.x - this.text3d.boundingBox.min.x );

	var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: true } );
	var text = new THREE.Mesh( this.text3d, textMaterial );

	text.position.x = centerOffset;
	text.position.y = game.config.game_plane_height/2;
	text.position.z = 0;

	text.rotation.x = 0;
	text.rotation.y = -Math.PI / 2;
	text.rotation.z = -Math.PI / 2;

	var parent = new THREE.Object3D();
	parent.add( text );

	this.instance = parent;

	this.instance.position.set(x,y,z);

}

game.models.Text.prototype.getInstance = function(){
	return this.instance;
}

