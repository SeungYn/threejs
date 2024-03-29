import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

window.addEventListener('load', async () => {
  // 스크롤 플러그인 등록;
  gsap.registerPlugin(ScrollTrigger);

  const params = {
    waveColor: '#00ffff',
    backgroundColor: '#ffffff',
    fogColor: '#f0f0f0',
  };

  const gui = new GUI();
  gui.hide();
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 표면이 덜 매끄러운 현상을 고쳐줌
    alpha: true,
    canvas: document.querySelector('canvas'), // js파일에서 canvas를 추가하는 것이아니라 html파일안에 있는 canvas에 추가시킬 수 있음
  });

  renderer.shadowMap.enabled = true;
  // renderer.setClearColor('#00ccff');
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene(); // 장면
  //scene.fog = new THREE.FogExp2(0xf0f0f0, 0.001); // 안개를 카메라 기준으로 자연스럽게 해줌
  scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500);

  // gui.add(scene.fog, 'near').min(0).max(100).step(0.1);

  // gui.add(scene.fog, 'far').min(100).max(500).step(0.1);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.set(0, 25, 150);

  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
  const waveMaterial = new THREE.MeshStandardMaterial({
    //wireframe: true,
    color: params.waveColor,
  });

  const wave = new THREE.Mesh(waveGeometry, waveMaterial);
  wave.receiveShadow = true;
  wave.rotation.x = -Math.PI / 2;
  scene.add(wave);

  const gltfLoader = new GLTFLoader();

  const gltf = await gltfLoader.loadAsync('./model/whale/scene.gltf');

  const whale = gltf.scene;

  whale.castShadow = true;
  whale.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  whale.update = function () {
    const elapsedTime = clock.getElapsedTime();

    whale.position.y = 20 + Math.sin(elapsedTime * 3);
  };

  whale.scale.set(40, 40, 40);

  scene.add(whale);

  const pointLight = new THREE.PointLight('#ffffff', 4, 1000, 0.1);

  // 그림자 추가하기
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1000;
  pointLight.shadow.mapSize.height = 1000;
  pointLight.shadow.radius = 1;

  pointLight.position.set(40, 40, 40);
  scene.add(pointLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 10;

  directionalLight.position.set(40, 40, 40);
  scene.add(directionalLight);

  //console.log(waveGeometry.attributes.position); // 와이어 프레임의 각 점들의 좌표값이x,y,z, 순으로 반복되어 나타나 있음

  const waveHeight = 2.5;
  const initialZPositions = [];
  // z 값을 다르게 해주는 1 번째 방법
  // for (let i = 0; i < waveGeometry.attributes.position.array.length; i += 3) {
  //   // z값을 다르게 함으로써 다른 파도를 만드는 작업
  //   waveGeometry.attributes.position.array[i + 2] +=
  //     (Math.random() - 0.5) * waveHeight;
  // }

  for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
    // z값을 다르게 함으로써 다른 파도를 만드는 작업

    const z =
      waveGeometry.attributes.position.getZ(i) +
      (Math.random() - 0.5) * waveHeight;
    initialZPositions.push(z);
    waveGeometry.attributes.position.setZ(i, z);
  }

  //파도를 올라가게 하는 함수
  wave.update = () => {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
      const z =
        initialZPositions[i] + Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;
      waveGeometry.attributes.position.setZ(i, z);
    }

    //변경이 바로 적용되도록 하는 속성
    waveGeometry.attributes.position.needsUpdate = true;
  };

  // 사용자별 동일한 화면을 보여주기 위한 clock
  const clock = new THREE.Clock();

  reunder();

  function reunder() {
    wave.update();
    whale.update();
    renderer.render(scene, camera);

    camera.lookAt(whale.position);

    requestAnimationFrame(reunder);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight; // 카메라 종횡비
    camera.updateProjectionMatrix(); // 브라우져에 적용시키려면 호출해야함
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', handleResize);

  // gsap.to(params, {
  //   waveColor: '#4268ff',
  //   onUpdate: () => {
  //     // 지정된 속성이 변환면 콜백을 호출
  //     waveMaterial.color = new THREE.Color(params.waveColor);
  //   },
  //   scrollTrigger: {
  //     // 스크롤 영역 지정
  //     trigger: '.wrapper',
  //     start: 'top top', // 타켓의 시작 위치, 기준의 시작위치
  //     markers: true,
  //     scrub: true, // 스크롤 영역에 따라 천천히 변함
  //   },
  // });

  // gsap.to(params, {
  //   backgroundColor: '#2a2a2a',
  //   onUpdate: () => {
  //     // 지정된 속성이 변환면 콜백을 호출
  //     scene.background = new THREE.Color(params.backgroundColor);
  //   },
  //   scrollTrigger: {
  //     // 스크롤 영역 지정
  //     trigger: '.wrapper',
  //     start: 'top top', // 타켓의 시작 위치, 기준의 시작위치
  //     markers: true,
  //     scrub: true, // 스크롤 영역에 따라 천천히 변함
  //   },
  // });

  // gsap 타임 라인을 통해 애니메이션을 동시에 적용시키거나 따로 적용 시킬수 있음
  const t1 = gsap.timeline({
    scrollTrigger: {
      // 스크롤 영역 지정
      trigger: '.wrapper',
      start: 'top top', // 타켓의 시작 위치, 기준의 시작위치
      markers: true,
      scrub: true, // 스크롤 영역에 따라 천천히 변함
    },
  });

  t1.to(params, {
    waveColor: '#4268ff',
    onUpdate: () => {
      // 지정된 속성이 변환면 콜백을 호출
      waveMaterial.color = new THREE.Color(params.waveColor);
    },
  })
    .to(params, {
      backgroundColor: '#2a2a2a',
      onUpdate: () => {
        // 지정된 속성이 변환면 콜백을 호출
        scene.background = new THREE.Color(params.backgroundColor);
      },
    })
    .to(
      params,
      {
        fogColor: '#2f2f2f',
        onUpdate: () => {
          scene.fog.color = new THREE.Color(params.fogColor);
        },
      },
      '<' // 3번째 파라미터로 애니메이션 시작시간 설정
    );
});
