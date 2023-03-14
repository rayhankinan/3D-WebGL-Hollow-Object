import FaceInterface from "Main/Interfaces/face-interface";
import Color from "Main/Operations/color";
import Point from "Main/Operations/point";

class Face implements FaceInterface {
  constructor(
    public readonly arrayOfPoint: Point[],
    public readonly color: Color
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

    return new Point([
      totalX / this.arrayOfPoint.length,
      totalY / this.arrayOfPoint.length,
      totalZ / this.arrayOfPoint.length,
    ]);
  }

  public getRawPosition(): readonly number[] {
    return this.arrayOfPoint.flatMap((p) => p.getTriplet());
  }

  public getRawColor(): readonly [number, number, number] {
    return this.color.getTriplet();
  }
}

export default Face;
