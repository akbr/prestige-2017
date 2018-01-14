import Stats from "stats.js";
var stats = new Stats();
stats.showPanel(1);
document.body.appendChild( stats.dom );

module.exports = stats;