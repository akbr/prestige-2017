import { Group } from 'three';
import Cube from './Cube';
import SpriteLabel from './SpriteLabel';
import TextLabel from "./TextLabel.js";

class PlanetGroup extends Group {
  constructor ({x, y}, id) {
    super();
    this.position.x = x;
    this.position.y = y;

    let textLabel = new TextLabel({text: id});
    textLabel.position.x = -25;
    textLabel.position.y = 25;

    this.add(
      new Cube('cube.'+id),
      new SpriteLabel({x:25, y:25}, 'crown'),
      textLabel
    );
  }

  isVisible (scale) {
    return scale >= 1;
  }
}

module.exports = PlanetGroup;