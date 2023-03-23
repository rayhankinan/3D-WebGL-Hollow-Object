import PointInterface from "Interfaces/point-interface";
import ColorInterface from "Interfaces/color-interface";

interface FaceInterface {
  readonly arrayOfPoint: PointInterface[];
  readonly color: ColorInterface;
}

export default FaceInterface;
