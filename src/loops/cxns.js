import {Object3D} from 'three';
import border from '@akbr/border';
import Cxn from '../object3ds/Cxn';

function init ({cxns}, {scene}) {
  let cxnsGroup = new Object3D();
  cxnsGroup.name = 'cxns';
  scene.add(cxnsGroup);
}

function update ({systems, cxns}, {scene}) {
  let cxnsGroup = scene.getObjectByName('cxns');
  
  cxns.forEach(([id1, id2]) => {
    let c1 = systems[id1];
    let c2 = systems[id2];
    let mesh = new Cxn(c1, c2, id1, id2);
    cxnsGroup.add(mesh);
  });
}

module.exports = border(update, {
  init,
  path: 'game',
  shouldUpdate: (prev, next) => {
    return prev.cxns !== next.cxns;
  }
});