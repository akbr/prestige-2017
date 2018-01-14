import React from "react";
import ReactDOM from "react-dom";
import Info from "../components/Info";

var el = document.createElement("div");
el.id = "infoDisplay";
document.getElementById("uiOverlay").appendChild(el);

function update (state, {camera, scene, renderer}) {
  let props = {};

  props.x = Math.round(camera.position.x);
  props.y = Math.round(camera.position.y);
  props.scale = camera.zScale.toFixed(2);

  let systemsContainer = scene.getObjectByName("systems");
  if (systemsContainer) {
    props.systemsVisible = systemsContainer.children
      .map(x => x.visible ? 1 : 0)
      .reduce((pre, cur) => pre + cur);
  }

  let {geometries, textures} = renderer.info.memory;
  let {vertices, points, faces, calls} = renderer.info.render;
  Object.assign(props, {
    geometries, textures, vertices, points, faces, calls
  });

  props.doms = scene.doms.length;

  props.interactiveCount = scene.interactives.length;

  ReactDOM.render(
    <Info {...props} />,
    el
  );
}

module.exports = update;