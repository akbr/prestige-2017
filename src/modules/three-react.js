import { Object3D } from 'three';

class DOMObject3D extends Object3D {
  constructor (component, initialProps) {
    super();
    this.isReact = true;
    this.component = component;
    this.userData = initialProps;
  }
}

function getWindowCoords (
  object3d, camera, 
  halfWindowWidth = window.innerWidth/2, halfWindowHeight = window.innerHeight/2
) {
  let v = object3d.position.clone();

  if (object3d.parent) {
    object3d.parent.localToWorld(v);
  }

  v.project(camera);

  return {
    x: (v.x * halfWindowWidth) + halfWindowWidth,
    y: -(v.y * halfWindowHeight) + halfWindowHeight
  }
}

import React from 'react';
import ReactDOM from 'react-dom';

const makeTranslateString = (x , y) => `translate(${x}px, ${y}px)`;
const Wrapper = function ({x, y, children}) {
  let style = {
    position: 'absolute',
    transform: makeTranslateString(x, y)
  }

  return <div style={style}>{children}</div>;
}

function DOMRenderer (object3ds, camera, el) {
  let halfWidth = window.innerWidth/2;
  let halfHeight = window.innerHeight/2;

  let children = object3ds.map(object3d => {
    let Component = object3d.component;
    let {uuid, userData} = object3d;
    let {x, y} = getWindowCoords(object3d, camera, halfWidth, halfHeight);

    // TODO: Invalidate if way off screen

    return(
      <Wrapper key={uuid} x={x} y={y}>
        <Component {... userData} />
      </Wrapper>
    );
  });

  ReactDOM.render(
    <div>{children}</div>,
    el
  );
};

export {
  DOMObject3D, DOMRenderer, getWindowCoords
}