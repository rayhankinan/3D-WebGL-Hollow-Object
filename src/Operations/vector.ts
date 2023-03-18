import VectorInterface from "Main/Interfaces/vector-interface";
import Coordinate from "Operations/coordinate";

class Vector extends Coordinate implements VectorInterface {
  public constructor(public x: number, public y: number, public z: number) {
    super(x, y, z, 0);
  }

  public getTriplet(): readonly [number, number, number] {
    return [this.x, this.y, this.z];
  }

  public normalize(): Vector {
    var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    if (length > 0.00001) {
      return new Vector(this.x / length, this.y / length, this.z / length);
    } else {
      return new Vector(0, 0, 0);
    }
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
