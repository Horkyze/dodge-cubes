// Object holding all scenes
game.scenes = new Object();

// heads up display, showing controls
game.scenes.hud = new Object();

// 
game.scenes.menu = function (){
	this.text = "Good luck!";
	this.text3d = null;
	this.instance = null;

}


game.scenes.menu.prototype.init = function(){

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

}



game.scenes.menu.add = function(){
	var menu = new game.scenes.menu();
	menu.init();

	return menu.instance;
}



