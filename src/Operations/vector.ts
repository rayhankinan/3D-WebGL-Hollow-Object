import VectorInterface from "Main/Interfaces/vector-interface";
import Coordinate from "Operations/coordinate";

class Vector extends Coordinate implements VectorInterface {
  public constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {
    super(x, y, z, 0);
  }

  public getTriplet(): readonly [number, number, number] {
    return [this.x, this.y, this.z];
  }
}

export default Vector;
