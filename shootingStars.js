import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js?module';

function randomColor() {
    // Bright pastel-like color
    return new THREE.Color().setHSL(Math.random(), 0.7, 0.7);
}

class ShootingStar {
    constructor() {
        // Random starting edge in a cube around origin
        const d = 12; // Distance from origin (solar system center)
        const axis = Math.floor(Math.random() * 3);
        const sign = Math.random() < 0.5 ? -1 : 1;
        let pos = [Math.random() * 2 * d - d, Math.random() * 2 * d - d, Math.random() * 2 * d - d];
        pos[axis] = sign * d;
        this.position = new THREE.Vector3(...pos);

        // Random direction toward (roughly) the center
        const toCenter = new THREE.Vector3(-pos[0], -pos[1], -pos[2]).normalize();
        const randomSpread = new THREE.Vector3(
            (Math.random()-0.5)*0.3,
            (Math.random()-0.5)*0.3,
            (Math.random()-0.5)*0.3
        );
        this.direction = toCenter.add(randomSpread).normalize();

        // Random speed and color
        this.speed = Math.random() * 0.12 + 0.07;
        this.color = randomColor();

        // Star mesh (small sphere)
        const geometry = new THREE.SphereGeometry(Math.random() * 0.07 + 0.04, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: this.color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);

        // Trail (using line with fading alpha)
        this.trailLength = 20; // number of segments
        this.trailPositions = [];
        for(let i=0; i<this.trailLength; i++) {
            this.trailPositions.push(this.position.clone());
        }
        const trailGeometry = new THREE.BufferGeometry().setFromPoints(this.trailPositions);
        const trailMaterial = new THREE.LineBasicMaterial({ color: this.color, transparent: true, opacity: 0.5 });
        this.trail = new THREE.Line(trailGeometry, trailMaterial);

        // To keep track of lifetime (for removal)
        this.lifetime = 0;
    }

    addToScene(scene) {
        scene.add(this.mesh);
        scene.add(this.trail);
    }

    removeFromScene(scene) {
        scene.remove(this.mesh);
        scene.remove(this.trail);
    }

    update() {
        // Move position
        this.position.addScaledVector(this.direction, this.speed);

        // Move mesh
        this.mesh.position.copy(this.position);

        // Update trail
        this.trailPositions.pop();
        this.trailPositions.unshift(this.position.clone());
        this.trail.geometry.setFromPoints(this.trailPositions);

        // Fade trail
        const opacity = Math.max(0.15, 0.6 - 0.025 * this.lifetime);
        this.trail.material.opacity = opacity;

        // Count lifetime
        this.lifetime++;
    }

    isOutOfBounds() {
        // Remove after it travels far from center or after some time
        return this.position.length() > 18 || this.lifetime > 160;
    }
}

// Manager for all shooting stars
export class ShootingStarManager {
    constructor(scene) {
        this.scene = scene;
        this.stars = [];
        this.spawnTimer = 0;
    }

    update() {
        // Randomly spawn new shooting stars
        if (Math.random() < 0.03 || this.stars.length < 2) {
            this.spawn();
        }

        // Update and remove old stars
        for(let i=this.stars.length-1; i>=0; i--) {
            const star = this.stars[i];
            star.update();
            if (star.isOutOfBounds()) {
                star.removeFromScene(this.scene);
                this.stars.splice(i, 1);
            }
        }
    }

    spawn() {
        const star = new ShootingStar();
        star.addToScene(this.scene);
        this.stars.push(star);
    }
}
