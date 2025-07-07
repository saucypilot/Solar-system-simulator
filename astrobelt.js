import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

export class Astrobelt {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.asteroids = [];
        this.count = options.count || 200;
        this.innerRadius = options.innerRadius || 12;
        this.outerRadius = options.outerRadius || 15;
        this.minY = options.minY || -0.5;
        this.maxY = options.maxY || 0.5;
        this.speed = options.speed || 0.0002; // very slow
        this.group = new THREE.Group();

        // Populate asteroids
        for (let i = 0; i < this.count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = this.innerRadius + Math.random() * (this.outerRadius - this.innerRadius);
            const y = this.minY + Math.random() * (this.maxY - this.minY);
            const size = Math.random() * 0.09 + 0.05;

            const geometry = new THREE.SphereGeometry(size, 6, 6);
            const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
            const asteroid = new THREE.Mesh(geometry, material);

            asteroid.userData = { angle, radius, y, speed: this.speed * (0.8 + Math.random()*0.4) };
            asteroid.position.set(
                Math.cos(angle) * radius,
                y,
                Math.sin(angle) * radius
            );
            this.group.add(asteroid);
            this.asteroids.push(asteroid);
        }

        scene.add(this.group);
    }

    update() {
        // Animate all asteroids slowly
        this.asteroids.forEach(asteroid => {
            asteroid.userData.angle += asteroid.userData.speed;
            asteroid.position.x = Math.cos(asteroid.userData.angle) * asteroid.userData.radius;
            asteroid.position.z = Math.sin(asteroid.userData.angle) * asteroid.userData.radius;
        });
    }
}
