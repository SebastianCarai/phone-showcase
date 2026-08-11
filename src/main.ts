import gsap from 'gsap';
import { phone, three } from './store/global-state';
import { ScrollTrigger } from 'gsap/all';
import { setupScene } from './utils/setup';
import { Quaternion, Vector3 } from 'three';
import { phoneRotations } from './store/rotations';

await setupScene();


gsap.registerPlugin(ScrollTrigger);


setTimeout(() => {rotateBody('r1')}, 500);
setTimeout(() => {rotateBody('r2')}, 2000);

function rotateBody(r: 'r1' | 'r2'){
  const startQuaternion = phone.body.quaternion.clone();

  const targetQuaternion = new Quaternion();
  targetQuaternion.setFromAxisAngle(new Vector3(0, 1, 0), phoneRotations[r].y);


  const progress = {value : 0};
  gsap.to(progress, {
    value: 1,
    duration: 1,
    ease: 'power4.out',

    onUpdate: () => {
      phone.body.quaternion.copy(startQuaternion)
      .slerp(targetQuaternion, progress.value)
      
    }
  })
}

function animate(){
  three.renderer.render(three.scene, three.camera);

  requestAnimationFrame(animate);
}


animate()


