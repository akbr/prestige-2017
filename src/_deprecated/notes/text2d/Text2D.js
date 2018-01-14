import {Object3D, DoubleSide, NearestFilter, LinearMipMapLinearFilter} from "three";
import { textAlign } from "./utils";
import { CanvasText } from "./CanvasText";

export class Text2D extends Object3D {
  constructor(text = '', options = {}) {
    super();

    this._font = options.font || "30px Arial";
    this._fillStyle = options.fillStyle || "#FFFFFF";

    this.canvas = new CanvasText();

    this.align = options.align || textAlign.center;
    this.side = options.side || DoubleSide;

    // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
    this.antialias = (typeof options.antialias === "undefined") ? true : options.antialias;
    this.text = text;
  }

  get width () { return this.canvas.textWidth }
  get height () { return this.canvas.textHeight }

  get text() { return this._text; }

  set text(value) {
    if (this._text !== value) {
      this._text = value;
      this.updateText();
    }
  }

  get font() { return this._font; }

  set font(value) {
    if (this._font !== value) {
      this._font = value;
      this.updateText();
    }
  }

  get fillStyle() {
    return this._fillStyle;
  }

  set fillStyle(value) {
    if (this._fillStyle !== value) {
      this._fillStyle = value;
      this.updateText();
    }
  }

  cleanUp () {
    if (this.texture) {
      this.texture.dispose()
    }
  }

  applyAntiAlias () {
    if (this.antialias === false) {
      this.texture.magFilter = NearestFilter
      this.texture.minFilter = LinearMipMapLinearFilter
    }
  }
}
