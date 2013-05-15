
// game initialization, load images, models, etc...
game.init = function(){

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
    game.three.camera = new THREE.PerspectiveCamera(
    	30, 
    	window.innerWidth / window.innerHeight,
    	1,
    	20000
    );
    game.three.camera.position.set( -4000, game.config.game_plane_height/2, 800 );
	game.three.camera.lookAt( new THREE.Vector3( game.config.game_plane_width/2-500, game.config.game_plane_height/2, -1000) );
	game.three.camera.rotation.x = 90 * Math.PI / 180;

    // create scene
    game.three.scene = new THREE.Scene();
    game.three.scene.fog = new THREE.FogExp2( 0x4747FF, 0.00015 );

	/* If the getContext() method has already been invoked on this element for 
	 * the same contextId, return the same object as was returned that time, 
	 * and abort these steps. The additional arguments are ignored.
	 *
	 * get canvas context: game.ctx
	 * Bud bude fungovat THREE.js alebo moj canvas renderer
	 */

	//game.ctx = game.canvas.getContext("2d");

	// smooth input
	document.addEventListener('keyup', function(event) { game.input.Key.onKeyup(event); }, false);
	document.addEventListener('keydown', function(event) { game.input.Key.onKeydown(event); }, false);
	
	// ked sa zmeni velkost okna
	window.addEventListener( 'resize', onWindowResize, false );

	// 3D mouse click handler
	document.addEventListener( 'mousedown', game.input.onDocumentMouseDown, false );

	// hard input
	document.addEventListener('keypress', function(event) { console.log(event.keyCode);/*game.input.Key.onKeyPress(event);*/ }, false);

	//game state, start the game paused or running
	game.state = "paused";
}

 // run the game, when DOM is ready
 window.onload = function(){


 	//var gui = new dat.GUI();

 	//gui.add(game, 'scene');

 	// init game
 	game.init();

 	var clock = new THREE.Clock();
 		
 	// create some objects
 	for (var i = 0; i < 1000; i++) 
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
		game.config.barrier_size/2, // x
		game.config.barrier_size/2 + game.config.game_plane_height/2, // y
		50 //game.config.barrier_size/2 // z
	);

	game.three.scene.add( game.vehicle.getInstance() );



	var axes = buildAxes( 1000 );
	game.three.scene.add( axes );


	//text
	game.three.scene.add( game.scenes.menu.add() );

    // plane
    var plane = new THREE.Mesh( new THREE.PlaneGeometry( game.config.game_plane_width, game.config.game_plane_height), new THREE.MeshLambertMaterial({
        color: 0xffffff
    }));
    plane.overdraw = true;
    plane.position.set(game.config.game_plane_width/2, game.config.game_plane_height/2, 0);
    game.three.scene.add(plane);

    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x555555);
    //game.three.scene.add(ambientLight);

    // add directional light source
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    //game.three.scene.add(directionalLight);


	controls = new THREE.FirstPersonControls( game.three.camera );

	controls.movementSpeed = 1000;
	controls.lookSpeed = 0.125;
	controls.lookVertical = true;
	controls.constrainVertical = true;
	controls.verticalMin = 1.1;
	controls.verticalMax = 2.2;


	// and go!
	animate();

	function animate() {

		if (game.state == "stop")
		{
			return;
		}
		if ( game.state == "run" )
		{
			requestAnimationFrame( animate );
			
			game.input.handleInput();

			game.engine.moveObjects();
			
			game.three.camera.rotation.x = 90 * Math.PI / 180;

			// speed
			game.three.camera.position.x += 40;
			game.vehicle.instance.position.x += 40;

			//controls.update();
			game.three.renderer.render( game.three.scene, game.three.camera );

		}
		else if (game.state == "paused")
		{			
			requestAnimationFrame( animate );
			
			game.input.handleInput();
			//controls.update(clock.getDelta());
			//game.three.camera.position.x = 200;
			//game.three.camera.rotation.x = 90 * Math.PI / 180;
			
			game.three.renderer.render( game.three.scene, game.three.camera );
		}
		game.stats.update();
		
	}

}

