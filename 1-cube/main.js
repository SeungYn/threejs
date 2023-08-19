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
const meterial = new THREE.MeshBasicMaterial({ color: 'blue' }); // 재질

const cube = new THREE.Mesh(geometry, meterial); // 도형과, 재질을 받아 오브젝트 생성

scene.add(cube);

camera.position.set(3, 2, 5);
camera.lookAt(cube.position); // 물체의 포지션을 넣어주면 잘 보이게 카메라 포지션을 잡음

renderer.render(scene, camera);
