import Light from "Objects/light";

function generateDefaultAmbientLight(): Light {
  return new Light(1, 1, 1);
}

export default generateDefaultAmbientLight;
