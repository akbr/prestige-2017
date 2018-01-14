var React = require('react');

var ThreeCSSWrapper = (props) => {
  let {width, height, fov, cameraTransform, mapScale} = props;

  return (
    <Css3dRoot width={width} height={height} fov={fov}>
      <Css3dCamera width={width} height={height} cameraTransform={cameraTransform}>
        {props.manifest.map(obj => convertObject3D(obj, mapScale))}
      </Css3dCamera>
    </Css3dRoot>
  );
}

var Css3dRoot = ({width, height, fov, children}) => {
  let style = {
    position: "absolute",
    pointerEvents: "none",
    overflow: "hidden",
    perspective: fov,
    width,
    height
  };

  return (
    <div className="css3dRoot" style={style}>
      {children}
    </div>
  );
}

var Css3dCamera = ({width, height, cameraTransform, children}) => {
  let style = {
    transformStyle: "preserve-3d",
    transform: cameraTransform,
    width,
    height
  };

  return (
    <div className="css3dCamera" style={style}>
      {children}
    </div>
  );
}

var ObjectPositionWrapper = (props) => {
  let {transform} = props;
  let style = {
    position: "absolute",
    pointerEvents: "auto",
    transform
  };

  return (
    <div className="css3dPosition" style={style}>
      {props.children}
    </div>
  );
};

var convertObject3D = (obj, mapScale) => {
  let Component = obj.component;
  return (
    <ObjectPositionWrapper transform={obj.transform} key={obj.key}>
      <Component key={obj.key} mapScale={mapScale}></Component>
    </ObjectPositionWrapper>
  );
}

module.exports = ThreeCSSWrapper;