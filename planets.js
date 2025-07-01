import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
export class planets {
    constructor(size, position, texturePath, rotationAxis = new THREE.Vector3(0, 1, 0), rotationSpeed = 0.01, isSun = false) {
        this.geometry = new THREE.SphereGeometry(size, 32, 32);

        const texture = new THREE.TextureLoader().load(texturePath);

        if (isSun) {
            this.material = new THREE.MeshStandardMaterial({
                map: texture,            // Base color uses the sun texture
                emissive: 0xffffff,      // White light for glowing
                emissiveMap: texture,    // The texture itself emits light
                emissiveIntensity: 1     // Adjust as needed (try between 1-2)
            });
        } else {
            this.material = new THREE.MeshStandardMaterial({
                map: texture
            });
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.rotationAxis = rotationAxis.clone().normalize();
        this.rotationSpeed = rotationSpeed;
    }

    getObject() {
        return this.mesh;
    }

    update() {
        this.mesh.rotateOnAxis(this.rotationAxis, this.rotationSpeed);
    }
}