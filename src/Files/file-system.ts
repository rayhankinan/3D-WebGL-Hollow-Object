import ShapeFactory from "Main/Factories/shape-factory";
import ShapeInterface from "Main/Interfaces/shape-interface";
import Shape from "Main/Objects/shape";

class FileSystem {
  public static loadShape(text: string): Shape {
    const shapeInterface = JSON.parse(text) as ShapeInterface;

    return ShapeFactory.fromInterface(shapeInterface);
  }

  public static serializeShape(shape: ShapeInterface): string {
    return JSON.stringify(shape);
  }
}

export default FileSystem;
