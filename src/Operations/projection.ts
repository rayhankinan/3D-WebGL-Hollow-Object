import Matrix from "Operations/matrix";
import Coordinate from "Operations/coordinate";

class Projection {
  /* SUDAH BISA */
  public static orthographic(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ): Matrix {
    const p1 = new Coordinate(2 / (right - left), 0, 0, 0);
    const p2 = new Coordinate(0, 2 / (top - bottom), 0, 0);
    const p3 = new Coordinate(0, 0, 2 / (near - far), 0);
    const p4 = new Coordinate(
      -(right + left) / (right - left),
      -(top + bottom) / (top - bottom),
      -(far + near) / (far - near),
      1
    );

    return new Matrix(p1, p2, p3, p4);
  }

  /* MASIH BELUM BISA */
  public static perspective(
    fieldOfView: number,
    aspect: number,
    near: number,
    far: number
  ): Matrix {
    const f = Math.tan(0.5 * (Math.PI - fieldOfView));
    const w1 = -(far + near) / (far - near);
    const w2 = (-2 * near * far) / (far - near);

    const p1 = new Coordinate(f / aspect, 0, 0, 0);
    const p2 = new Coordinate(0, f, 0, 0);
    const p3 = new Coordinate(0, 0, w1, -1);
    const p4 = new Coordinate(0, 0, w2, 0);

    return new Matrix(p1, p2, p3, p4);
  }

  /* MASIH BELUM BISA */
  public static oblique(factor: number, angle: number): Matrix {
    const p1 = new Coordinate(1, 0, 0, 0);
    const p2 = new Coordinate(0, 1, 0, 0);
    const p3 = new Coordinate(
      factor * Math.cos(angle),
      factor * Math.sin(angle),
      0,
      0
    );
    const p4 = new Coordinate(0, 0, 0, 1);

    return new Matrix(p1, p2, p3, p4);
  }
}

export default Projection;
