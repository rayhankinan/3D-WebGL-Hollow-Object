import Coordinate from "./coordinate";
import Matrix from "./matrix";
import Vector from "./vector";

class Camera {
  public cameraMatrix = new Matrix(
    new Coordinate(1, 0, 0, 0),
    new Coordinate(0, 1, 0, 0),
    new Coordinate(0, 0, 1, 0),
    new Coordinate(0, 0, 0, 1)
  );
  public eye = new Vector(0, 0, 20);
  public center = new Vector(0, 0, 0);
  public up = new Vector(0, 1, 0);
  public viewMatrix: Matrix;

  setEyePosition(idx: number, value: number) {
    if (idx === 0) {
      this.eye.x = value;
    } else if (idx === 1) {
      this.eye.y = value;
    } else if (idx === 2) {
      this.eye.z = value;
    }
  }

  setCenterPosition(idx: number, value: number) {
    if (idx === 0) {
      this.center.x = value;
    } else if (idx === 1) {
      this.center.y = value;
    } else if (idx === 2) {
      this.center.z = value;
    }
  }

  setUpPosition(idx: number, value: number) {
    if (idx === 0) {
      this.up.x = value;
    } else if (idx === 1) {
      this.up.y = value;
    } else if (idx === 2) {
      this.up.z = value;
    }
  }

  lookAt(): Matrix {
    var vectorOp1 = this.eye.subtract(this.center);
    var zAxis = vectorOp1.normalize();

    var vectorOp2 = this.up.cross(zAxis);
    var xAxis = vectorOp2.normalize();

    var vectorOp3 = zAxis.cross(xAxis);
    var yAxis = vectorOp3.normalize();

    return new Matrix(
      new Coordinate(xAxis.x, xAxis.y, xAxis.z, 0),
      new Coordinate(yAxis.x, yAxis.y, yAxis.z, 0),
      new Coordinate(zAxis.x, zAxis.y, zAxis.z, 0),
      new Coordinate(this.eye.x, this.eye.y, this.eye.z, 1)
    );
  }

  generateViewMatrix() {
    this.viewMatrix = this.cameraMatrix.inverse();
  }
}

export default Camera;
