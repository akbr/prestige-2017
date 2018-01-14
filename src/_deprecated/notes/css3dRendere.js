import {Scene} from "three";
import {CSS3DRenderer, CSS3DObject, CSS3DSprite} from "./utils/CSS3DRenderer";
let cssRenderer = new CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
document.body.appendChild(cssRenderer.domElement);
let cssScene = new Scene();
var el = document.createElement("div");
el.innerHTML = "Hello world!";
el.style = "color: white;"
var el3d = new CSS3DSprite(el);
el3d.position.set(26, 26, 26);
cssScene.add(el3d)