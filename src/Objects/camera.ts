import CameraInterface from "Interfaces/camera-interface";
import Coordinate from "Operations/coordinate";
import Matrix from "Operations/matrix";
import Transformation from "Operations/transformation";
import Vector from "Operations/vector";
import Shape from "./shape";

class Camera implements CameraInterface {
  public constructor(public radius: number, public angle: number) {}

  public rotate(angle: number): void {
    this.angle = angle;
  }

  public moveRadius(distance: number): void {
    this.radius = distance;
  }

  lookAt(shape: Shape): Matrix {
    const initialMatrix = Transformation.rotationY(this.angle).multiplyMatrix(
      Transformation.translation(0, 0, this.radius)
    );
    const cameraPosition = initialMatrix.a4;
    const eye = new Vector(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );

    const centerPoint = shape.findCenter();
    const center = new Vector(centerPoint.x, centerPoint.y, centerPoint.z);

    const up = new Vector(0, 1, 0);

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
