import * as THREE from 'three';

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

const geometry = new THREE.BoxGeometry(2, 2, 2); // 도형
const meterial = new THREE.MeshStandardMaterial({ color: 'blue' }); // 재질

const cube = new THREE.Mesh(geometry, meterial); // 도형과, 재질을 받아 오브젝트 생성

scene.add(cube);

camera.position.set(3, 2, 5);
camera.lookAt(cube.position); // 물체의 포지션을 넣어주면 잘 보이게 카메라 포지션을 잡음

const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1); // 직사광선 조명 (색, 강도)
directionalLight.position.set(-1, 2, 3);
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 그림자 없이 은은하게 빛나게 해주는 조명

ambientLight.position.set(3, 2, 1);

scene.add(ambientLight);
renderer.render(scene, camera);
