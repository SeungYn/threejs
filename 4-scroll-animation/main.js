import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 표면이 덜 매끄러운 현상을 고쳐줌
  alpha: true,
  canvas: document.querySelector('canvas'), // js파일에서 canvas를 추가하는 것이아니라 html파일안에 있는 canvas에 추가시킬 수 있음
});

// renderer.setClearColor('#00ccff');
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene(); // 장면

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
