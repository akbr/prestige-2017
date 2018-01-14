import Kefir from "kefir";

module.exports = (el) => {
  // ---
  // Raw event streams
  // ---
  const mousedown$ = Kefir.fromEvents(el, "mousedown");
  const mouseup$ = Kefir.fromEvents(el, "mouseup");
  const mousemove$ = Kefir.fromEvents(el, "mousemove");
  const wheel$ = Kefir.fromEvents(el, "wheel");
  const touchstart$ = Kefir.fromEvents(el, "touchstart");
  const touchend$ = Kefir.fromEvents(el, "touchend");
  const touchmove$ = Kefir.fromEvents(el, "touchmove");

  const inputDown$ = Kefir.merge([
    mousedown$,
    touchstart$.filter(e => e.touches.length === 1).map(e => e.touches[0])
  ]);

  const inputUp$ = Kefir.merge([
    mouseup$,
    touchend$
  ]);

  const inputMove$ = Kefir.merge([
    mousemove$,
    touchmove$.filter(e => e.touches.length === 1).map(e => e.touches[0])
  ]);

  // ---
  // Synthetics
  // ---
  // drag$ => {dx, dy}
  const drag$ = inputDown$.flatMap(e => {
    return inputMove$
      .takeUntilBy(inputUp$)
      .diff((prev, next) => {
        return {
          dx: next.clientX - prev.clientX,
          dy: next.clientY - prev.clientY
        }
      })
  })

  // scale$ => {clientX, clientY, delta}
  const wheelScale$ = wheel$
    .map(e => {
      return {
        clientX: e.clientX,
        clientY: e.clientY,
        delta: e.deltaY // this SHOULD work for modern browsers' "wheel" event
      }
    });

  var lastPinchLength = 0;
  const touchScale$ = touchmove$
    .filter(e => e.touches.length === 2)
    .map(e => {
      let t1 = e.touches[0];
      let t2 = e.touches[1];

      let pinchLength = (
        (t1.clientX - t2.clientX) * (t1.clientX - t2.clientX) +
        (t1.clientY - t2.clientY) * (t1.clientY - t2.clientY)
      );

      let delta = 0;
      if (pinchLength < lastPinchLength) {
        delta = 2;
      } else if (pinchLength > lastPinchLength) {
        delta = -2;
      }

      lastPinchLength = pinchLength;

      return {
        clientX: (t1.clientX + t2.clientX)/2,
        clientY: (t1.clientY + t2.clientY)/2,
        delta
      }
    });
  
  const scale$ = Kefir.merge([
    wheelScale$, touchScale$
  ]);

  return {
    // Raw
    mousedown$,
    mouseup$,
    mousemove$,
    wheel$,
    touchstart$,
    touchend$,
    touchmove$,
    // Merges
    inputDown$,
    inputUp$,
    inputMove$,
    // Synthetics
    drag$,
    scale$
  }
}