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

// Planet creation
const earth = new planets(1, new THREE.Vector3(0, 0, 0), 'planet textures/earth.png', new THREE.Vector3(0, 1, 0), 0.01);
scene.add(earth.getObject());

function animate() {
    requestAnimationFrame(animate);
    
    // Update the Earth rotation
    earth.update();
    
    // Render the scene
    renderer.render(scene, camera);
}
animate();