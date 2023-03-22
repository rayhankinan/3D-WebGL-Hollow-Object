import Light from "Objects/light";

function generateDefaultLight(): Light {
  return new Light(0, 0, -1);
}

export default generateDefaultLight;
