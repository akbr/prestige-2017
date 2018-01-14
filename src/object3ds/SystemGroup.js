import { Group } from 'three';
import { systemScale} from "../config/scales";
import Bound from './Bound';
import PlanetGroup from './PlanetGroup';

class SystemGroup extends Group {
  constructor (system, id) {
    super();
    this.position.set(system.x, system.y, 0);
    this.scale.set( systemScale,  systemScale,  systemScale);
    this.name = id;

    let bound = new Bound(system, id);
    bound.name = 'bound';
    this.add(bound);

    for (let l in system.cubes) {
      let planetGroup = new PlanetGroup(system.cubes[l], l)
      this.add(planetGroup);      
    }
  }
}

module.exports = SystemGroup;