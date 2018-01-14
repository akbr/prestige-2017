import {Frustum, Matrix4} from "three";

// Manually scan objects in camera.
// Adapted from: https://github.com/mrdoob/three.js/issues/9029
module.exports = function manualCull (objects, camera) {
  let frustum = new Frustum();
  let matrix = new Matrix4();
  
  camera.matrixWorldInverse.getInverse(camera.matrixWorld);
  matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromMatrix(matrix);

  for (var i = 0, l = objects.length; i < l; i++) {
    let object = objects[i];
    object.visible = frustum.intersectsObject(object);
  }
}