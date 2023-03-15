import PointInterface from "Main/Interfaces/point-interface";
import Coordinate from "Operations/coordinate";

class Point extends Coordinate implements PointInterface {
  public constructor(public x: number, public y: number, public z: number) {
    super(x, y, z, 1);
  }

  public getTriplet(): readonly [number, number, number] {
    return [this.x, this.y, this.z];
  }
}

export default Point;
