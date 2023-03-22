import FaceInterface from "Main/Interfaces/face-interface";
import Face from "Main/Objects/face";
import PointFactory from "Factories/point-factory";
import ColorFactory from "Factories/color-factory";
import VectorFactory from "Factories/vector-factory";

class FaceFactory {
  public static fromInterface(face: FaceInterface): Face {
    const { arrayOfPoint, color } = face;

    const newArrayOfPoint = arrayOfPoint.map((point) => {
      return PointFactory.fromInterface(point);
    });
    const newColor = ColorFactory.fromInterface(color);

    return new Face(newArrayOfPoint, newColor);
  }
}

export default FaceFactory;
