import ShapeInterface from "Main/Interfaces/shape-interface";
import Shape from "Main/Objects/shape";
import FaceFactory from "Factories/face-factory";

class ShapeFactory {
  public static fromInterface(shape: ShapeInterface): Shape {
    const { arrayOfFace, tx, ty, tz, angleX, angleY, angleZ, sx, sy, sz } =
      shape;

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
