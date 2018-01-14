import {WebGLRenderer, Scene} from "three";
import PerspectiveCamera2DPlus from "../modules/PerspectiveCamera2D"

module.exports = function initCanvas(el) {
  // Renderer
  let renderer = new WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  el.appendChild(renderer.domElement);

  // Camera
  let fov = 20;
  let aspect = null; // set below
  let near = 1;
  let far = 100000;
  let camera = new PerspectiveCamera2DPlus(fov, aspect, near, far);
  camera.zoomTo(1);
  
  // Wiring to viewport
  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);


  let scene = new Scene();

  return {renderer, camera, scene}
}