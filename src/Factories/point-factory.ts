import PointInterface from "Interfaces/point-interface";
import Point from "Operations/point";

class PointFactory {
  public static fromInterface(point: PointInterface): Point {
    const { x, y, z } = point;

    return new Point(x, y, z);
  }
}

export default PointFactory;
