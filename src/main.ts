import gsap from 'gsap';
import { phone, state, three } from './store/global-state';
import { Observer } from 'gsap/all';
import { setupScene } from './utils/setup';
import { Quaternion, Vector3 } from 'three';
import { phoneRotations } from './store/rotations';

await setupScene();


gsap.registerPlugin(Observer);

// function returnAnimationIndex(){
  
// }

Observer.create({
  target: window,
  onDown: async () => {
    if(state.isAnimating) return;

    state.isAnimating = true;

    if(state.index < state.maxRotations){
      state.index++;
      const r : 'r0' | 'r1' | 'r2' = `r${state.index}` as 'r0' | 'r1' | 'r2';
      rotateBody(r);
    }
  },
  onUp: () => {
    if(state.isAnimating) return;

    state.isAnimating = true;
    
    if(state.index > 0){
      state.index--;
      const r : 'r0' | 'r1' | 'r2' = `r${state.index}` as 'r0' | 'r1' | 'r2';
      rotateBody(r);
    }
  },
  onStop: () => {
    state.isAnimating = false;
  },
  onChange: (self) => {
    // self.event.type will be 'wheel', 'touchstart', 'touchmove', etc.
    if (self.event.type === "wheel") {
      (document.querySelector('#loading-time') as HTMLElement)!.innerHTML = 'mouse'
    } else if (self.event.type.includes("touch")) {
      (document.querySelector('#loading-time') as HTMLElement)!.innerHTML = 'touch'
    }
  }
})

async function rotateBody(r: 'r0' | 'r1' | 'r2'){
  const startQuaternion = phone.body.quaternion.clone();

  const targetQuaternion = new Quaternion();
  targetQuaternion.setFromAxisAngle(new Vector3(0, 1, 0), phoneRotations[r].y);


  const progress = {value : 0};
  await gsap.to(progress, {
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


