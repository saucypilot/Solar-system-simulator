import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js?module';
import { OrbitControls } from 'https://unpkg.com/three@0.155.0/examples/jsm/controls/OrbitControls.js?module';
import { planets } from './planets.js';
import { Orbit } from './orbits.js';
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

// Sun
const sunSize = 1.5;
const sunTexture = 'planet textures/sun.png';
// Add 'true' to flag it as the sun
const sun = new planets(
    sunSize,
    new THREE.Vector3(0, 0, 0),
    sunTexture,
    new THREE.Vector3(0, 1, 0),
    0.004,
    true
);


scene.add(sun.getObject());

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.2); // Not zero, just low
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffffff, 100, 0); // Intensity to 10
sunLight.position.copy(sun.getObject().position);
sunLight.castShadow = true;
scene.add(sunLight);

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

// Earth
const earthDistance = 7;
const earthPivot = new THREE.Object3D();
scene.add(earthPivot);
const earthOrbit = new Orbit(earthPivot, 0.01, earthDistance, scene); // Pass pivot, speed, radius, scene
const earth = new planets(0.5, new THREE.Vector3(earthDistance, 0, 0), 'planet textures/earth.png', new THREE.Vector3(0, 1, 0), 0.01);
earthPivot.add(earth.getObject());

// Moon
const moonDistance = 2.5;
const moonSize = 0.27;
const moonTexture = 'planet textures/moon.png';
const moonPivot = new THREE.Object3D();
earth.getObject().add(moonPivot);
const moonOrbitSpeed = (2 * Math.PI) / 27.3 / 60;
const moonOrbit = new Orbit(moonPivot, moonOrbitSpeed, moonDistance, scene);
const moon = new planets(moonSize, new THREE.Vector3(moonDistance, 0, 0), moonTexture, new THREE.Vector3(0, 1, 0), 0.01);
moonPivot.add(moon.getObject());

function animate() {
    requestAnimationFrame(animate);

    // Update the Earth rotation
    earth.update();

    // Update orbits
    earthOrbit.update();
    moonOrbit.update();

    // Make the sunLight always follow the sun
    sunLight.position.copy(sun.getObject().position);

    // Render the scene
    renderer.render(scene, camera);
}
animate();