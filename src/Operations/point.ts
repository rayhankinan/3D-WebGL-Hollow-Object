import PointInterface from "Main/Interfaces/point-interface";
import Coordinate from "./coordinate";

class Point extends Coordinate implements PointInterface {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  public constructor(
    position: readonly [number, number, number],
    color: readonly [number, number, number, number] = [0, 0, 0, 1]
  ) {
    super([...position, 1]);

    const [r, g, b, a] = color;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public getTriplet(): readonly [number, number, number] {
    return [this.x, this.y, this.z];
  }

  public getColor(): readonly [number, number, number, number] {
    return [this.r, this.g, this.b, this.a];
  }

  public setColor(color: readonly [number, number, number, number]): void {
    const [r, g, b, a] = color;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

export default Point;
