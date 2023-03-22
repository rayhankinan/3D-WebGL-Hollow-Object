import Camera from "Objects/camera";
import { degToRad } from "./Utils/angle";

function generateDefaultCamera() {
  return new Camera(500, degToRad(0));
}

export default generateDefaultCamera;
