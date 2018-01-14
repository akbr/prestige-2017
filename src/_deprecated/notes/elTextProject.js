function updateEl () {
  var width = window.innerWidth, height = window.innerHeight;
  var widthHalf = width / 2, heightHalf = height / 2;
  var pos = elPosition.clone(); // vector position for el
  pos.project(camera);
  let x = ( pos.x * widthHalf ) + widthHalf;
  let y = - ( pos.y * heightHalf ) + heightHalf;
  el.style.top = `${y}px`;
  el.style.left = `${x}px`;
}