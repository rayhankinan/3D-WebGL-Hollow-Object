import FaceInterface from "Interfaces/face-interface";

interface ShapeInterface {
  readonly arrayOfFace: FaceInterface[];
  tx: number;
  ty: number;
  tz: number;
  angleX: number;
  angleY: number;
  angleZ: number;
  sx: number;
  sy: number;
  sz: number;
}

export default ShapeInterface;
