import store from '../state/store';

import initBody from './initBody';
initBody(['uiOverlay', 'canvasOverlay', 'webGL']);

import initWebGLView from './initWebGLView';
let {renderer, camera, scene} = initWebGLView(document.getElementById('webGL'));

import initEventStreams from './initEventStreams';
let eventStreams = initEventStreams(document.body);

import initWebGLEventStreams from './initWebGLEvents';
let canvasEventStreams = initWebGLEventStreams(eventStreams, camera, scene);

import initEventWiring from './initEventWiring';
initEventWiring(eventStreams, canvasEventStreams, camera, scene, store);

module.exports = {store, renderer, camera, scene};