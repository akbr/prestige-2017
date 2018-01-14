module.exports = function wireEvents (eventStreams, canvasEventStreams, camera, scene, store) {
  let {inputDown$, inputUp$, drag$, scale$} = eventStreams;
  let {dispatch} = store;

  // Wire up the camera
  drag$.onValue(({dx, dy}) => {
    camera.panByOffset(dx, dy);
  });

  scale$.onValue(({clientX, clientY, delta}) => {
    let scaleMultiplier;
    let speed = 0.03;

    if (delta > 10) {
      delta = 10;
    } else if (delta < -10) {
      delta = -10;
    }

    scaleMultiplier = (1 + speed * delta);
    camera.zoomInto(clientX, clientY, scaleMultiplier);
  });

  // Selecting something
  canvasEventStreams.canvasDown$.onValue(o => {
    if (o) {
      dispatch({
        type: "SELECT",
        id: o.object.id
      });
    } else {
      dispatch({
        type: "DESELECT"
      });
    }
  });
}