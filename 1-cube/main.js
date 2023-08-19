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

const controls = new OrbitControls(camera, renderer.domElement); // OrbitControls추가
controls.autoRotate = true; // 카메라를 자동으로 회전 시켜줌
// controls.autoRotateSpeed = 30; //속도 지정
controls.enableDamping = true; // 스케이팅 효과
controls.dampingFactor = 0.01; // 관성 제어
controls.enableZoom = true; // 카메라 줌 가능하게함
controls.enablePan = true; // 카메라를 좌우로 움직임
//controls.maxDistance = 50; // 최대 거리 설정
//controls.minDistance = 10; // 최소 거리 설정
//controls.maxPolarAngle = Math.PI / 2; // 카메라 회전 최대 각도
//controls.minPolarAngle = Math.PI / 2; // 카메라 회전 최소 각도

//const axisHelper = new THREE.AxesHelper(5); // x,y,z 축 생성

//scene.add(axisHelper);

const cubeGeometry = new THREE.IcosahedronGeometry(1); // 도형
const cubeBeterial = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  emissive: 0x111111,
  // transparent: true, // 투명 설정
  // opacity: 0.5, // 투명도 조절
  //visible: false,
  //wireframe: true, // 뼈대만 남게해줌
  // side: THREE.DoubleSide, // 어디를 렌더링할찌, 육면체 외부, 내부, 양면
}); // 재질

const cube = new THREE.Mesh(cubeGeometry, cubeBeterial); // 도형과, 재질을 받아 오브젝트 생성

const skeletonGeometry = new THREE.IcosahedronGeometry(2);
const skeletonMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  transparent: true,
  opacity: 0.2,
  color: 0xaaaaaa,
});

const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

scene.add(cube, skeleton);

camera.position.set(0, 0, 5);
// camera.lookAt(cube.position); // 물체의 포지션을 넣어주면 잘 보이게 카메라 포지션을 잡음

const directionalLight = new THREE.DirectionalLight('white', 1); // 직사광선 조명 (색, 강도)
directionalLight.position.set(-1, 2, 3);
scene.add(directionalLight);
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 그림자 없이 은은하게 빛나게 해주는 조명

// ambientLight.position.set(3, 2, 1);

// scene.add(ambientLight);

const clock = new THREE.Clock();

reunder();

function reunder() {
  //cube.rotation.x += THREE.MathUtils.degToRad(45);
  //cube.rotation.x = Date.now() / 1000; // 시간을 이용해서 어떤 프레임 환경에서 실행하든 같은 시간에 동일한 결과를 보게해줌
  // cube.rotation.x = clock.getElapsedTime(); // 클락인스턴스가 생성된 시점 이후 초단위 경과 시간
  // cube.rotation.y = clock.getElapsedTime();

  // skeleton.rotation.x = clock.getElapsedTime() * 1.5;
  // skeleton.rotation.y = clock.getElapsedTime() * 1.5;
  // cube.position.y = Math.sin(cube.rotation.x); // 위아래로 움직이게 해줌
  // cube.scale.x = Math.acos(cube.rotation.x); // 큐브 사이즈 변경

  //cube.rotation.z += 0.01;

  controls.update(); // controls도 카메라와 마찬가리로 변경시키면 update를 호출해야됨

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
