import * as THREE from 'three';
import { DRACOLoader, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const canvas = document.querySelector('canvas.webgl') as HTMLElement;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 100);
camera.position.set(0, 4, 2);

const ambientLight = new THREE.AmbientLight(0xffffff, 3);

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/draco/' );
gltfLoader.setDRACOLoader( dracoLoader );
const start = Date.now();
const model = await gltfLoader.loadAsync('/models/phone.glb');
const end = Date.now() - start;
(document.querySelector('#loading-time') as HTMLElement)!.innerHTML = (end / 1000).toString() + 's';

console.log(model);


const renderer = new THREE.WebGLRenderer({ canvas })
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NoToneMapping;

const controls = new OrbitControls(camera, renderer.domElement);


scene.add(camera, ambientLight, model.scene);


function animate(){

  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}


animate()


