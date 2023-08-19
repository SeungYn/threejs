import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 표면이 덜 매끄러운 현상을 고쳐줌
  alpha: true, // 배경을 투명하게 해줌
});

// renderer.setClearAlpha(0); // 배경 투명도 설정
// renderer.setClearColor();; // 배경 색 설정
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene(); // 장면
scene.background = new THREE.Color(0xffaa00); // 신에 배경을 넣어줄수 있음
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  500
);

camera.position.set(0, 0, 5);

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
