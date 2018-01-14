import {Vector3, Line, Geometry, LineBasicMaterial} from 'three';
import {systemRadius, systemScale} from '../config/scales';

const buffer = systemRadius * systemScale + 2;

class Cxn extends Line {
  constructor (c1, c2, id1, id2) {
    let a = new Vector3(c1.x, c1.y);
    let b = new Vector3(c2.x, c2.y);

    let unitVector = new Vector3().copy(b)
      .sub(a)
      .normalize();

    let distance = a.distanceTo(b);
    let modDistance = distance - buffer * 2;

    let start = new Vector3().copy(unitVector)
      .multiplyScalar(buffer)
      .add(a);

    let end = new Vector3().copy(unitVector)
      .multiplyScalar(modDistance)
      .add(start);

    var geometry = new Geometry();
    geometry.vertices.push(start, end);

    let material = new LineBasicMaterial({ color: 0xffffff });

    super(geometry, material);
  }
}

module.exports = Cxn;