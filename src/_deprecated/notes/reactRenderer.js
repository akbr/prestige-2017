import React from "react";
import ReactDOM from "react-dom";
import ThreeCSSWrapper from "./utils/ThreeCSSWrapper.js";
import translateToCSS from "./utils/CSS3DTranslator";
import {Scene, Object3D} from "three";

var cssScene = new Scene();
for (var i = 0; i < 10; i++) {
  var obj = new Object3D();
  obj.position.set(Math.random() * 300, Math.random() * 300, 0);
  obj.userData.msg = 1;
  cssScene.add(obj);
}

let scale = 1/camera.map.scale;
cssScene.children.forEach(x => {
  x.scale.set(scale, scale, scale)
  x.userData.msg += 1;
})

let props = translateToCSS(cssScene, camera);
ReactDOM.render(
  <ThreeCSSWrapper {...props} />,
  document.getElementById("cssRoot")
);