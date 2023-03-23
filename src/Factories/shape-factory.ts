import ShapeInterface from "Interfaces/shape-interface";
import TransformationInterface from "Interfaces/transformation-interface";
import Shape from "Objects/shape";
import FaceFactory from "Factories/face-factory";

class ShapeFactory {
  public static fromInterface(
    shape: ShapeInterface,
    transformation: TransformationInterface
  ): Shape {
    const { arrayOfFace } = shape;

    const { tx, ty, tz, angleX, angleY, angleZ, sx, sy, sz } = transformation;

    const newArrayOfFace = arrayOfFace.map((face) => {
      return FaceFactory.fromInterface(face);
    });

    return new Shape(
      newArrayOfFace,
      tx,
      ty,
      tz,
      angleX,
      angleY,
      angleZ,
      sx,
      sy,
      sz
    );
  }
}

export default ShapeFactory;
