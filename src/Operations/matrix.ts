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
}

export default Matrix;
