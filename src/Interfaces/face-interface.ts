import PointInterface from "Interfaces/point-interface";
import ColorInterface from "Interfaces/color-interface";
import VectorInterface from "Interfaces/vector-interface";

interface FaceInterface {
  readonly arrayOfPoint: PointInterface[];
  readonly color: ColorInterface;
  readonly normal: VectorInterface;
}

export default FaceInterface;
