import {store, renderer, camera, scene} from "./init/";
import stats from "./init/initStats" // debug

let loops = [
  () => stats.begin(),
  // Generative updates
  require('./loops/scenery'),
  require("./loops/systems"),
  require("./loops/cxns"),
  // Scene graph tweaks
  require("./loops/systemCull"),
  require("./loops/uiRender"),
  require("./loops/crawlSceneGraph"),
  //require("./loops/experiment"),
  // Rendering passes
  require("./loops/threeRender"),
  require("./loops/reactRender"),
  require("./loops/info"),
  () => stats.end()
];

let assets = {renderer, camera, scene};

function main () {
  let state = store.getState();
  loops.forEach(fn => fn(state, assets));
  requestAnimationFrame(main);
}

main();