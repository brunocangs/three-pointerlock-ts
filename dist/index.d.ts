import { Object3D, EventDispatcher, Vector3, Euler, PerspectiveCamera, OrthographicCamera } from "three";
declare type Camera = PerspectiveCamera | OrthographicCamera;
declare class PointerLockControls extends EventDispatcher {
    domElement: HTMLElement;
    isLocked: boolean;
    camera: Camera;
    pitchObject: Object3D;
    yawObject: Object3D;
    PI_2: number;
    direction: Vector3;
    rotation: Euler;
    constructor(cam: Camera, domElement?: HTMLElement);
    onMouseMove: (event: MouseEvent) => void;
    onPointerlockChange: () => void;
    onPointerlockError: () => void;
    connect: () => void;
    disconnect: () => void;
    dispose: () => void;
    getObject: () => Object3D;
    getDirection: (v: Vector3) => Vector3;
    lock: () => void;
    unlock: () => void;
}
export default PointerLockControls;
