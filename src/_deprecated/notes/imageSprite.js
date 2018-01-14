import {TextureLoader, SpriteMaterial, Sprite, NearestFilter, LinearMipMapLinearFilter} from "three";
var map = new TextureLoader().load( "./src/images/crown.png", (map) => {
  // Looks best for pixel-y sprites. Maybe not on high pixel density screens, though.
  map.magFilter = NearestFilter;
  map.minFilter = LinearMipMapLinearFilter;
  sprite.scale.set(map.image.width, map.image.height);
});
var spriteMaterial = new SpriteMaterial( { map: map } );
var sprite = new Sprite( spriteMaterial );
sprite.position.x = 25;
sprite.position.y = 25;
scene.add(sprite);
