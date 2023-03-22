import Camera from "Objects/camera";

function generateDefaultCamera() {
  return new Camera(500, 0, 0, 0, 0, 0, 1, 0);
}

export default generateDefaultCamera;
