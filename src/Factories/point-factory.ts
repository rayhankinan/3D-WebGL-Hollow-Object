import PointInterface from "Main/Interfaces/point-interface";
import Point from "Main/Operations/point";

class PointFactory {
  public static fromInterface(point: PointInterface): Point {
    const { x, y, z } = point;

    return new Point(x, y, z);
  }
}

export default PointFactory;
