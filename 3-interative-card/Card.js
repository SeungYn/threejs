import * as THREE from 'three';

export default class Card {
  constructor({ width, height, radius, color }) {
    const x = width / 2 - radius;
    const y = height / 2 - radius;

    const shape = new THREE.Shape();

    shape
      .absarc(x, y, radius, Math.PI / 2, 0, true)
      .lineTo(x + radius, -y)
      .absarc(x, -y, radius, 0, -Math.PI / 2, true)
      .lineTo(-x, -y - radius)
      .absarc(-x, -y, radius, -Math.PI / 2, Math.PI, true)
      .lineTo(-x - radius, y)
      .absarc(-x, y, radius, Math.PI, Math.PI / 2, true);

    // 	가장자리 둥근각과 두께를 표현하기 위한 geometry
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.01,
      bevelThickness: 0.1, // 모서리의 평평도를 나타냄
    });

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
