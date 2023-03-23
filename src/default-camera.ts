import Camera from "Objects/camera";
import { degToRad } from "Utils/angle";
import Point from "Operations/point";

function generateDefaultCamera(): Camera {
  return new Camera(500, degToRad(0), new Point(0, 0, 0));
}

export default generateDefaultCamera;
