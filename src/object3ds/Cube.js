import {BoxGeometry, MeshBasicMaterial, Mesh} from "three";

var geometry = new BoxGeometry(50, 50, 50);

class Cube extends Mesh {
  constructor (id) {
    let material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    super(geometry, material);
    
    this.interactive = id;
  }

  onSelect (scale) {
    let adjustedScale = scale * this.getWorldScale().x;
    this.geometry.computeBoundingBox();
    let {min, max} = this.geometry.boundingBox;
    return {
      width: (max.x - min.x) * adjustedScale,
      height: (max.y - min.y) * adjustedScale
    }
  }
}

module.exports = Cube;