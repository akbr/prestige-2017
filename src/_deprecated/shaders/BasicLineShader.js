var vertexShader = [
  'uniform float thickness;',
  'attribute float lineMiter;',
  'attribute vec2 lineNormal;',
  'void main() {',
  'vec3 pointPos = position.xyz + vec3(lineNormal * thickness / 2.0 * lineMiter, 0.0);',
  'gl_Position = projectionMatrix * modelViewMatrix * vec4(pointPos, 1.0);',
  '}'
].join('\n');

var fragmentShader = [
  'uniform vec3 diffuse;',
  'uniform float opacity;',
  'void main() {',
  'gl_FragColor = vec4(diffuse, opacity);',
  '}'
].join('\n');

import {ShaderMaterial, DoubleSide, Color} from "three";

class BasicLineShader extends ShaderMaterial {
  constructor({side, thickness, opacity, diffuse}) {
    super({
      side: side || DoubleSide,
      uniforms: {
        thickness: { type: 'f', value: thickness || 0.1 },
        opacity: { type: 'f', value: opacity || 1.0 },
        diffuse: { type: 'c', value: new Color(diffuse || 0xffffff) }
      },
      vertexShader,
      fragmentShader
    });
  }
}

module.exports = BasicLineShader;