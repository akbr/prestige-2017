import {Frustum, Matrix4} from "three";

// Manually scan objects in camera.
// Adapted from: https://github.com/mrdoob/three.js/issues/9029

var frustum = new Frustum();
var matrix = new Matrix4();

function manualCull (objects, camera) {  
  camera.matrixWorldInverse.getInverse(camera.matrixWorld);
  matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromMatrix(matrix);

  for (var i = 0, l = objects.length; i < l; i++) {
    let object = objects[i].getObjectByName("bound");
    objects[i].visible = frustum.intersectsObject(object);
  }
}

module.exports = function systemCull(state, {camera, scene}) {
  manualCull(
    scene.getObjectByName("systems").children,
    camera
  );
}