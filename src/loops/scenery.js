import border from '@akbr/border';
import Starfield from '../object3ds/Starfield';

function init (systems, {renderer, scene}) {
  renderer.setClearColor(0x0D122B, 1);
  let starfield = new Starfield();
  scene.add(starfield);
}

module.exports = border(x => x, {
  init
});