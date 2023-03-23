import ShapeFactory from "Factories/shape-factory";
import ShapeInterface from "Interfaces/shape-interface";
import Shape from "Objects/shape";

class FileSystem {
  public static loadShape(text: string): Shape {
    const shapeInterface = JSON.parse(text) as ShapeInterface;

    return ShapeFactory.fromInterface(shapeInterface, {
      tx: 0,
      ty: 0,
      tz: 0,
      angleX: 0,
      angleY: 0,
      angleZ: 0,
      sx: 1,
      sy: 1,
      sz: 1,
    });
  }

  public static serializeShape(shape: Shape): string {
    return JSON.stringify(shape.applyTransformation());
  }
}

export default FileSystem;
