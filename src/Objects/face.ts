import FaceInterface from "Main/Interfaces/face-interface";
import Color from "Main/Operations/color";
import Point from "Main/Operations/point";
import Vector from "Main/Operations/vector";

class Face implements FaceInterface {
  constructor(
    public readonly arrayOfPoint: Point[],
    public readonly color: Color,
    public readonly normal: Vector
  ) {}

  public findCenter(): Point {
    let totalX = 0;
    let totalY = 0;
    let totalZ = 0;

    for (const p of this.arrayOfPoint) {
      const [pX, pY, pZ] = p.getTriplet();

      totalX += pX;
      totalY += pY;
      totalZ += pZ;
    }

    return new Point(
      totalX / this.arrayOfPoint.length,
      totalY / this.arrayOfPoint.length,
      totalZ / this.arrayOfPoint.length
    );
  }

  public findMaxX(): number {
    return Math.max(...this.arrayOfPoint.map((p) => p.x));
  }

  public findMinX(): number {
    return Math.min(...this.arrayOfPoint.map((p) => p.x));
  }

  public findMaxY(): number {
    return Math.max(...this.arrayOfPoint.map((p) => p.y));
  }

  public findMinY(): number {
    return Math.min(...this.arrayOfPoint.map((p) => p.y));
  }

  public findMaxZ(): number {
    return Math.max(...this.arrayOfPoint.map((p) => p.z));
  }

  public findMinZ(): number {
    return Math.min(...this.arrayOfPoint.map((p) => p.z));
  }

  public getRawPosition(): readonly number[] {
    return this.arrayOfPoint.flatMap((p) => p.getTriplet());
  }

  public getRawColor(): readonly [number, number, number] {
    return this.color.getTriplet();
  }

  public getRawNormal(): readonly [number, number, number] {
    return this.normal.getTriplet();
  }
}

export default Face;
