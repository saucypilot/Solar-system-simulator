import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js?module';
import { OrbitControls } from 'https://unpkg.com/three@0.155.0/examples/jsm/controls/OrbitControls.js?module';
import { planets } from './planets.js';
// Creating camera first
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Then renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Then scene
const scene = new THREE.Scene();

// Background
const loader = new THREE.TextureLoader();
loader.load('planet textures/stars.png', function(texture) {
    scene.background = texture;
});

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
directionalLight.castShadow = true;
scene.add(directionalLight);

// camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation to avoid flipping
controls.minDistance = 2; // Minimum zoom distance
controls.maxDistance = 10; // Maximum zoom distance
controls.enableZoom = true; // Enable zooming with the mouse wheel
controls.enablePan = true; // Enable panning with the right mouse button
controls.enableRotate = true; // Enable rotation with the left mouse button
controls.autoRotate = false; // Disable auto-rotation
controls.autoRotateSpeed = 2.0; // Speed of auto-rotation
controls.update();
//Sun
const sunSize = 1.5;
const sunTexture = 'planet textures/sun.png'; // Make sure this texture exists
const sun = new planets(sunSize, new THREE.Vector3(0, 0, 0), sunTexture, new THREE.Vector3(0, 1, 0), 0.004);
scene.add(sun.getObject());
// Earth
const earthDistance = 7;
const earthPivot = new THREE.Object3D();
scene.add(earthPivot);
const earth = new planets(1, new THREE.Vector3(earthDistance, 0, 0), 'planet textures/earth.png', new THREE.Vector3(0, 1, 0), 0.01);
earthPivot.add(earth.getObject());
// Moon
const moonDistance = 2.5; 
const moonSize = 0.27;
const moonTexture = 'planet textures/moon.png';
const moon = new planets(moonSize, new THREE.Vector3(moonDistance, 0, 0), moonTexture, new THREE.Vector3(0, 1, 0), 0.01);
const moonPivot = new THREE.Object3D();
earth.getObject().add(moonPivot);
moonPivot.rotation.z = THREE.MathUtils.degToRad(5.1);
moonPivot.add(moon.getObject());
const moonOrbitSpeed = (2 * Math.PI) / 27.3 / 60;


function animate() {
    requestAnimationFrame(animate);
    
    // Update the Earth rotation
    earth.update();

    //Moon orbits around the Earth
    moonPivot.rotation.y += moonOrbitSpeed;
    moon.getObject().rotation.y = moonPivot.rotation.y;
    
    // Render the scene
    renderer.render(scene, camera);
}
animate();