import {Texture, MeshBasicMaterial, PlaneGeometry, Mesh} from "three";
import { Text2D } from "./Text2D";

export class MeshText2D extends Text2D {
  constructor(text = '', options = {}) {
    super(text, options);
  }

  raycast () {
    this.mesh.raycast.apply(this.mesh, arguments);
  }

  updateText() {
    this.cleanUp(); // cleanup previous texture

    this.canvas.drawText(this._text, {
      font: this._font,
      fillStyle: this._fillStyle
    });

    this.texture = new Texture(this.canvas.canvas);
    this.texture.needsUpdate = true;
    this.applyAntiAlias();

    if (!this.material) {
      this.material = new MeshBasicMaterial({ map: this.texture, side: this.side });
      this.material.transparent = true;

    } else {
      this.material.map = this.texture
    }

    if (!this.mesh) {
      this.geometry = new PlaneGeometry(this.canvas.width, this.canvas.height);
      this.mesh = new Mesh(this.geometry, this.material);
      this.add(this.mesh)
    }

    this.mesh.position.x = ((this.canvas.width/2) - (this.canvas.textWidth/2)) + ((this.canvas.textWidth/2) * this.align.x)
    this.mesh.position.y = ((this.canvas.textHeight/2) * this.align.y)

    // manually update geometry vertices
    this.geometry.vertices[0].x = this.geometry.vertices[2].x = -this.canvas.width/2
    this.geometry.vertices[1].x = this.geometry.vertices[3].x = this.canvas.width/2
    this.geometry.vertices[0].y = this.geometry.vertices[1].y = this.canvas.height/2
    this.geometry.vertices[2].y = this.geometry.vertices[3].y = -this.canvas.height/2
    this.geometry.verticesNeedUpdate = true
  }
}