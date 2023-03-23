import LightInterface from "Interfaces/light-interface";
import Vector from "Operations/vector";

class Light extends Vector implements LightInterface {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {
    super(x, y, z);
  }

  public getRawDirection(): readonly [number, number, number] {
    const unitVector = this.normalize();

    return unitVector.getTriplet();
  }

  public reverse(): Light {
    return new Light(-this.x, -this.y, -this.z);
  }
}

export default Light;
