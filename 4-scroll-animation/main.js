import * as THREE from 'three';

window.addEventListener('load', () => {
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

  camera.position.set(0, 25, 150);

  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
  const waveMaterial = new THREE.MeshStandardMaterial({
    //wireframe: true,
    color: '#00ffff',
  });

  const wave = new THREE.Mesh(waveGeometry, waveMaterial);
  wave.rotation.x = -Math.PI / 2;
  scene.add(wave);

  const pointLight = new THREE.PointLight('#ffffff', 5, 1000, 0.1);
  pointLight.position.set(15, 15, 15);
  scene.add(pointLight);

  //console.log(waveGeometry.attributes.position); // 와이어 프레임의 각 점들의 좌표값이x,y,z, 순으로 반복되어 나타나 있음

  const waveHeight = 2.5;
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
    waveGeometry.attributes.position.setZ(i, z);
  }
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
});
