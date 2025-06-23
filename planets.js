import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
export class planets {
    constructor(size, position, texturePath, rotationAxis = new THREE.Vector3(0, 1, 0), rotationSpeed = 0.01) {
        this.geometry = new THREE.SphereGeometry(size, 32, 32);
        this.material = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(texturePath)
        });
        
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