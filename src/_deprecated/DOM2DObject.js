import {Object3D} from 'three';

module.exports = class DOM2DObject extends Object3D {
  constructor (component, initialProps) {
    super();
    this.isReact = true;
    this.component = component;
    this.userData = initialProps;
  }
}