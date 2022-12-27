/*
This is a 3 axis robot simulation system - Version 2

motor0: Base Axis (Rotates about z axis)
motor1: Shoulder Axis
motor2: Elbow Axis
Arm0: First Arm at the base (Blue Arm)
Arm1: Second Arm Link (Red Arm)
Arm2: Elbow Link (Yellow Arm)
Uses on Screen GUI Controls

*/



  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false
  });


//Creating the Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

//const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
  //controls.minPolarAngle =Math.PI;  
  controls.maxPolarAngle =Math.PI/2-0.2;
  controls.minPolarAngle =0;
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  //controls.target.set(0,0,0);
  //controls.update();
camera.position.z = 15;
camera.position.y = 12;
camera.position.x = 15;
camera.rotation.z=Math.PI;
controls.update();
//Adding lights to the scene

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 80, 10, 20 );
spotLight.castShadow = true;
scene.add( spotLight );


const spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set( -80, 10, -20 );
spotLight2.castShadow = true;
scene.add( spotLight2 );

{
    const color = 0xFFFFFF;
    const intensity = 0.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
const light3 = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.2 );
light3.position.set( 0.5, 1, 0.75 );
scene.add( light3 );



//adding a floor
//Load the texture
var loader = new THREE.TextureLoader();
loader.setCrossOrigin("anonymous");
const texture = loader.load(
  '/pics/floor3.jpeg');

  var Fmaterial = new THREE.MeshPhongMaterial({ color:0xFFFFFF, map: texture });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 32, 32 );
  
  //Create a plane with texture as floor
  var Fgeometry = new THREE.PlaneBufferGeometry(500, 500);
  //var material = new THREE.MeshBasicMaterial({ map: texture });
  var plane = new THREE.Mesh(Fgeometry, Fmaterial);
  plane.rotation.x=-Math.PI/2;
  scene.add(plane);


//Render the scene
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);
      


/// Adding a yellow arrow showing the X Axis direction
/*
const dir = new THREE.Vector3( 1, 0, 0 );
//normalize the direction vector (convert to vector of length 1)
dir.normalize();
const origin = new THREE.Vector3( 0, 2, 0 );
const length = 1;
const hex = 0xffff00;
const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
scene.add( arrowHelper );
*///

//Creating the Arm+Motor Geometry and Materials
const baseGeometry = new THREE.CylinderGeometry( 3, 3,0.5 );
const columnGeometrty = new THREE.CylinderGeometry( 0.3, 0.3,4 );
const motorGeometry = new THREE.CylinderGeometry( 0.3, 0.3,1 );
const armGeometry = new THREE.BoxGeometry( 0.8, 1.5, 5 );

const blueMaterial = new THREE.MeshPhongMaterial( { color: 0x002aff, emmisive: 0x000000, specular: 0xf5e490, wireframe: false, shininess:20} ); //Blue Material

const redMaterial = new THREE.MeshPhongMaterial( { color: 0xf60410, emmisive: 0x000000, specular: 0xf5e490, wireframe: false, shininess:20} ); //Red Material

const yellowMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00, emmisive: 0x000000, specular: 0xf5e490, wireframe: false, shininess:20} ); //Yellow Material


// Creating Base Plate
const base = new THREE.Mesh( baseGeometry, blueMaterial );
base.position.x=0.8;
base.position.y=0.25;
base.position.z=1.7;
scene.add( base );
// Creating the Base Column
const column = new THREE.Mesh( columnGeometrty, blueMaterial );
base.add( column );
column.position.y=2;
// Creating Motor0 (Base Axis)
const motor0 = new THREE.Mesh( motorGeometry, blueMaterial );
motor0.position.x=0.8;
motor0.position.y=6.2;
motor0.position.z=1.7;
scene.add( motor0 );



//Creating the first arm (Arm0: Blue ARM)
const Arm0 = new THREE.Mesh( armGeometry, blueMaterial );

//ADDING THE BLUE ARM TO THE MESH:motor2
motor0.add( Arm0 );
Arm0.position.x=0;
Arm0.position.y=-1.2;
Arm0.position.z=-1.7;

//Creating the Motor1 (Shoulder Axis)
const motor1 = new THREE.Mesh( motorGeometry, redMaterial );

var rot=THREE.Math.degToRad( 90 );
motor1.rotation.z=rot;
motor0.add( motor1 );
motor1.position.x=-0.8;
motor1.position.y=-1.2;
motor1.position.z=-3.15;

//creating the second arm (Arm1: RED ARM)
const Arm1 = new THREE.Mesh( armGeometry, redMaterial );

//ADDING THE RED ARM TO THE MOTOR 1 MESH
motor1.add( Arm1 );
//Positioning the Red Arm insider the mesh: motor1
Arm1.rotation.z=THREE.Math.degToRad( 90 );
Arm1.position.x=0;
Arm1.position.y=-1.6;
Arm1.position.z=1.5;


//Creating the Motor2 (Elbow Axis)
const motor2 = new THREE.Mesh( motorGeometry, yellowMaterial );

var rot=THREE.Math.degToRad( 180 );
motor2.rotation.z=rot;
motor1.add( motor2 );
motor2.position.x=0;
motor2.position.y=-3.2;
motor2.position.z=3.3;

//creating the second arm (Arm1: RED ARM)
const Arm2 = new THREE.Mesh( armGeometry, yellowMaterial );

//ADDING THE RED ARM TO THE MOTOR 1 MESH
motor2.add( Arm2 );
//Positioning the Red Arm insider the mesh: motor1
Arm2.rotation.z=THREE.Math.degToRad( 90 );
Arm2.position.x=0;
Arm2.position.y=-0.8;
Arm2.position.z=-1.8;



//Adding a Grid Helper
/*
const size = 20;
const divisions = 1;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
*/



//Adding a Keyboard listener to detect keydown events

var rotspeed=0.03;

document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 49) { //'1' Key for Base Axis CCW
        motor0.rotation.y-= rotspeed;
    } else if (keyCode == 81) {//'q' key for Base Axis 1CW
        motor0.rotation.y+= rotspeed; 
    } else if (keyCode == 50) { //'2' key for Axis 2 CW
        motor1.rotation.x+= rotspeed;
    } else if (keyCode == 87) { //'w' key for Axis 2 CCW
        motor1.rotation.x-= rotspeed;
    } else if (keyCode == 51) {//'3' key for Axis 3 CW
        motor2.rotation.y-= rotspeed;
      } else if (keyCode == 69) {//'e' key for Axis 3 CCW
        motor2.rotation.y+= rotspeed;
    }
 
  };

//Options to be added to the GUI
var options = {
  axis1Pos: 0,
  axis2Pos: 0,
  axis3Pos: 0,
 
  move: function() {
    //this.axis1Pos = 0;
    //this.axis2Pos = 0;
    //this.axis3Pos = 0;
    camera.position.x-=1;
    
  },
  reset: function() {
    this.axis1Pos = 0;
    this.axis2Pos = 0;
    this.axis3Pos = 0;
    
    
  }
};

//Creating GUI
var gui = new dat.GUI();

var pendant = gui.addFolder('Robot Controls');
pendant.add(options, 'axis1Pos', -3, 3).name('Axis 1').listen();
pendant.add(options, 'axis2Pos', -3, 3).name('Axis 2').listen();
pendant.add(options, 'axis3Pos', -2, 2).name('Axis 3').listen();

pendant.open();

//gui.add(options, 'move');
gui.add(options, 'reset');



//Creating Animations
function animate() {
  
  
    requestAnimationFrame( animate );
    //setupKeyControls();
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
  
    
    //motor1.rotation.x += 0.01;
    //motor2.rotation.y -= 0.01;
	renderer.render( scene, camera );
    motor0.rotation.y=options.axis1Pos;
    motor1.rotation.x = options.axis2Pos;
    motor2.rotation.y = options.axis3Pos;
  
};
 animate();

