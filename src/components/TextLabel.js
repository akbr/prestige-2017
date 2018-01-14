import React from "react";

const style = {
  color: 'white',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  cursor: 'default',
  transform: 'translate(-50%, -50%)'
}

module.exports = function TextLabel({text}) {
  return <div style={style}>{text}</div>;
}