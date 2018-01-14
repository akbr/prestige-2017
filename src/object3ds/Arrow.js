import {Shape, ShapeGeometry, MeshBasicMaterial, Mesh, Object3D} from "three";

class Arrow extends Object3D {
  constructor (height = 20, length = 150, headHeight = 1.5, headLength = 50) {
    let material = new MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true});

    let bodyShape = new Shape();
    bodyShape.moveTo(0, -height/2);
    bodyShape.lineTo(0, height/2);
    bodyShape.lineTo(length, height/2);
    bodyShape.lineTo(length, -height/2);
    let bodyGeom = new ShapeGeometry(bodyShape);
    let bodyMesh = new Mesh(bodyGeom, material);

    let headShape = new Shape();
    headShape.lineTo(0, height * headHeight);
    headShape.lineTo(0 + headLength, 0);
    headShape.lineTo(0, - height * headHeight);
    let headGeom = new ShapeGeometry(headShape);
    let headMesh = new Mesh(headGeom, material);
    headMesh.position.x = length;

    super();
    this.add(bodyMesh, headMesh)
  }
}

module.exports = Arrow;