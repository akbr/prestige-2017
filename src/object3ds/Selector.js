import {DOMObject3D} from '../modules/three-react.js';
import TextLabelComponent from '../components/Selector'

class Selector extends DOMObject3D {
  constructor(props) {
    super(TextLabelComponent, props);
  }
}

module.exports = Selector;

/**
import arc from "arc-to";
import normalize from "normalize-path-scale";
import LineGeometry from "../utils/LineGeometry";
import BasicLineShader from "../shaders/BasicLineShader";
import {Mesh} from "three";

var circlePath = normalize(arc(0, 0, 1, 0, Math.PI * 2, false, 64));
var circleGeometry = new LineGeometry(circlePath, { distances: true, closed: true });
var basicMaterial = new BasicLineShader({diffuse: 0x5cd7ff, thickness: 2});

class Selector extends Mesh {
  constructor () {
    super(circleGeometry, basicMaterial);
  }

  onScale (scale) {
    basicMaterial.uniforms.thickness.value =  2 / scale;
  }
}

module.exports = Selector;
**/