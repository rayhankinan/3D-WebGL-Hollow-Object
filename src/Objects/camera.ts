import CameraInterface from "Interfaces/camera-interface";
import Point from "Operations/point";
import Coordinate from "Operations/coordinate";
import Matrix from "Operations/matrix";
import Transformation from "Operations/transformation";
import Vector from "Operations/vector";

class Camera implements CameraInterface {
  public constructor(
    public radius: number,
    public angle: number,
    public center: Point
  ) {}

  public rotate(angle: number): void {
    this.angle = angle;
  }

  public moveRadius(distance: number): void {
    this.radius = distance;
  }

  lookAt(): Matrix {
    const initialMatrix = Transformation.rotationY(this.angle).multiplyMatrix(
      Transformation.translation(0, 0, this.radius)
    );
    const cameraPosition = initialMatrix.a4;

    const eyeVector = new Vector(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );

    const centerVector = new Vector(
      this.center.x,
      this.center.y,
      this.center.z
    );
    const upVector = new Vector(0, 1, 0);

    const zAxis = eyeVector.subtract(centerVector).normalize();
    const xAxis = upVector.cross(zAxis).normalize();
    const yAxis = zAxis.cross(xAxis).normalize();

    const cameraMatrix = new Matrix(
      new Coordinate(xAxis.x, xAxis.y, xAxis.z, 0),
      new Coordinate(yAxis.x, yAxis.y, yAxis.z, 0),
      new Coordinate(zAxis.x, zAxis.y, zAxis.z, 0),
      new Coordinate(eyeVector.x, eyeVector.y, eyeVector.z, 1)
    );

    return cameraMatrix.inverse();
  }
}

export default Camera;
