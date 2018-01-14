import {PerspectiveCamera} from 'three';

module.exports = class PerspectiveCamera extends PerspectiveCamera {
  constructor (fov, aspect, near, far) {
    super(fov, aspect, near, far);
    window.addEventListener('resize', this.onResize.bind(this), false);
    this.onResize();
  }

  onResize () {
    let {innerWidth, innerHeight} = window;
    Object.assign(this, {
      innerWidth,
      innerHeight,
      halfWidth: innerWidth/2,
      halfHeight: innerHeight/2,
      aspect: innerWidth / innerHeight
    });
    this.updateProjectionMatrix();
  }

  getVFov() {
    return this.fov * Math.PI / 180;
  }

  updateScale () {
    var height = 2 * Math.tan( this.getVFov() / 2 ) * this.position.z;
    this.zScale = this.innerHeight / height;
  }

  zoomTo (scale) {
    this.position.z = this.innerHeight / (2 * Math.tan(this.getVFov()/2))/scale;
    this.zScale = scale;
  }

  panByOffset (dx, dy) {
    this.position.x -= dx/this.zScale;
    this.position.y += dy/this.zScale;
  }

  zoomInto (clientX, clientY, scaleMultiplier) {
    let dx = (clientX - this.innerWidth / 2) / this.zScale;
    let dy = (clientY - this.innerHeight / 2) / this.zScale;

    // TK - Check for min/max zoom

    this.position.z *= scaleMultiplier;
    this.position.x -= (scaleMultiplier - 1) * dx;
    this.position.y += (scaleMultiplier - 1) * dy;
    this.updateScale();
  }
}