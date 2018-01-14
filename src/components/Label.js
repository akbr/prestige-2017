import React from "react";

let style = {
  color: 'white',
  whiteSpace: 'nowrap',
  transform: 'translate(-50%, -100%)'
}

module.exports = function TextLabel({text}) {
  return <div style={style}>{text}</div>;
}