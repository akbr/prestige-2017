import {Raycaster} from 'three';

var raycaster = new Raycaster();

module.exports = function ({mousemove$, inputDown$}, camera, scene) {
  function fireRay(clientX, clientY) {
    let mouse = {
      x: (clientX / window.innerWidth) * 2 - 1,
      y: -(clientY / window.innerHeight) * 2 + 1
    }

    let interactives = scene.interactives;

    if (interactives && interactives.length > 0) {
      raycaster.setFromCamera(mouse, camera);
      return raycaster.intersectObjects(interactives);
    } else {
      return [];
    }    
  }

  const exists = x => x;
  const canvasMousemove$ = mousemove$
    .throttle(10)
    .map(e => fireRay(e.clientX, e.clientY)[0])

  const parseOverOut$ = canvasMousemove$
    .diff((prev, next) => {
      if (next && !prev) {
        return {over: next}
      } else if (next && prev && prev.object !== next.object) {
        return {over: next, out: prev}
      } else if (!next && prev) {
        return {out: prev}
      }
    })
    .filter(exists)
    // In case of out and over, out fires first
    .withHandler((emitter, event) => {
      let {over, out} = event.value
      out ? emitter.emit({out}) : null
      over ? emitter.emit({over}) : null
    });

  const canvasMouseover$ = parseOverOut$.map(x => x.over).filter(exists);
  const canvasMouseout$ = parseOverOut$.map(x => x.out).filter(exists);

  const canvasDown$ = inputDown$
    .map(e => fireRay(e.clientX, e.clientY)[0]);

  return {
    canvasMousemove$,
    canvasMouseover$,
    canvasMouseout$,
    canvasDown$
  };
}