import {CircleGeometry, Line, LineBasicMaterial} from 'three';
import {systemRadius} from '../config/scales';

const segments = 64;
const geometry = new CircleGeometry(systemRadius, segments);
geometry.vertices.shift(); // Remove center vertex to achieve an 'outline'
const material = new LineBasicMaterial({ color: 0xff0000 });

class Bound extends Line {
  constructor ({x, y}, id) {
    super(geometry, material);   
    this.name = 'boundary';
  }
}

module.exports = Bound;