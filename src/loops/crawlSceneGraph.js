import {systemScale} from "../config/scales";

function crawl (obj, camera, scene) {
  for (let i in obj.children) {
    let child = obj.children[i];

    // isVisible
    if (child.isVisible) {
      child.visible = child.isVisible(camera.zScale);
    }

    if (child.visible === false) {
      continue;
    }

    // Track interactives
    child.interactive && scene.interactives.push(child);

    // Track DOMObject3Ds
    child.isReact && scene.doms.push(child);

    // onScale
    child.onScale && child.onScale(camera.zScale, systemScale);

    // onUpdate
    child.onUpdate && child.onUpdate(camera.zScale);

    crawl(child, camera, scene);
  }
}

function update (state, {scene, camera}) {
  scene.interactives = [];
  scene.doms = [];
  crawl(scene, camera, scene);
}

module.exports = update;