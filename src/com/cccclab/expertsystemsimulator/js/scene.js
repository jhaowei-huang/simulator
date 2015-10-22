/**
 * 
 */
window.com_cccclab_expertsystemsimulator_Simulator = function() {
	var xx = 50, yy = 50;
	var myview = document.getElementById("myview");
	/*var btnChange = document.createElement('button');
	btnChange.innerHTML("toogle create / delete mode");
	btnChange.appendTo(myview);*/
	// mouse moving detector
	if (!Detector.webgl) Detector.addGetWebGLMessage();
	// threejs basic component
	var container;
	var camera, scene, renderer, control;
	var plane, cube;
	var mouse, raycaster, isShiftDown = false;
	
	var rollOverMesh, rollOverMaterial;
	var cubeGeo, cubeMaterial;
	// cubes
	var objects = [];

	init();
	render();

	function init() {
		container = document.createElement('div');
		document.body.appendChild(container);

		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.set(500, 800, 1300);
		camera.lookAt(new THREE.Vector3());

		scene = new THREE.Scene();
		// roll-over
		rollOverGeo = new THREE.BoxGeometry(xx, yy, 50);
		rollOverMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true });
		rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
		scene.add(rollOverMesh);
		// cubes
		
		cubeGeo = new THREE.BoxGeometry(xx, yy, 50);
		// cubeMaterial = new THREE.MeshLambertMaterial({color: 0xfeb74c, shading: THREE.FlatShading, map: THREE.ImageUtils.loadTexture( "textures/square-outline-textured.png" ) } );
		cubeMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, opacity: 0.3, transparent: true});
		// grid
		var size = 750, step = 50;
		var geometry = new THREE.Geometry();
		
		for (var i = - size; i <= size; i += step) {
			geometry.vertices.push(new THREE.Vector3(- size, 0, i));
			geometry.vertices.push(new THREE.Vector3(  size, 0, i));
			geometry.vertices.push(new THREE.Vector3(i, 0, -size));
			geometry.vertices.push(new THREE.Vector3(i, 0,  size));
		}
		
		var material = new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.6, transparent: true});
		var line = new THREE.LineSegments(geometry, material);
		scene.add(line);
		// grid end
		// camera
		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();

		var geometry = new THREE.PlaneBufferGeometry(1500, 1500);
		geometry.rotateX(-Math.PI / 2);
		// the floor
		plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false}));
		scene.add(plane);

		objects.push(plane);
		// camera end
		// ambient light and directional light
		/*var ambientLight = new THREE.AmbientLight(0x606060);
		scene.add(ambientLight);

		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(1, 0.75, 0.5).normalize();
		scene.add(directionalLight);*/
		// ambient light and directional light
		// render
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setClearColor(0xffffff);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);
		// render end
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('mousedown', onDocumentMouseDown, false);
		// document.addEventListener( 'keydown', onDocumentKeyDown, false );
		// document.addEventListener( 'keyup', onDocumentKeyUp, false );
		// zoom, move your view
		control = new THREE.OrbitControls(camera, renderer.domElement);
		window.addEventListener('resize', onWindowResize, false);
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function onDocumentMouseMove(event) {
		event.preventDefault();
		mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1 );
		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObjects(objects);		
		if(intersects.length > 0) {
			var intersect = intersects[0];
			rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
			rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
		}
		render();
	}

	function onDocumentMouseDown(event) {
		event.preventDefault();
		mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObjects(objects);
		if(intersects.length > 0) {
			var intersect = intersects[0];
			// right click -> delete cube
			if(event.which === 3) {
				if( intersect.object != plane ) {
					scene.remove(intersect.object);
					objects.splice(objects.indexOf(intersect.object), 1);
				}
			// left click -> create cube
			} else if(event.which === 1){
				var voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
				voxel.position.copy(intersect.point).add(intersect.face.normal);
				voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
				scene.add(voxel);
				objects.push(voxel);
			}
			render();
		}
	}
/*
	function onDocumentKeyDown(event) {
		switch(event.keyCode) {
			case 16: isShiftDown = true; break;
		}
	}

	function onDocumentKeyUp( event ) {
		switch ( event.keyCode ) {
			case 16: isShiftDown = false; break;
		}
	}
*/
	function render() {
		// update your view
		control.update();
		renderer.render( scene, camera );
	}
	

	// myview.append(container);
	// get the DOM element to attach to assume we've got jQuery to hand
	// var $container = $("<div id='container'/>").appendTo('.v-ui');
	var $container = $("<div id='container'/>").appendTo(myview);
	// attach the render-supplied DOM element
	$container.append(container);
	
}