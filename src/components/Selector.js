import React from "react";

let style = {
  position: "absolute",
  "backgroundColor": "rgba(0, 0, 0, 0)",
  transform: 'translate(-50%, -50%)'
}

function SelectorComponent({width, height}) {
  let padding = width * 0.2;
  let borderSize = 3;

  style = Object.assign({}, style, {
    width: width + padding,
    height: height + padding,
    border: borderSize + "px solid #fff"
  });

  return <div style={style}></div>;
}

module.exports = SelectorComponent;