import Matrix from "Operations/matrix";
import Coordinate from "Operations/coordinate";

class Transformation {
  public static translation(tx: number, ty: number, tz: number): Matrix {
    const p1 = new Coordinate([1, 0, 0, 0]);
    const p2 = new Coordinate([0, 1, 0, 0]);
    const p3 = new Coordinate([0, 0, 1, 0]);
    const p4 = new Coordinate([tx, ty, tz, 1]);

    return new Matrix([p1, p2, p3, p4]);
  }

  public static rotationX(angleX: number): Matrix {
    const p1 = new Coordinate([1, 0, 0, 0]);
    const p2 = new Coordinate([0, Math.cos(angleX), Math.sin(angleX), 0]);
    const p3 = new Coordinate([0, -Math.sin(angleX), Math.cos(angleX), 0]);
    const p4 = new Coordinate([0, 0, 0, 1]);

    return new Matrix([p1, p2, p3, p4]);
  }

  public static rotationY(angleY: number): Matrix {
    const p1 = new Coordinate([Math.cos(angleY), 0, -Math.sin(angleY), 0]);
    const p2 = new Coordinate([0, 1, 0, 0]);
    const p3 = new Coordinate([Math.sin(angleY), 0, Math.cos(angleY), 0]);
    const p4 = new Coordinate([0, 0, 0, 1]);

    return new Matrix([p1, p2, p3, p4]);
  }

  public static rotationZ(angleZ: number): Matrix {
    const p1 = new Coordinate([Math.cos(angleZ), Math.sin(angleZ), 0, 0]);
    const p2 = new Coordinate([-Math.sin(angleZ), Math.cos(angleZ), 0, 0]);
    const p3 = new Coordinate([0, 0, 1, 0]);
    const p4 = new Coordinate([0, 0, 0, 1]);

    return new Matrix([p1, p2, p3, p4]);
  }

  public static scale(sx: number, sy: number, sz: number): Matrix {
    const p1 = new Coordinate([sx, 0, 0, 0]);
    const p2 = new Coordinate([0, sy, 0, 0]);
    const p3 = new Coordinate([0, 0, sz, 0]);
    const p4 = new Coordinate([0, 0, 0, 1]);

    return new Matrix([p1, p2, p3, p4]);
  }

  public static general(
    tx: number,
    ty: number,
    tz: number,
    angleX: number,
    angleY: number,
    angleZ: number,
    sx: number,
    sy: number,
    sz: number,
    pivot: Coordinate
  ): Matrix {
    return Transformation.translation(tx, ty, tz)
      .multiplyMatrix(Transformation.translation(pivot.x, pivot.y, pivot.z))
      .multiplyMatrix(Transformation.rotationX(angleX))
      .multiplyMatrix(Transformation.rotationY(angleY))
      .multiplyMatrix(Transformation.rotationZ(angleZ))
      .multiplyMatrix(Transformation.scale(sx, sy, sz))
      .multiplyMatrix(Transformation.translation(-pivot.x, -pivot.y, -pivot.z));
  }
}

export default Transformation;
