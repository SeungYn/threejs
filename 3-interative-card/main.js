import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Card from './Card';
import { GUI } from 'lil-gui';
import { gsap } from 'gsap';

const gui = new GUI();

// 색상
const COLORS = ['#ff6e6e', '#31c0c1', '#006fff', '#ffd732'];

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 표면이 덜 매끄러운 현상을 고쳐줌
  alpha: true, // 배경을 투명하게 해줌
});

// renderer.setClearAlpha(0); // 배경 투명도 설정
// renderer.setClearColor();; // 배경 색 설정
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene(); // 장면

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  500
);

camera.position.set(0, 0, 25);

const controls = new OrbitControls(camera, renderer.domElement);

controls.autoRotate = true;
controls.autoRotateSpeed = 2.5;
controls.rotateSpeed = 2.5;
controls.enableDamping = true;
controls.enableZoom = false;

const card = new Card({
  width: 10,
  height: 15.8,
  radius: 0.5,
  color: COLORS[0],
});

card.mesh.rotation.z = Math.PI * 0.1;

scene.add(card.mesh);

const cardFolder = gui.addFolder('Card');

cardFolder
  .add(card.mesh.material, 'roughness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('material.roughness');

cardFolder
  .add(card.mesh.material, 'metalness')
  .min(0)
  .max(1)
  .step(0.01)
  .name('material.metalness');

const ambientLight = new THREE.AmbientLight('white', 0.8);
ambientLight.position.set(-5, -5, -5);
scene.add(ambientLight);

//애니메이션 추가 인자로 원하는 속성과 적용시킬 속성 명을 객체로 넣음
gsap.to(card.mesh.rotation, {
  y: -Math.PI * 4,
  duration: 2.5,
  ease: 'back.out(4)',
});

// 직사 광선 추가

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
const directionalLight2 = directionalLight1.clone();

directionalLight1.position.set(1, 1, 3);
directionalLight2.position.set(-1, 1, -3);
scene.add(directionalLight1, directionalLight2);

reunder();

function reunder() {
  controls.update(); // 컨트롤러는 update를 매 프레임마다 호출해야함
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

const container = document.querySelector('.container');
COLORS.forEach((color) => {
  const button = document.createElement('button');

  button.addEventListener('click', () => {
    card.mesh.material.color = new THREE.Color(color); // 속성으로 변환시 THREE.Color 인스턴스로 색상을 변경시킬 수 있음
    gsap.to(card.mesh.rotation, {
      y: card.mesh.rotation.y - Math.PI / 2,
      duration: 1,
      ease: 'back.out(4)',
    });
  });

  button.style.backgroundColor = color;
  container.appendChild(button);
});
