module.exports = function (ids) {
  ids.map(id => {
    let el = document.createElement('div');
    el.setAttribute('id', id);
    document.body.appendChild(el);
  })
}