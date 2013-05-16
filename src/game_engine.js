// Create new game object
var game = new Object();

// game engine
game.engine = Object();

// game objects, which are going to be rendered
game.scene = new Array();

// Place for game models, class of elemets which can be added to scene
game.models = new Array();

// THREE.js global variables (scene, camera, renderer etc...)
game.three = {
	scene    : null,
	camera   : null,
	renderer : null
}
 // default settings
game.config = {
	"canvas_width"  : window.innerWidth,
	"canvas_height" : window.innerHeight,
	"game_plane_height" : 20000,
	"game_plane_width"  : 300000,
	"barrier_size" : 200
};

game.engine.time = {
	start : 0,
	besttime : [],
	update : function(){
		if (game.state == "run")
			$("#time").text( parseInt($("#time").text()) + 1 );
	}
}



game.engine.moveObjects = function(){

	//game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

	for (var i = 0; i < game.scene.length; i++) {

		// no move beyond boundaries 
		if ( game.scene[i].instance.position.x + game.scene[i].dx >= game.config.game_plane_width || game.scene[i].instance.position.x + game.scene[i].dx < 0) {
			game.scene[i].dx *= -1;
		}

		if ( game.scene[i].instance.position.y + game.scene[i].dy >= game.config.game_plane_height || game.scene[i].instance.position.y + game.scene[i].dy < 0) {
			game.scene[i].dy *= -1;
		}

		game.scene[i].instance.position.x += game.scene[i].dx;
		game.scene[i].instance.position.y += game.scene[i].dy;

	};
}

game.engine.moveVehicle = function(direction, a){
	
	
	// accelerate in given[direction]
	//game.vehicle.v[direction] += game.vehicle.a[direction] * a;

	// set new position
	game.three.camera.position[direction] 	 += game.vehicle.v[direction] * a;
	game.vehicle.instance.position[direction] += game.vehicle.v[direction] * a;


}

game.rendering = function(){
	if (game.scene.length > 0 )
	{
		game.three.renderer.render( game.three.scene, game.three.camera );
	}
	game.three.camera.rotation.x = 90 * Math.PI / 180;
	game.stats.update();
	requestAnimationFrame( game.rendering );
}

game.simulation = function(){
	if (game.state == "run"){
		game.input.handleInput();
		game.engine.moveObjects();
		game.three.camera.position.x 	 += game.vehicle.v.x;
		game.vehicle.instance.position.x += game.vehicle.v.x;
	}
}

game.input = {

	onDocumentMouseDown: function( event ) {

		//console.log("Mouse clicked here: " + event.clientX + " " + event.clientY);
		var projector = new THREE.Projector();
		var mouse = new THREE.Vector3(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1,
			0.5
		);
		console.log(mouse);
		projector.unprojectVector( mouse, game.three.camera );

		var raycaster = new THREE.Raycaster( 
			game.three.camera.position,
			mouse.sub( game.three.camera.position ).normalize() 
		);

		// original "objects"
		var intersects = raycaster.intersectObjects( game.three.scene.__objects, true );

		if ( intersects.length > 0 ) {
			console.log("Si stlacil");
			intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
		}
	},

	Key : {

		_pressed: {},
		normalPress: {},

		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		ESC: 27,
		P: 112, // pause
	

		isDown: function(keyCode) {
			return this._pressed[keyCode];
		},

		onKeydown: function(event) {
			this._pressed[event.keyCode] = true;
			//console.log("Got: " + event.keyCode);
		},

		onKeyup: function(event) {
			delete this._pressed[event.keyCode];
		},

		onKeyPress: function(event){

			console.log("Got: " + event.keyCode);

			if ( this.normalPress[event.keyCode] )
				delete this.normalPress[event.keyCode];
			else
				this.normalPress[event.keyCode] = true;
		},

		isPressed: function(keyCode){
			return this.normalPress[keyCode];
		}
	},

	handleInput : function(){

		if ( this.Key.isPressed(this.Key.P) ) {

			// is is game paused, we want to unpause it
			if (game.state == "paused")
			{
				game.state = "run";
			}
			else // else keep is paused and discard any other input
			{
				game.state = "paused";
				return;
			}
		}


		if (this.Key.isDown(this.Key.LEFT)) {
			game.engine.moveVehicle('y', 1);
			if ( game.vehicle.instance.position.y  > game.config.game_plane_height )
			{
				msg("Prehral si!");
				game.state = "stop";
				//game.vehicle.instance.position.y -=100;
			}
		}
		if (this.Key.isDown(this.Key.RIGHT)){
			game.engine.moveVehicle('y', -1);
			if ( game.vehicle.instance.position.y  < 0 )
			{
				msg("Prehral si!");
				game.state = "stop";
			}
		}
		if (this.Key.isDown(this.Key.UP)){
			game.engine.moveVehicle('x', 1);
			if ( game.vehicle.instance.position.x  > game.config.game_plane_width )
			{
				var now = Date.now();
				var time = now - game.engine.time.start;
				game.engine.time.besttime.push(time);
				var largest = Math.max.apply(Math, game.engine.time.besttime);
				if (time < largest || game.engine.time.besttime.length == 1)
				{
					msg("Best time! "+time);
					$("#besttime").text(time);
					game.three.scene.__objects.shift();
				}
				game.state = "stop";
			}
		}
		if (this.Key.isDown(this.Key.DOWN)){
			game.engine.moveVehicle('x', -1);
		}
		game.state = "run";

		for ( var i in game.scene )
		{
			var diff = subVectors(game.scene[i].instance.position, game.vehicle.instance.position)
			//if ( diff.x < (173 + 69 + 10) && diff.y < (173 + 69 + 10 ) )
			if ( Math.abs( game.scene[i].instance.position.x - game.vehicle.instance.position.x) < game.config.barrier_size/2 + 50)
			{
				if (Math.abs( game.scene[i].instance.position.y - game.vehicle.instance.position.y) < game.config.barrier_size/2 + 50)
				{
					msg("Prehral si!");
					game.state = "stop";
				}
			}
			//Math.sqrt( Math.pow(diff.x, 2) + Math.pow(diff.y, 2) + Math.pow(diff.z, 2))
			//if ( subVectors(game.scene[i].instance.position, ) )
			//console.log(diff);
		}

	}
}

function onWindowResize() {

	game.three.camera.aspect = window.innerWidth / window.innerHeight;
	game.three.camera.updateProjectionMatrix();

	game.three.renderer.setSize( window.innerWidth, window.innerHeight );

}
