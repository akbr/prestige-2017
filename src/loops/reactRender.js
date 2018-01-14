import {DOMRenderer} from '../modules/three-react.js';

module.exports = function reactRender (state, {scene, camera}) {
  DOMRenderer(scene.doms, camera, document.getElementById("canvasOverlay"));
}