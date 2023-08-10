<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  import Stats from 'three/examples/jsm/libs/stats.module';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let stats: Stats;

  onMount(() => {
    init();
    animate();
  });

  const init = async () => {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10000));

    let light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementById('svelte-three-container')
      .appendChild(renderer.domElement);
    camera.position.z = 5;

    stats = Stats();
    document.body.appendChild(stats.dom);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new STLLoader();

    const loadGeometry = async (url: string): Promise<THREE.BufferGeometry> => {
      return new Promise((resolve, reject) => {
        loader.load(url, (geometry: THREE.BufferGeometry) => {
          resolve(geometry);
        });
      });
    };

    const bufferGeometry: THREE.BufferGeometry = await loadGeometry(
      'src/assets/mesh.stl'
    );

    bufferGeometry.translate(0, 0, 0);

    console.log(bufferGeometry);

    const positionAttribute = bufferGeometry.attributes
      .position as THREE.BufferAttribute;
    const positions = positionAttribute.array;
    console.log(positions);
    const numVertices = positions.length / 3;
    console.log(numVertices);

    let verticies = [];

    for (let i = 0; i < numVertices; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];
      verticies.push({ x, y, z });
    }

    console.log(verticies);

    let mesh = new THREE.Mesh(
      bufferGeometry,
      new THREE.MeshPhongMaterial({
        color: 0xff5533,
        specular: 0x111111,
        shininess: 200,
      })
    );
    scene.add(mesh);
  };

  const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    stats.update();
  };
</script>

<div id="svelte-three-container" />

<style>
  #svelte-three-container {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
  }
</style>
