import { degToRad } from "three/src/math/MathUtils.js";

export const phoneRotations = {
    r0: {
        x: 0,
        y: 0,
        z: 0
    },
    r1: {
        x: 0,
        y: Math.PI,
        z: 0
    },
    r2: {
        x: 0,
        y: degToRad(55),
        z: 0
    }
}