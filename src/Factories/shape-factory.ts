import ShapeInterface from "Main/Interfaces/shape-interface";
import ShaderInterface from "Main/Interfaces/shader-interface";
import Shape from "Main/Objects/shape";
import FaceFactory from "Factories/face-factory";

class ShapeFactory {
  public static fromInterface(
    shape: ShapeInterface,
    shader: ShaderInterface
  ): Shape {
    const { arrayOfFace, tx, ty, tz, angleX, angleY, angleZ, sx, sy, sz } =
      shape;
    const { gl, program, positionBuffer, colorBuffer } = shader;

    const newArrayOfFace = arrayOfFace.map((face) => {
      return FaceFactory.fromInterface(face);
    });

    return new Shape(
      gl,
      program,
      positionBuffer,
      colorBuffer,
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
