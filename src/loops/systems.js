import border from '@akbr/border';
import { Group } from 'three';
import SystemGroup from '../object3ds/SystemGroup';

function init (systems, {scene}) {
  let systemsGroup = new Group();
  systemsGroup.name = 'systems';
  scene.add(systemsGroup);
}

function update (systems, {scene}) {
  let systemsGroup = scene.getObjectByName('systems');

  Object.keys(systems).forEach(id => {
    let systemGroup = new SystemGroup(systems[id], id);
    systemsGroup.add(systemGroup);
  });
}

module.exports = border(update, {
  init,
  path: 'game.systems',
  shouldUpdate: (prev, next) => prev !== next
});