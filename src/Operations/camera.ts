import CameraInterface from "Interfaces/camera-interface";
import Coordinate from "Operations/coordinate";
import Matrix from "Operations/matrix";
import Transformation from "Operations/transformation";
import Vector from "Operations/vector";

class Camera implements CameraInterface {
  public constructor(
    public radius: number = 50,
    public angle: number = 0,
    public targetX: number = 0,
    public targetY: number = 0,
    public targetZ: number = 0,
    public upX: number = 0,
    public upY: number = 1,
    public upZ: number = 0
  ) {}

  lookAt(): Matrix {
    const initialMatrix = Transformation.rotationY(this.angle).multiplyMatrix(
      Transformation.translation(0, 0, this.radius)
    );
    const cameraPosition = initialMatrix.a4;

    const eye = new Vector(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
    const center = new Vector(this.targetX, this.targetY, this.targetZ);
    const up = new Vector(this.upX, this.upY, this.upZ);

    const zAxis = eye.subtract(center).normalize();
    const xAxis = up.cross(zAxis).normalize();
    const yAxis = zAxis.cross(xAxis).normalize();

    const cameraMatrix = new Matrix(
      new Coordinate(xAxis.x, xAxis.y, xAxis.z, 0),
      new Coordinate(yAxis.x, yAxis.y, yAxis.z, 0),
      new Coordinate(zAxis.x, zAxis.y, zAxis.z, 0),
      new Coordinate(eye.x, eye.y, eye.z, 1)
    );

    return cameraMatrix.inverse();
  }
}

export default Camera;
