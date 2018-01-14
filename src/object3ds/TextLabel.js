import {DOMObject3D} from '../modules/three-react.js';
import TextLabelComponent from '../components/TextLabel'

class TextLabel extends DOMObject3D {
  constructor(props) {
    super(TextLabelComponent, props);
  }

  isVisible (scale) {
    return scale > 15 ? true : false;
  }
}

module.exports = TextLabel;