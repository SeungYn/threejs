import * as THREE from 'three';

const scene = new THREE.Scene();
// 첫 번째 파리미터 시야 범위 각도
// 두 번째 파라미터 비율
// 세,네 번째 절단면인데 near 보다 가깜고 far보다 더 멀리있으면 렌더링 되지 않음
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 'blue' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
