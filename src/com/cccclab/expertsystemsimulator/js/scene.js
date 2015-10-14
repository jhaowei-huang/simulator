/**
 * 
 */
window.com_cccclab_expertsystemsimulator_Simulator = function() {
	// set the scene size
	var WIDTH = 400, HEIGHT = 300;

	// set some camera attributes
	var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

	// create a WebGL renderer, camera and a scene
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	var scene = new THREE.Scene();

	// create the cube's material
	var material = new THREE.MeshLambertMaterial({
		color : 0xCC0000
	});

	// create a new mesh with cube geometry - we will cover the material next!
	var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50, 16, 16, 16),
			material);

	// create a point light
	var light = new THREE.PointLight(0xFFFFFF);

	// set its position
	light.position.x = 10;
	light.position.y = 50;
	light.position.z = 130;

	// the camera starts at 0,0,0 so pull it back
	camera.position.z = 150;

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);
	
	cube.rotation.x += 0.5;
	cube.rotation.y += 0.4;

	// add the cube to the scene
	scene.add(cube);

	// and the camera
	scene.add(camera);

	// add to the scene
	scene.add(light);

	// get the DOM element to attach to assume we've got jQuery to hand
	var $container = $("<div id='container'/>").appendTo('.v-ui');

	// attach the render-supplied DOM element
	$container.append(renderer.domElement);

	this.onStateChange = function() {
	
		// draw!
		renderer.render(scene, camera);

	}
}