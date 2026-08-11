import type { Group, Object3D } from "three";

export interface Phone{
    body: Group,
    internal: Object3D,
    cover: Object3D,
    display: Object3D
}