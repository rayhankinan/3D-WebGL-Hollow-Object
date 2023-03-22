import LightInterface from "Main/Interfaces/light-interface";
import Vector from "Main/Operations/vector";

class Light extends Vector implements LightInterface {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {
    super(x, y, z);
  }

  public getRawDirection(): readonly [number, number, number] {
    const currentVector = new Vector(this.x, this.y, this.z);
    const unitVector = currentVector.normalize();

    return unitVector.getTriplet();
  }
}

export default Light;
