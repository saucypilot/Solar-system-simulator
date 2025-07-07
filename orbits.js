import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

export class Orbit {
    constructor(pivot, speed, radius = 1, scene = null) {
        this.pivot = pivot;
        this.speed = speed;
        this.radius = radius;
        this.scene = scene;
        this.orbitPath = null;

        if (scene) {
            this.createOrbitPath();
        }
    }

    update() {
        this.pivot.rotation.y += this.speed;
    }

createOrbitPath() {
    const segments = 128;
    const geometry = new THREE.BufferGeometry();
    const points = [];

    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(
            new THREE.Vector3(
                Math.cos(theta) * this.radius,
                0,
                Math.sin(theta) * this.radius
            )
        );
    }

    geometry.setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.orbitPath = new THREE.LineLoop(geometry, material);

    // If pivot's parent is the scene (no parent), add to scene.
    // If pivot has a parent (like the Moon), add to pivot's parent.
    if (this.pivot.parent) {
        this.pivot.parent.add(this.orbitPath);
    } else if (this.scene) {
        this.scene.add(this.orbitPath);
    }
}


}

