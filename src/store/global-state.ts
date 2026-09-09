import { Group, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import type { Phone } from "../types/types";

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const canvas = document.querySelector('canvas.webgl') as HTMLElement;

export const three = {
    scene: new Scene(),
    camera: new PerspectiveCamera(45, sizes.width / sizes.height, 1, 100),
    renderer: new WebGLRenderer({canvas})
}


export const phone : Phone = {
    body: new Group(),
    internal: new Object3D(),
    cover: new Object3D(),
    display: new Object3D(),
}


export const state = {
    index: 0,
    maxRotations: 2,
    isAnimating: false
}