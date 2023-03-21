import MatrixInterface from "Main/Interfaces/matrix-interface";
import Coordinate from "Operations/coordinate";

class Matrix implements MatrixInterface {
  constructor(
    public readonly a1: Coordinate,
    public readonly a2: Coordinate,
    public readonly a3: Coordinate,
    public readonly a4: Coordinate
  ) {}

  public flatten(): readonly number[] {
    return [
      ...this.a1.getQuadruplet(),
      ...this.a2.getQuadruplet(),
      ...this.a3.getQuadruplet(),
      ...this.a4.getQuadruplet(),
    ];
  }

  public multiplyMatrix(other: Matrix): Matrix {
    /* Unpack "this" matrix */
    const [a11, a21, a31, a41] = this.a1.getQuadruplet();
    const [a12, a22, a32, a42] = this.a2.getQuadruplet();
    const [a13, a23, a33, a43] = this.a3.getQuadruplet();
    const [a14, a24, a34, a44] = this.a4.getQuadruplet();

    /* Create transpose coordinate */
    const a1 = new Coordinate(a11, a12, a13, a14);
    const a2 = new Coordinate(a21, a22, a23, a24);
    const a3 = new Coordinate(a31, a32, a33, a34);
    const a4 = new Coordinate(a41, a42, a43, a44);

    /* Matrix multiplication */
    const b11 = a1.dot(other.a1);
    const b12 = a1.dot(other.a2);
    const b13 = a1.dot(other.a3);
    const b14 = a1.dot(other.a4);
    const b21 = a2.dot(other.a1);
    const b22 = a2.dot(other.a2);
    const b23 = a2.dot(other.a3);
    const b24 = a2.dot(other.a4);
    const b31 = a3.dot(other.a1);
    const b32 = a3.dot(other.a2);
    const b33 = a3.dot(other.a3);
    const b34 = a3.dot(other.a4);
    const b41 = a4.dot(other.a1);
    const b42 = a4.dot(other.a2);
    const b43 = a4.dot(other.a3);
    const b44 = a4.dot(other.a4);

    /* Create result coordinate */
    const b1 = new Coordinate(b11, b21, b31, b41);
    const b2 = new Coordinate(b12, b22, b32, b42);
    const b3 = new Coordinate(b13, b23, b33, b43);
    const b4 = new Coordinate(b14, b24, b34, b44);

    /* Create new matrix */
    const newMatrix = new Matrix(b1, b2, b3, b4);

    return newMatrix;
  }

  public multiplyCoordinate(coordinate: Coordinate): Coordinate {
    /* Unpack "this" matrix */
    const [a11, a21, a31, a41] = this.a1.getQuadruplet();
    const [a12, a22, a32, a42] = this.a2.getQuadruplet();
    const [a13, a23, a33, a43] = this.a3.getQuadruplet();
    const [a14, a24, a34, a44] = this.a4.getQuadruplet();

    /* Create transpose coordinate */
    const a1 = new Coordinate(a11, a12, a13, a14);
    const a2 = new Coordinate(a21, a22, a23, a24);
    const a3 = new Coordinate(a31, a32, a33, a34);
    const a4 = new Coordinate(a41, a42, a43, a44);

    /* Create result value */
    const x = a1.dot(coordinate);
    const y = a2.dot(coordinate);
    const z = a3.dot(coordinate);
    const w = a4.dot(coordinate);

    /* Create new coordinate */
    const newCoordinate = new Coordinate(x, y, z, w);

    return newCoordinate;
  }

  public inverse(): Matrix {
    const m11 = this.a1.x;
    const m12 = this.a1.y;
    const m13 = this.a1.z;
    const m14 = this.a1.w;
    const m21 = this.a2.x;
    const m22 = this.a2.y;
    const m23 = this.a2.z;
    const m24 = this.a2.w;
    const m31 = this.a3.x;
    const m32 = this.a3.y;
    const m33 = this.a3.z;
    const m34 = this.a3.w;
    const m41 = this.a4.x;
    const m42 = this.a4.y;
    const m43 = this.a4.z;
    const m44 = this.a4.w;

    /* Find 3x3 determinant of each term */
    const detm11 =
      m22 * m33 * m44 +
      m23 * m34 * m42 +
      m24 * m32 * m43 -
      m24 * m33 * m42 -
      m23 * m32 * m44 -
      m22 * m34 * m43;
    const detm12 =
      m21 * m33 * m44 +
      m23 * m34 * m41 +
      m24 * m31 * m43 -
      m24 * m33 * m41 -
      m23 * m31 * m44 -
      m21 * m34 * m43;
    const detm13 =
      m21 * m32 * m44 +
      m22 * m34 * m41 +
      m24 * m31 * m42 -
      m24 * m32 * m41 -
      m22 * m31 * m44 -
      m21 * m34 * m42;
    const detm14 =
      m21 * m32 * m43 +
      m22 * m33 * m41 +
      m23 * m31 * m42 -
      m23 * m32 * m41 -
      m22 * m31 * m43 -
      m21 * m33 * m42;
    const detm21 =
      m12 * m33 * m44 +
      m13 * m34 * m42 +
      m14 * m32 * m43 -
      m14 * m33 * m42 -
      m13 * m32 * m44 -
      m12 * m34 * m43;
    const detm22 =
      m11 * m33 * m44 +
      m13 * m34 * m41 +
      m14 * m31 * m43 -
      m14 * m33 * m41 -
      m13 * m31 * m44 -
      m11 * m34 * m43;
    const detm23 =
      m11 * m32 * m44 +
      m12 * m34 * m41 +
      m14 * m31 * m42 -
      m14 * m32 * m41 -
      m12 * m31 * m44 -
      m11 * m34 * m42;
    const detm24 =
      m11 * m32 * m43 +
      m12 * m33 * m41 +
      m13 * m31 * m42 -
      m13 * m32 * m41 -
      m12 * m31 * m43 -
      m11 * m33 * m42;
    const detm31 =
      m12 * m23 * m44 +
      m13 * m24 * m42 +
      m14 * m22 * m43 -
      m14 * m23 * m42 -
      m13 * m22 * m44 -
      m12 * m24 * m43;
    const detm32 =
      m11 * m23 * m44 +
      m13 * m24 * m41 +
      m14 * m21 * m43 -
      m14 * m23 * m41 -
      m13 * m21 * m44 -
      m11 * m24 * m42;
    const detm33 =
      m11 * m22 * m44 +
      m12 * m24 * m41 +
      m14 * m21 * m42 -
      m14 * m22 * m41 -
      m12 * m21 * m44 -
      m11 * m24 * m42;
    const detm34 =
      m11 * m22 * m43 +
      m12 * m23 * m41 +
      m13 * m21 * m42 -
      m13 * m22 * m41 -
      m12 * m21 * m43 -
      m11 * m23 * m42;
    const detm41 =
      m12 * m23 * m34 +
      m13 * m24 * m32 +
      m14 * m22 * m33 -
      m14 * m23 * m32 -
      m13 * m22 * m34 -
      m12 * m24 * m33;
    const detm42 =
      m11 * m23 * m34 +
      m13 * m24 * m31 +
      m14 * m21 * m33 -
      m14 * m23 * m31 -
      m13 * m21 * m34 -
      m11 * m24 * m33;
    const detm43 =
      m11 * m22 * m34 +
      m12 * m24 * m31 +
      m14 * m21 * m32 -
      m14 * m22 * m31 -
      m12 * m21 * m34 -
      m11 * m24 * m32;
    const detm44 =
      m11 * m22 * m33 +
      m12 * m23 * m31 +
      m13 * m21 * m32 -
      m13 * m22 * m31 -
      m12 * m21 * m33 -
      m11 * m23 * m32;

    const detA = m11 * detm11 - m21 * detm21 + m31 * detm31 - m41 * detm41;

    return new Matrix(
      new Coordinate(
        (1 / detA) * Math.pow(-1, 2) * detm11,
        (1 / detA) * Math.pow(-1, 3) * detm21,
        (1 / detA) * Math.pow(-1, 4) * detm31,
        (1 / detA) * Math.pow(-1, 5) * detm41
      ),
      new Coordinate(
        (1 / detA) * Math.pow(-1, 3) * detm12,
        (1 / detA) * Math.pow(-1, 4) * detm22,
        (1 / detA) * Math.pow(-1, 5) * detm32,
        (1 / detA) * Math.pow(-1, 6) * detm42
      ),
      new Coordinate(
        (1 / detA) * Math.pow(-1, 4) * detm13,
        (1 / detA) * Math.pow(-1, 5) * detm23,
        (1 / detA) * Math.pow(-1, 6) * detm33,
        (1 / detA) * Math.pow(-1, 7) * detm43
      ),
      new Coordinate(
        (1 / detA) * Math.pow(-1, 5) * detm14,
        (1 / detA) * Math.pow(-1, 6) * detm24,
        (1 / detA) * Math.pow(-1, 7) * detm34,
        (1 / detA) * Math.pow(-1, 8) * detm44
      )
    );
  }
}

export default Matrix;
