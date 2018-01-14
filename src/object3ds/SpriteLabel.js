import {Vector3, SpriteMaterial, Sprite} from "three";
import glossary from "../textures/glossary"

var matrixPosition = new Vector3();

class Label extends Sprite {
  constructor ({x, y}, textureId) {
    var entry = glossary[textureId];
    var material = new SpriteMaterial({map: entry.map});
    super(material);

    this.position.x = x;
    this.position.y = y;
    this.width = entry.width;
    this.height = entry.height;
    this.interactive = true;

    this.scale.set(this.width, this.height);
  }

  onScale (scale) {
    let myScale = scale * this.parent.getWorldScale().x;
    this.scale.set(this.width/myScale, this.height/myScale);
  }

  raycast (raycaster, intersects) {
    matrixPosition.setFromMatrixPosition(this.matrixWorld);

    var distanceSq = raycaster.ray.distanceSqToPoint( matrixPosition );
    var worldScale = this.getWorldScale();
    var guessSizeSq = worldScale.x * worldScale.y / 4;

    if ( distanceSq > guessSizeSq ) {
      return;
    }

    intersects.push({
      distance: Math.sqrt( distanceSq ),
      point: this.position,
      face: null,
      object: this
    });
  }
}

module.exports = Label;