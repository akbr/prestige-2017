import {Object3D, Texture, SpriteMaterial, Sprite} from "three";

/// 2D REALM
var textHeight = 45;

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

module.exports = function addText(text) {
  // 2d duty
  var metrics = context.measureText(text);
  var textWidth = metrics.width;

  canvas.width = 512;
  canvas.height = 512;
  context.font = "normal " + textHeight + "px Arial";
  context.fillStyle = "#ff0000";
  context.fillText(text, 0, 45);
  context.scale(2,2)

  var texture = new Texture(canvas);
  texture.needsUpdate = true;
  var material = new SpriteMaterial({ map: texture });
  var sprite = new Sprite( material );

  var textObject = new Object3D();
  sprite.scale.set(512, 512, 1);

  textObject.add(sprite);
  return textObject;
}