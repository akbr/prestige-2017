var vertexShader = [
  'uniform float thickness;',
  'attribute float lineMiter;',
  'attribute vec2 lineNormal;',
  'attribute float lineDistance;',
  'varying float lineU;',

  'void main() {',
  'lineU = lineDistance;',
  'vec3 pointPos = position.xyz + vec3(lineNormal * thickness/2.0 * lineMiter, 0.0);',
  'gl_Position = projectionMatrix * modelViewMatrix * vec4( pointPos, 1.0 );',
  '}'
].join('\n');

var fragmentShader = [
  'varying float lineU;',

  'uniform float opacity;',
  'uniform vec3 diffuse;',
  'uniform float dashSteps;',
  'uniform float dashSmooth;',
  'uniform float dashDistance;',

  'void main() {',
  'float lineUMod = mod(lineU, 1.0/dashSteps) * dashSteps;',
  'float dash = smoothstep(dashDistance, dashDistance+dashSmooth, length(lineUMod-0.5));',
  'gl_FragColor = vec4(diffuse, opacity * dash);',
  '}'
].join('\n');

module.exports = (THREE) => ({side, thickness, opacity, diffuse}) => {
  return {
    transparent: true,
    side: side || THREE.DoubleSide,
    uniforms: {
      thickness: { type: 'f', value: thickness || 0.1 },
      opacity: { type: 'f', value: opacity || 1.0 },
      diffuse: { type: 'c', value: new THREE.Color(diffuse) },
      dashSteps: { type: 'f', value: 12 },
      dashDistance: { type: 'f', value: 0.2 },
      dashSmooth: { type: 'f', value: 0.01 }
    },
    vertexShader,
    fragmentShader
  };
};