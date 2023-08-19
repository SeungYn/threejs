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
const meterial = new THREE.MeshStandardMaterial({
  color: 'blue',
  // transparent: true, // 투명 설정
  // opacity: 0.5, // 투명도 조절
  //visible: false,
  //wireframe: true, // 뼈대만 남게해줌
  // side: THREE.DoubleSide, // 어디를 렌더링할찌, 육면체 외부, 내부, 양면
}); // 재질

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

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight; // 카메라 종횡비
  camera.updateProjectionMatrix(); // 브라우져에 적용시키려면 호출해야함
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

window.addEventListener('resize', handleResize);
