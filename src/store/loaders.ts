import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/draco/' );
gltfLoader.setDRACOLoader( dracoLoader );

export {gltfLoader}