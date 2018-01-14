import {store, renderer, camera, scene} from "./init";

import {Vector3, MeshBasicMaterial, BoxGeometry, Mesh} from "three";
let geometry = new BoxGeometry(50, 50, 50);
let material = new MeshBasicMaterial({color: 0xff0000, wireframe: true});
let mesh = new Mesh(geometry, material);
scene.add(mesh);

let mesh2 = new Mesh(geometry, material);
mesh.position.set(300, 0, 0);
scene.add(mesh2);

import * as THREE from "three";
import Arrow from "./meshes/Arrow.js"

let arrow = new Arrow();
arrow.position.x = 25;
scene.add(arrow);
//arrow.rotation.z = 0.7;

(function run() {
  let {mapScale} = camera;
  if (mapScale > 1) {
    arrow.scale.set(1/mapScale, 1/mapScale, 1/mapScale);
  }
  renderer.render(scene, camera)
  requestAnimationFrame(run);
})();