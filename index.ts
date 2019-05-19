import {
  Object3D,
  EventDispatcher,
  Vector3,
  Euler,
  PerspectiveCamera,
  OrthographicCamera
} from "three";
type Camera = PerspectiveCamera | OrthographicCamera;
class PointerLockControls extends EventDispatcher {
  domElement: HTMLElement;
  isLocked: boolean;
  camera: Camera;
  pitchObject: Object3D;
  yawObject: Object3D;
  PI_2: number;
  direction: Vector3;
  rotation: Euler;
  constructor(cam: Camera, domElement?: HTMLElement) {
    super();
    this.domElement = domElement || document.body;
    this.isLocked = false;
    this.pitchObject = new Object3D();
    this.yawObject = new Object3D();
    this.PI_2 = Math.PI / 2;
    this.camera = cam;
    this.direction = new Vector3(0, 0, -1);
    this.rotation = new Euler(0, 0, 0, "YXZ");

    const { camera, pitchObject, yawObject } = this;
    camera.rotation.set(0, 0, 0);
    pitchObject.add(camera);
    yawObject.position.y = 0;
    yawObject.add(pitchObject);
    this.connect();
  }
  onMouseMove = (event: MouseEvent) => {
    if (this.isLocked === false) return;

    var movementX =
      // @ts-ignore
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY =
      // @ts-ignore
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    this.yawObject.rotation.y -= movementX * 0.002;
    this.pitchObject.rotation.x -= movementY * 0.002;

    this.pitchObject.rotation.x = Math.max(
      -this.PI_2,
      Math.min(this.PI_2, this.pitchObject.rotation.x)
    );
  };
  onPointerlockChange = () => {
    if (document.pointerLockElement === this.domElement) {
      this.dispatchEvent({ type: "lock" });
      this.isLocked = true;
    } else {
      this.dispatchEvent({ type: "unlock" });
      this.isLocked = false;
    }
  };
  onPointerlockError = () => {
    console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
  };
  connect = () => {
    document.addEventListener("mousemove", this.onMouseMove, false);
    document.addEventListener(
      "pointerlockchange",
      this.onPointerlockChange,
      false
    );
    document.addEventListener(
      "pointerlockerror",
      this.onPointerlockError,
      false
    );
  };
  disconnect = () => {
    document.removeEventListener("mousemove", this.onMouseMove, false);
    document.removeEventListener(
      "pointerlockchange",
      this.onPointerlockChange,
      false
    );
    document.removeEventListener(
      "pointerlockerror",
      this.onPointerlockError,
      false
    );
  };
  dispose = () => {
    this.disconnect();
  };
  getObject = () => {
    return this.yawObject;
  };
  getDirection = (v: Vector3) => {
    this.rotation.set(
      this.pitchObject.rotation.x,
      this.yawObject.rotation.y,
      0
    );
    v.copy(this.direction).applyEuler(this.rotation);
    return v;
  };
  lock = () => {
    this.domElement.requestPointerLock();
  };
  unlock = () => {
    document.exitPointerLock();
  };
}

export default PointerLockControls;
