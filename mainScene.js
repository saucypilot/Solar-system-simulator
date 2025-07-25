import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js?module';
import { OrbitControls } from 'https://unpkg.com/three@0.155.0/examples/jsm/controls/OrbitControls.js?module';
import { planets } from './planets.js';
import { Orbit } from './orbits.js';
import { ShootingStarManager } from './shootingStars.js'
import { Astrobelt } from './astrobelt.js';


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
const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffffff, 100, 0);
sunLight.position.copy(sun.getObject().position);
sunLight.castShadow = true;
scene.add(sunLight);

// camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;
controls.autoRotate = false;
controls.autoRotateSpeed = 2.0;
controls.update();

// Mercury
const mercuryDistance = 2;
const mercuryPivot = new THREE.Object3D();
scene.add(mercuryPivot);
const mercuryOrbit = new Orbit(mercuryPivot, 0.008, mercuryDistance, scene); // 5x slower
const mercury = new planets(0.4, new THREE.Vector3(mercuryDistance, 0, 0), 'planet textures/mercury.png', new THREE.Vector3(0, 1, 0), 0.01);
mercuryPivot.add(mercury.getObject());

// Venus
const venusDistance = 4;
const venusPivot = new THREE.Object3D();
scene.add(venusPivot);
const venusOrbit = new Orbit(venusPivot, 0.004, venusDistance, scene); // 5x slower
const venus = new planets(0.8, new THREE.Vector3(venusDistance, 0, 0), 'planet textures/venus.png', new THREE.Vector3(0, 1, 0), 0.01);
venusPivot.add(venus.getObject());

// Earth
const earthDistance = 7;
const earthPivot = new THREE.Object3D();
scene.add(earthPivot);
const earthOrbit = new Orbit(earthPivot, 0.002, earthDistance, scene); // 5x slower
const earth = new planets(0.5, new THREE.Vector3(earthDistance, 0, 0), 'planet textures/earthDay.jpg', new THREE.Vector3(0, 1, 0), 0.01);
earthPivot.add(earth.getObject());

// Moon
const moonDistance = 2.5;
const moonSize = 0.27;
const moonTexture = 'planet textures/moon.png';
const moonPivot = new THREE.Object3D();
earth.getObject().add(moonPivot);
const moonOrbitSpeed = ((2 * Math.PI) / 27.3 / 60) / 5; // 5x slower
const moonOrbit = new Orbit(moonPivot, moonOrbitSpeed, moonDistance, scene);
const moon = new planets(moonSize, new THREE.Vector3(moonDistance, 0, 0), moonTexture, new THREE.Vector3(0, 1, 0), 0.01);
moonPivot.add(moon.getObject());

// Mars
const marsDistance = 10;
const marsPivot = new THREE.Object3D();
scene.add(marsPivot);
const marsOrbit = new Orbit(marsPivot, 0.0016, marsDistance, scene); // 5x slower
const mars = new planets(0.53, new THREE.Vector3(marsDistance, 0, 0), 'planet textures/mars.png', new THREE.Vector3(0, 1, 0), 0.01);
marsPivot.add(mars.getObject());

// Asteroid belt
const astrobelt = new Astrobelt(scene, {
    count: 300, // number of asteroids
    innerRadius: 12,
    outerRadius: 15,
    minY: -0.5,
    maxY: 0.5,
    speed: 0.0001 // slow
});

// Jupiter
const jupiterSize = 1.2;
const jupiterDistance = 17;
const jupiterPivot = new THREE.Object3D();
scene.add(jupiterPivot);
const jupiterOrbit = new Orbit(jupiterPivot, 0.0005, jupiterDistance, scene); // 5x slower
const jupiter = new planets(jupiterSize, new THREE.Vector3(jupiterDistance,
    0, 0), 'planet textures/jupiter.png', new THREE.Vector3(0, 1, 0), 0.01);
jupiterPivot.add(jupiter.getObject());

// Saturn
const saturnSize = 1.0;
const saturnDistance = 22;
const saturnPivot = new THREE.Object3D();
scene.add(saturnPivot);
const saturnOrbit = new Orbit(saturnPivot, 0.0004, saturnDistance, scene); // 5x slower
const saturn = new planets(saturnSize, new THREE.Vector3(saturnDistance
    , 0, 0), 'planet textures/saturn.png', new THREE.Vector3(0, 1, 0), 0.01);
saturnPivot.add(saturn.getObject());

// Uranus
const uranusSize = 0.8;
const uranusDistance = 27;
const uranusPivot = new THREE.Object3D();
scene.add(uranusPivot);
const uranusOrbit = new Orbit(uranusPivot, 0.0003, uranusDistance, scene); // 5x slower
const uranus = new planets(uranusSize, new THREE.Vector3(uranusDistance
    , 0, 0), 'planet textures/uranus.png', new THREE.Vector3(0, 1, 0), 0.01);
uranusPivot.add(uranus.getObject());

// Neptune
const neptuneSize = 0.7;
const neptuneDistance = 32;
const neptunePivot = new THREE.Object3D();
scene.add(neptunePivot);
const neptuneOrbit = new Orbit(neptunePivot, 0.0002, neptuneDistance, scene); // 5x slower
const neptune = new planets(neptuneSize, new THREE.Vector3(neptuneDistance
    , 0, 0), 'planet textures/neptune.png', new THREE.Vector3(0, 1, 0), 0.01);
neptunePivot.add(neptune.getObject());

// Shooting star
const shootingStarManager = new ShootingStarManager(scene);

function animate() {
    requestAnimationFrame(animate);

    // Update the rotations
    mercury.update();
    venus.update();
    earth.update();
    moon.update();
    mars.update();
    jupiter.update();
    sun.update();
    astrobelt.update();
    saturn.update();
    uranus.update();
    neptune.update();

    // Update orbits
    earthOrbit.update();
    moonOrbit.update();
    marsOrbit.update();
    venusOrbit.update();
    mercuryOrbit.update();
    jupiterOrbit.update();
    saturnOrbit.update();
    uranusOrbit.update();
    neptuneOrbit.update();

    // Make the sunLight always follow the sun
    sunLight.position.copy(sun.getObject().position);

    // Shooting star
    shootingStarManager.update();

    // Render the scene
    renderer.render(scene, camera);
}
animate();
