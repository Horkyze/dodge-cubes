
// game initialization, load images, models, etc...
game.oneTimeInit = function(){

	game.audio = document.getElementById('audio');

	game.container = document.createElement( 'div' );
	document.body.appendChild( game.container );

	// create renderer
 	game.three.renderer = new THREE.WebGLRenderer({antialias: true });
    game.three.renderer.setSize(window.innerWidth, window.innerHeight);
    game.three.renderer.shadowMapEnabled = true;
	game.container.appendChild( game.three.renderer.domElement );

	// create stats
	game.stats = new Stats();
	game.stats.domElement.style.position = 'absolute';
	game.stats.domElement.style.top = '0px';
	game.container.appendChild( game.stats.domElement );

	// create camera
    game.three.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 20000 );

	// smooth input
	document.addEventListener('keyup', function(event) { game.input.Key.onKeyup(event); }, false);
	document.addEventListener('keydown', function(event) { game.input.Key.onKeydown(event); }, false);
	
	// ked sa zmeni velkost okna
	window.addEventListener( 'resize', onWindowResize, false );

	// 3D mouse click handler
	document.addEventListener( 'mousedown', game.input.onDocumentMouseDown, false );

	// hard input
	document.addEventListener('keypress', function(event) { console.log(event.keyCode);/*game.input.Key.onKeyPress(event);*/ }, false);

	setInterval(game.engine.time.update, 1000);
}

game.newGame = function()
{
	$("#time").text(0);
	game.engine.time.start = Date.now();

	game.audio.play();
	game.scene = []
	// create scene
    game.three.scene = new THREE.Scene();
    game.three.scene.fog = new THREE.FogExp2( 0x4747FF, 0.00015 );

	// put camera to right position
    game.three.camera.position.set( -9000, game.config.game_plane_height/2, 800 );
	game.three.camera.lookAt( new THREE.Vector3( game.config.game_plane_width/2-500, game.config.game_plane_height/2, -1000) );
	game.three.camera.rotation.x = 90 * Math.PI / 180;
    
    // create some objects
 	for (var i = 0; i < 3000; i++) 
	{
		// add new ball object to array
		// init with random values
		game.scene.push(new game.models.Cube(
			rand(game.config.barrier_size/2, game.config.game_plane_width)-game.config.barrier_size/2, // x
			rand(game.config.barrier_size/2, game.config.game_plane_height)-game.config.barrier_size/2, // y
			game.config.barrier_size/2, // z
			rand(-10, 10), // dx
			rand(-10, 10), // dy
			rand(-10, 10), // dz
			game.config.barrier_size
		));

		// add them to scene
		game.three.scene.add( game.scene[i].getInstance() );
	}

	game.vehicle = new game.models.Vehicle(
		-5000, // x
		game.config.barrier_size/2 + game.config.game_plane_height/2, // y
		50 //game.config.barrier_size/2 // z
	);

	game.three.scene.add( game.vehicle.getInstance() );

    // plane
    var plane = new THREE.Mesh( new THREE.PlaneGeometry( game.config.game_plane_width, game.config.game_plane_height), new THREE.MeshLambertMaterial({
        color: 0xffffff
    }));
    plane.overdraw = true;
    plane.position.set(game.config.game_plane_width/2, game.config.game_plane_height/2, 0);
    game.three.scene.add(plane);

	controls = new THREE.FirstPersonControls( game.three.camera );
	controls.movementSpeed = 1000;
	controls.lookSpeed = 0.125;
	controls.lookVertical = true;
	controls.constrainVertical = true;
	controls.verticalMin = 1.1;
	controls.verticalMax = 2.2;

    //game state, start the game paused or running
	game.state = "run";
}

 // run the game, when DOM is ready
 window.onload = function(){

 	// init game
 	game.oneTimeInit();
	game.newGame(); 

	// start rendering loop
	game.rendering();

	// start simulation
	setInterval(function(){game.simulation()}, 1000/30);

}
