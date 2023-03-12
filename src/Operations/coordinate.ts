import CoordinateInterface from "Main/Interfaces/coordinate-interface";

class Coordinate implements CoordinateInterface {
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  public constructor(position: readonly [number, number, number, number]) {
    const [x, y, z, w] = position;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public getQuadruplet(): readonly [number, number, number, number] {
    return [this.x, this.y, this.z, this.w];
  }

  public setQuadruplet(
    position: readonly [number, number, number, number]
  ): void {
    const [x, y, z, w] = position;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public dot(other: Coordinate): number {
    return this.x * other.x + this.y * other.y + this.w * other.w;
  }
}

export default Coordinate;
