import VectorInterface from "Interfaces/vector-interface";
import Coordinate from "Operations/coordinate";
import CLOSEST_TO_ZERO from "Constants/closest-to-zero";

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

  public normalize(): Vector {
    const length = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z
    );

    return length < CLOSEST_TO_ZERO
      ? new Vector(0, 0, 0)
      : new Vector(this.x / length, this.y / length, this.z / length);
  }

  public subtract(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  public cross(other: Vector): Vector {
    return new Vector(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }
}

export default Vector;
