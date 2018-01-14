import border from "@akbr/border";
import Selector from '../object3ds/Selector';

function init (state, {scene}) {
  let selector = new Selector();
  selector.name = 'selector';
  selector.visible = false;
  scene.add(selector);
}

function update (ui, {camera, scene, renderer}) {
  let selected = scene.getObjectById(ui.selected);
  let selector = scene.getObjectByName('selector');

  if (selected && selected.geometry) {
    // Get on-screen dimensions
    let adjustedScale = camera.zScale * selected.getWorldScale().x;
    selected.geometry.computeBoundingBox();
    let {min, max} = selected.geometry.boundingBox;
    let width = (max.x - min.x) * adjustedScale;
    let height = (max.y - min.y) * adjustedScale;
    // Get world position
    let pos = selected.getWorldPosition();

    // Pass this data along to the DOMObject3D
    selector.position.x = pos.x;
    selector.position.y = pos.y;
    selector.userData = {width, height}; // Components' props

    selector.visible = true;
  } else {
    selector.visible = false;
  }
}

module.exports = border(update, {
  init,
  path: 'ui',
  shouldUpdate: (prev, next) => {
    return prev.selected !== next.selected;
  }
});