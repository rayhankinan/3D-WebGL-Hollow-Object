import FaceInterface from "Main/Interfaces/face-interface";
import Point from "Main/Operations/point";

class Face implements FaceInterface {
  constructor(public readonly arrayOfPoint: Point[]) {}
}

export default Face;
