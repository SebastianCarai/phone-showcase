import gsap from 'gsap';
import * as THREE from 'three';
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const canvas = document.querySelector('canvas.webgl') as HTMLElement;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 100);
// camera.lookAt(0, 0, 0);
// const quaternion = new THREE.Quaternion();
// quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0).normalize(), -Math.PI/2);
// camera.quaternion.multiply(quaternion);
camera.position.set(0, 1.25, 4);

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
const leftSpotLight = new THREE.SpotLight(0xffffff, 3, 10, Math.PI / 6, .2, 0.3)
const rightSpotLight = new THREE.SpotLight(0xffffff, 3, 10, Math.PI / 6, .2, 0.3)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: 0x1c1b1c,
    roughness: 0.8
  })
);
plane.position.z = -3;



const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/draco/' );
gltfLoader.setDRACOLoader( dracoLoader );
const start = Date.now();
const model = await gltfLoader.loadAsync('/models/phone.glb');
const mobile = model.scene;
const end = Date.now() - start;
(document.querySelector('#loading-time') as HTMLElement)!.innerHTML = (end / 1000).toString() + 's';
leftSpotLight.position.set(-2, 1.5, 5);
rightSpotLight.position.set(2, 1.5, 5);
leftSpotLight.lookAt(mobile.position)
rightSpotLight.lookAt(mobile.position)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NoToneMapping;


// const controls = new OrbitControls(camera, renderer.domElement);
scene.add(camera, ambientLight, mobile, leftSpotLight,
rightSpotLight, plane);

setTimeout(() => {
  gsap.to(mobile.rotation, {
    y: Math.PI / 2,
    duration: 1,
    ease: 'power3.out'
  })
}, 2000);


function animate(){

  // controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}


animate()


