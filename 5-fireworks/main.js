import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 표면이 덜 매끄러운 현상을 고쳐줌
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene(); // 장면

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  500
);

camera.position.set(0, 0, 5);

const geometry = new THREE.BufferGeometry();

const count = 1000; // 정점 정보

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  positions[i * 3] = THREE.MathUtils.randFloatSpread(10); // threejs Random 유틸함수 인자의 반으로 나눈 값을 범위로 랜덤 값을 줌
  positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10);
  positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10);

  colors[i * 3] = Math.random();
  colors[i * 3 + 1] = Math.random();
  colors[i * 3 + 2] = Math.random();
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // position속성에 positions의 각 점을 넣어주는데 BufferAttribute를 이용하면 3값이 하나의 점이라는 것을 명시해야함
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  // 기존 material으로는 점의 크기를 조절할수 없을 PointsMaterial를 이용해야함
  color: 0xccaaff,
  size: 0.1,
  vertexColors: true, // 색을 랜덤하게 표현해주는 옵션
  //sizeAttenuation: false, // 원근에 따른 점의 크기를 무시해줌
});

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./public/particle.png');

material.alphaMap = texture; // 배경이 있는경우 alphaMap을 사용
material.transparent = true; // 배경을 투명하게 해주기
material.depthWrite = false; // 같은 위치에 표현하기 위한 것

new OrbitControls(camera, renderer.domElement);
const points = new THREE.Points(geometry, material);

scene.add(points);
reunder();

function reunder() {
  renderer.render(scene, camera);
  requestAnimationFrame(reunder);
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight; // 카메라 종횡비
  camera.updateProjectionMatrix(); // 브라우져에 적용시키려면 호출해야함
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

window.addEventListener('resize', handleResize);
