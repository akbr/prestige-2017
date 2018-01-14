import {PerspectiveCamera} from "three";

class Camera2D extends PerspectiveCamera {
  constructor (fov, aspect, near, far) {
    super(fov, aspect, near, far);
    
  }

  onResize () {
    let {clientWidth, clientHeight} = window;
    this.clientWidth = clientWidth;
    this.clientHeight = clientHeight;
    this.aspect = clientWidth / clientHeight;
    this.updateProjectionMatrix();
  }
}

let clientWidth = document.body.clientWidth;
let clientHeight = document.body.clientHeight;

function modCamera (camera, {drag$, scale$}, options = {}) {
  let {
    zoomSpeed = 0.03,
    minZoom = -Infinity,
    maxZoom = Infinity
  } = options;

  function getCurrentScale() {
    var vFOV = camera.fov * Math.PI / 180;
    var height = 2 * Math.tan( vFOV / 2 ) * camera.position.z;
    var currentScale = clientHeight / height;

    return currentScale;
  }

  function panByOffset({dx, dy}) {
    var currentScale = getCurrentScale();
    camera.position.x -= dx/currentScale;
    camera.position.y += dy/currentScale;
    update();
  }

  function update() {
    camera.loc = {
      x: camera.position.x,
      y: camera.position.y,
      scale: getCurrentScale()
    }
  }

  drag$.onValue(panByOffset);
  update();
}

module.exports = modCamera;


/**
function zoomTo(clientX, clientY, scaleMultiplier) {
  var currentScale = getCurrentScale();

  var dx = (clientX - clientWidth / 2) / currentScale;
  var dy = (clientY - clientHeight / 2) / currentScale;

  var newZ = camera.position.z * scaleMultiplier;

  if (newZ < minZoom || newZ > maxZoom) {
    return;
  }

  camera.position.z = newZ;
  camera.position.x -= (scaleMultiplier - 1) * dx;
  camera.position.y += (scaleMultiplier - 1) * dy;
}

function getScaleMultiplier(delta) {
  if (delta > 10) {
    delta = 10;
  } else if (delta < -10) {
    delta = -10;
  }

  return (1 + api.speed * delta);
}
**/