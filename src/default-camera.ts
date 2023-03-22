import Camera from "Objects/camera";
import { degToRad } from "./Utils/angle";

function generateDefaultCamera() {
  return new Camera(500, 0, 0, degToRad(180));
}

export default generateDefaultCamera;
