import * as THREE from 'three';

export default class Card {
  constructor({ width, height, color }) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const meterial = new THREE.MeshStandardMaterial({
      color,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, meterial);

    this.mesh = mesh;
  }
}
