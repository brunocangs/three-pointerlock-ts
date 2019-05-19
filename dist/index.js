"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
var PointerLockControls = /** @class */ (function (_super) {
    __extends(PointerLockControls, _super);
    function PointerLockControls(cam, domElement) {
        var _this = _super.call(this) || this;
        _this.onMouseMove = function (event) {
            if (_this.isLocked === false)
                return;
            var movementX = 
            // @ts-ignore
            event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = 
            // @ts-ignore
            event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            _this.yawObject.rotation.y -= movementX * 0.002;
            _this.pitchObject.rotation.x -= movementY * 0.002;
            _this.pitchObject.rotation.x = Math.max(-_this.PI_2, Math.min(_this.PI_2, _this.pitchObject.rotation.x));
        };
        _this.onPointerlockChange = function () {
            if (document.pointerLockElement === _this.domElement) {
                _this.dispatchEvent({ type: "lock" });
                _this.isLocked = true;
            }
            else {
                _this.dispatchEvent({ type: "unlock" });
                _this.isLocked = false;
            }
        };
        _this.onPointerlockError = function () {
            console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
        };
        _this.connect = function () {
            document.addEventListener("mousemove", _this.onMouseMove, false);
            document.addEventListener("pointerlockchange", _this.onPointerlockChange, false);
            document.addEventListener("pointerlockerror", _this.onPointerlockError, false);
        };
        _this.disconnect = function () {
            document.removeEventListener("mousemove", _this.onMouseMove, false);
            document.removeEventListener("pointerlockchange", _this.onPointerlockChange, false);
            document.removeEventListener("pointerlockerror", _this.onPointerlockError, false);
        };
        _this.dispose = function () {
            _this.disconnect();
        };
        _this.getObject = function () {
            return _this.yawObject;
        };
        _this.getDirection = function (v) {
            _this.rotation.set(_this.pitchObject.rotation.x, _this.yawObject.rotation.y, 0);
            v.copy(_this.direction).applyEuler(_this.rotation);
            return v;
        };
        _this.lock = function () {
            _this.domElement.requestPointerLock();
        };
        _this.unlock = function () {
            document.exitPointerLock();
        };
        _this.domElement = domElement || document.body;
        _this.isLocked = false;
        _this.pitchObject = new three_1.Object3D();
        _this.yawObject = new three_1.Object3D();
        _this.PI_2 = Math.PI / 2;
        _this.camera = cam;
        _this.direction = new three_1.Vector3(0, 0, -1);
        _this.rotation = new three_1.Euler(0, 0, 0, "YXZ");
        var _a = _this, camera = _a.camera, pitchObject = _a.pitchObject, yawObject = _a.yawObject;
        camera.rotation.set(0, 0, 0);
        pitchObject.add(camera);
        yawObject.position.y = 0;
        yawObject.add(pitchObject);
        _this.connect();
        return _this;
    }
    return PointerLockControls;
}(three_1.EventDispatcher));
exports.default = PointerLockControls;
