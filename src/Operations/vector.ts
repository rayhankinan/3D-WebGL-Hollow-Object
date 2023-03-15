import VectorInterface from "Main/Interfaces/vector-interface";
import Coordinate from "Operations/coordinate";

class Vector extends Coordinate implements VectorInterface {
  public constructor(public x: number, public y: number, public z: number) {
    super(x, y, z, 0);
  }

  public getTriplet(): readonly [number, number, number] {
    return [this.x, this.y, this.z];
  }
}

export default Vector;
