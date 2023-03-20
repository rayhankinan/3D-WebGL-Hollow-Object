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

  /* SUDAH BISA */
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

  /* SUDAH BISA */
  public static oblique(
    factor: number, 
    angle: number,     
    ortho_left: number,
    ortho_right: number,
    ortho_bottom: number,
    ortho_top: number,
    ortho_near: number,
    ortho_far: number): Matrix {
    // Calculate orthographic projection matrix
    const pOrtho = this.orthographic(ortho_left, ortho_right, ortho_bottom, ortho_top, ortho_near, ortho_far)

    const cotAngle = 1/Math.tan(angle);
    
    // Calculate oblique projection matrix
    const pObli1 = new Coordinate(1, 0, 0, 0);
    const pObli2 = new Coordinate(0, 1, 0, 0);
    const pObli3 = new Coordinate(factor*cotAngle, factor*cotAngle, 1, 0);
    const pObli4 = new Coordinate(0, 0, 0, 1);
    const pOblique = new Matrix(pObli1, pObli2, pObli3, pObli4);
    
    // Calculate final projection matrix using oblique
    const projectionMatrix = pOblique.multiplyMatrix(pOrtho);

    return projectionMatrix;
  }
}

export default Projection;
