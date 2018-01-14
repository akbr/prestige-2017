var THREE = require("three");
import { TextOptions } from "./Text2D";
import { getFontHeight } from "./utils";

export class CanvasText {
  constructor () {
    this.textWidth = null;
    this.textHeight = null;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  get width () { return this.canvas.width }
  get height () { return this.canvas.height }

  drawText (text, ctxOptions) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = ctxOptions.font;

    this.textWidth = Math.ceil(this.ctx.measureText(text).width);
    this.textHeight = getFontHeight(this.ctx.font);

    this.canvas.width = THREE.Math.nextPowerOfTwo(this.textWidth);
    this.canvas.height = THREE.Math.nextPowerOfTwo(this.textHeight);
    console.log(this.canvas.width, this.canvas.height)

    this.ctx.font = ctxOptions.font;
    this.ctx.fillStyle = ctxOptions.fillStyle;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    this.ctx.fillText(text, 0, 0);

    return this.canvas;
  }
}
