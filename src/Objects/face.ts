import FaceInterface from "Interfaces/face-interface";
import Matrix from "Operations/matrix";
import Color from "Operations/color";
import Point from "Operations/point";
import Vector from "Operations/vector";

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

  public findNormal(): Vector {
    const q = new Vector(
      this.arrayOfPoint[0].x,
      this.arrayOfPoint[0].y,
      this.arrayOfPoint[0].z
    );

    const r = new Vector(
      this.arrayOfPoint[1].x,
      this.arrayOfPoint[1].y,
      this.arrayOfPoint[1].z
    );

    const s = new Vector(
      this.arrayOfPoint[2].x,
      this.arrayOfPoint[2].y,
      this.arrayOfPoint[2].z
    );

    const qr = r.subtract(q);
    const qs = s.subtract(q);
    return qs.cross(qr).normalize();
  }

  public getRawPosition(): readonly number[] {
    return this.arrayOfPoint.flatMap((p) => p.getTriplet());
  }

  public getRawColor(): readonly [number, number, number] {
    return this.color.getTriplet();
  }

  public applyMatrix(matrix: Matrix): Face {
    return new Face(
      this.arrayOfPoint.map((p) => {
        const [x, y, z, w] = matrix.multiplyCoordinate(p).getQuadruplet();

        return new Point(x / w, y / w, z / w);
      }),
      this.color
    );
  }
}

export default Face;
