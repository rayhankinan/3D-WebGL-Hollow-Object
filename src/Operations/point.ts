import PointInterface from "Main/Interfaces/point-interface";
import Coordinate from "Operations/coordinate";

class Point extends Coordinate implements PointInterface {
  public constructor(position: readonly [number, number, number]) {
    super([...position, 1]);
  }

  public getTriplet(): readonly [number, number, number] {
    return [this.x, this.y, this.z];
  }
}

export default Point;
