import React from 'react';

let style = {
  bottom: '10px',
  left: '5px',
  position: 'absolute',
  color: 'white',
  fontSize: '14px',
  opacity: '0.5'
};

module.exports = function Info (props) {
  let {
    x, y, scale,
    systemsVisible,
    geometries, textures,
    vertices, points, faces, calls,
    interactiveCount, doms
  } = props;

  return (
    <div style={style}>
      <div>{x}, {y}, {scale}</div>
      <div>Visible: {systemsVisible}</div>
      <div>Memory | Geometries: {geometries}, Textures: {textures}</div>
      <div>Render | Vertices: {vertices}, Points: {points}, Faces: {faces}, Calls: {calls}</div>
      <div>Crawl | Interactive: {interactiveCount} DOMs: {doms}</div>
    </div>
  );
}