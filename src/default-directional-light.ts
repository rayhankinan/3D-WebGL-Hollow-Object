import Light from "Objects/light";

function generateDefaultDirectionalLight(): Light {
  return new Light(0, 0, 1);
}

export default generateDefaultDirectionalLight;
