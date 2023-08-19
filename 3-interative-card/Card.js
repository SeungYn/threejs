import * as THREE from 'three';

export default class Card {
  constructor({ width, height, color }) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const meterial = new THREE.MeshStandardMaterial({ color });

    const mesh = new THREE.Mesh(geometry, meterial);

    this.mesh = mesh;
  }
}
