import {store, renderer, camera, scene} from "../init";
import {Object3D, Vector3, MeshBasicMaterial, BoxGeometry, Mesh} from "three";

let geometry = new BoxGeometry(100, 100, 100);
let material = new MeshBasicMaterial({color: 0xff0000, wireframe: true});
let mesh = new Mesh(geometry, material);

mesh.position.x = 0;

scene.add(mesh);

import {DOMObject2D, DOMRenderer} from '../utils/three-react.js';
import Label from "../components/Label.js";

let text = new DOMObject2D(Label, {text: "Hello, world!"});
text.position.y = 50;
mesh.add(text);

let text2 = new DOMObject2D(Label, {text: "Hello, again!"});
mesh.add(text2);

let text3 = new DOMObject2D(Label, {text: "Hello, again again again!"});
text3.position.y = -50;
mesh.add(text3);

(function run() {
  renderer.render(scene, camera);

  let doms = [];
  scene.traverse(o => o.isReact && doms.push(o));

  DOMRenderer(doms, camera, document.getElementById("cssRoot"));
  requestAnimationFrame(run);
})();

