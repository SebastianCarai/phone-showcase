import { AmbientLight, Mesh, MeshStandardMaterial, NoToneMapping, PCFShadowMap, PlaneGeometry, SpotLight, SRGBColorSpace } from "three";
import { phone, sizes, three } from "../store/global-state";
import { gltfLoader } from "../store/loaders";


export async function setupScene(){
    three.camera.position.set(0, 1.25, 4);

    const plane = new Mesh(
        new PlaneGeometry(100, 100),
        new MeshStandardMaterial({
            color: 0x1c1b1c,
            roughness: 0.8
        })
    );
    plane.position.z = -3;

    // Load model and calculate loading time
    const start = Date.now();
    const model = await gltfLoader.loadAsync('/models/phone_2.glb');
    const end = Date.now() - start;
    (document.querySelector('#loading-time') as HTMLElement)!.innerHTML = (end / 1000).toString() + 's';

    phone.body = model.scene;
    phone.internal = phone.body.getObjectByName('internal')!;
    phone.cover = phone.body.getObjectByName('cover')!;
    phone.display = phone.body.getObjectByName('screen')!;


    /**
     * Lights
     */
    const ambientLight = new AmbientLight(0xffffff, 3);
    const leftSpotLight = new SpotLight(0xffffff, 3, 10, Math.PI / 6, .2, 0.3);
    const rightSpotLight = new SpotLight(0xffffff, 3, 10, Math.PI / 6, .2, 0.3);
    leftSpotLight.position.set(-2, 1.5, 5);
    rightSpotLight.position.set(2, 1.5, 5);
    leftSpotLight.lookAt(phone.body.position);
    rightSpotLight.lookAt(phone.body.position);

    /**
     * Renderer
     */
    three.renderer.outputColorSpace = SRGBColorSpace;
    three.renderer.shadowMap.enabled = true;
    three.renderer.shadowMap.type = PCFShadowMap;
    three.renderer.setSize(sizes.width, sizes.height);
    three.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    three.renderer.toneMapping = NoToneMapping;

    three.scene.add(three.camera, ambientLight, phone.body, leftSpotLight, rightSpotLight, plane);

    window.onresize = () => resizeCanvas();
}


function resizeCanvas(){
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    three.camera!.aspect = sizes.width / sizes.height;
    three.camera!.updateProjectionMatrix();

    // Update renderer
    three.renderer!.setSize(sizes.width, sizes.height);
    three.renderer!.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}