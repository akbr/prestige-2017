import { MeshPhongMaterial, SphereGeometry, Mesh, Group } from 'three';

const numStars = 500;

class Starfield extends Group {
  constructor () {
    super();

    const starMaterial = new MeshPhongMaterial({
      emissive: '#fff'
    });

    for (let i = 0; i < numStars; i++) {
      let star = new Mesh(
        new SphereGeometry(Math.random() * 10, 2, 2),
        starMaterial
      );
      star.position.set(
        Math.random() * 10000 - 5000,
        Math.random() * 10000 - 5000,
        Math.random() * -10000 - 5000
      );
      this.add(star);
    }
  }
}

module.exports = Starfield;