import * as THREE from 'three';

export default class Firework {
  constructor({ x, y }) {
    const count = 1000;

    const particlesGeometry = new THREE.BufferGeometry();

    const particles = [];

    for (let i = 0; i < count; i++) {
      const particle = new THREE.Vector3(x, y, 0);

      particles.push(particle);
    }

    // 백터를 이용하면 간단하게 위치를 넣고 geometry에 넣어줄 수 있음
    particlesGeometry.setFromPoints(particles);

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load('/particle.png');

    const particleMaterial = new THREE.PointsMaterial({
      size: 1,
      alphaMap: texture,
      transparent: true,
      depthWrite: false,
      color: new THREE.Color(Math.random(), Math.random(), Math.random()), // Color은 인자로 빨, 초, 파 를 받음
    });

    const points = new THREE.Points(particlesGeometry, particleMaterial);
    this.points = points;
  }
}
