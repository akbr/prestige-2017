import {TextureLoader, NearestFilter, LinearMipMapLinearFilter} from "three";
const path = "./src/textures/";

var glossary = {
  crown: {
    file: "crown.png",
    width: 16,
    height: 16
  }
};

var loader = new TextureLoader();
for (var i in glossary) {
  let entry = glossary[i];
  entry.map = loader.load(path + entry.file, (map) => {
    map.magFilter = NearestFilter;
    map.minFilter = LinearMipMapLinearFilter;
  });
};

module.exports = glossary;