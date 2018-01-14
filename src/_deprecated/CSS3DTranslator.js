const DEG2RAD = 0.017453292519943295;
var degToRad = (d) => d * DEG2RAD;
var epsilon = (v) => Math.abs(v) < Number.EPSILON ? 0 : v;

var getCameraCSSMatrix = (matrix) => {
  var elements = matrix.elements;
  return 'matrix3d(' +
    epsilon( elements[ 0 ] ) + ',' +
    epsilon( - elements[ 1 ] ) + ',' +
    epsilon( elements[ 2 ] ) + ',' +
    epsilon( elements[ 3 ] ) + ',' +
    epsilon( elements[ 4 ] ) + ',' +
    epsilon( - elements[ 5 ] ) + ',' +
    epsilon( elements[ 6 ] ) + ',' +
    epsilon( elements[ 7 ] ) + ',' +
    epsilon( elements[ 8 ] ) + ',' +
    epsilon( - elements[ 9 ] ) + ',' +
    epsilon( elements[ 10 ] ) + ',' +
    epsilon( elements[ 11 ] ) + ',' +
    epsilon( elements[ 12 ] ) + ',' +
    epsilon( - elements[ 13 ] ) + ',' +
    epsilon( elements[ 14 ] ) + ',' +
    epsilon( elements[ 15 ] ) +
  ')';
};

var getObjectCSSMatrix = (matrix) => {
  var elements = matrix.elements;
  return 'translate3d(-50%,-50%,0) matrix3d(' +
    epsilon( elements[ 0 ] ) + ',' +
    epsilon( elements[ 1 ] ) + ',' +
    epsilon( elements[ 2 ] ) + ',' +
    epsilon( elements[ 3 ] ) + ',' +
    epsilon( - elements[ 4 ] ) + ',' +
    epsilon( - elements[ 5 ] ) + ',' +
    epsilon( - elements[ 6 ] ) + ',' +
    epsilon( - elements[ 7 ] ) + ',' +
    epsilon( elements[ 8 ] ) + ',' +
    epsilon( elements[ 9 ] ) + ',' +
    epsilon( elements[ 10 ] ) + ',' +
    epsilon( elements[ 11 ] ) + ',' +
    epsilon( elements[ 12 ] ) + ',' +
    epsilon( elements[ 13 ] ) + ',' +
    epsilon( elements[ 14 ] ) + ',' +
    epsilon( elements[ 15 ] ) +
  ')';
};

function renderObject (obj, camera, manifest) {
  let {userData} = obj;

  if (userData.dom === true) {
    userData.transform = getObjectCSSMatrix(obj.matrixWorld);
    userData.key = obj.uuid;
    manifest.push(userData);
  }

  for (var i = 0, l = obj.children.length; i < l; i ++ ) {
    renderObject( obj.children[ i ], camera, manifest);
  }
}

module.exports = function translateToCSS (scene, camera) {
  let width = window.innerWidth;
  let height = window.innerHeight;

  let fov = 0.5 / Math.tan(degToRad(camera.getEffectiveFOV() * 0.5)) * height;

  scene.updateMatrixWorld();
  if (camera.parent === null) {
    camera.updateMatrixWorld();
  }
  camera.matrixWorldInverse.getInverse(camera.matrixWorld);

  let cameraTransform = "translate3d(0,0," + fov + "px)" + getCameraCSSMatrix( camera.matrixWorldInverse ) +
    " translate3d(" + width/2 + "px," + height/2 + "px, 0)";

  let manifest = [];
  renderObject(scene, camera, manifest);

  return {
    width,            // container.style.width, cameraEl.style.width
    height,           // container.style.height, cameraEl.style.height
    fov,              // container.style.perspective
    cameraTransform,  // cameraElement.style.transform
    manifest,          // ...
    mapScale: camera.mapScale
  }
}