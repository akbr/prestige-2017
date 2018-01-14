import { Object3D } from 'three';

class DOM2DObject extends Object3D {
  constructor (component, initialProps) {
    super();
    this.component = component;
    this.userData = initialProps;
  }
}

import React from 'react';
import ReactDOM from 'react-dom';

const getTranslate = (x , y) => `translate(${x}px, ${y}px)`;
const Wrapper = function ({x, y, children}) {
  let style = {
    position: 'absolute',
    transform: getTranslate(x, y)
  }

  return <div style={style}>{children}</div>;
}

const style = {position: 'absolute'};
const cameraToWindow = function (o, camera, halfWidth, halfHeight) {
  let v = o.position.clone();
  if (o.parent) {
    o.parent.localToWorld(v);
  }
  v.project(camera);

  return {
    x: (v.x * halfWidth) + halfWidth,
    y: -(v.y * halfHeight) + halfHeight
  }
}

function DOM2DRenderer (manifest, camera, el) {
  let children = [];
  let halfWidth = window.innerWidth/2;
  let halfHeight = window.innerHeight/2;

  manifest.forEach(o => {
    let Component = o.component;
    let {x, y} = cameraToWindow(o, camera, halfWidth, halfHeight);
    children.push(
      <Wrapper key={o.uuid} x={x} y={y}>
        <Component {... o.userData} />
      </Wrapper>)
  });

  ReactDOM.render(
    <div>{children}</div>,
    el
  );
};

export {
  DOM2DObject, DOM2DRenderer
}