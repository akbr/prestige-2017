import {store, renderer, camera, scene} from "./init";
import {MeshBasicMaterial, BoxGeometry, Mesh} from "three";

let geometry = new BoxGeometry(100, 100, 100);
let material = new MeshBasicMaterial({color: 0xff0000, wireframe: true});
let mesh = new Mesh(geometry, material);

mesh.position.x = 0;
scene.add(mesh);

import Starfield from './object3ds/Starfield';
scene.add(new Starfield());

(function run() {
  renderer.render(scene, camera);
  requestAnimationFrame(run);
})();