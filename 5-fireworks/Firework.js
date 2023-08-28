import * as THREE from 'three';

export default class Firework {
  constructor({ x, y }) {
    const count = 1000;
    const velocity = 10 + Math.random() * 10;

    const particlesGeometry = new THREE.BufferGeometry();

    this.particles = [];

    for (let i = 0; i < count; i++) {
      const particle = new THREE.Vector3(x, y, 0);

      // 정점을 생성할 때 각 정점을 다른 속도로 퍼트리기 위한 값을 저장
      particle.deltaX = THREE.MathUtils.randFloatSpread(velocity);
      particle.deltaY = THREE.MathUtils.randFloatSpread(velocity);
      particle.deltaZ = THREE.MathUtils.randFloatSpread(velocity);

      this.particles.push(particle);
    }

    // 백터를 이용하면 간단하게 위치를 넣고 geometry에 넣어줄 수 있음
    particlesGeometry.setFromPoints(this.particles);

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

  update() {
    const position = this.points.geometry.attributes.position;
    for (let i = 0; i < this.particles.length; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);

      // 저장해둔 값과 현재 좌표를 이용하여 퍼트려줌
      position.setX(i, x + this.particles[i].deltaX);
      position.setY(i, y + this.particles[i].deltaY);
      position.setZ(i, z + this.particles[i].deltaZ);
    }

    position.needsUpdate = true; // 이속성을 명시해야 좌표를 옮길 수 있음
  }
}
