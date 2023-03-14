import ShaderInterface from "Main/Interfaces/shader-interface";
import ShapeInterface from "Main/Interfaces/shape-interface";
import Point from "Main/Operations/point";
import Transformation from "Main/Operations/transformation";
import Projection from "Main/Operations/projection";
import ProjectionParams from "Main/Types/projection-params";
import ProjectionType from "Main/Types/projection-type";
import Face from "Objects/face";

class Shape implements ShapeInterface, ShaderInterface {
  constructor(
    public readonly gl: WebGLRenderingContext,
    public readonly program: WebGLProgram,
    public readonly positionBuffer: WebGLBuffer,
    public readonly colorBuffer: WebGLBuffer,
    public readonly arrayOfFace: Face[],
    public tx: number = 0,
    public ty: number = 0,
    public tz: number = 0,
    public angleX: number = 0,
    public angleY: number = 0,
    public angleZ: number = 0,
    public sx: number = 1,
    public sy: number = 1,
    public sz: number = 1
  ) {}

  public findCenter(): Point {
    let totalX = 0;
    let totalY = 0;
    let totalZ = 0;

    for (const f of this.arrayOfFace) {
      const [fX, fY, fZ] = f.findCenter().getTriplet();

      totalX += fX;
      totalY += fY;
      totalZ += fZ;
    }

    return new Point([
      totalX / this.arrayOfFace.length,
      totalY / this.arrayOfFace.length,
      totalZ / this.arrayOfFace.length,
    ]);
  }

  public addPosition(): void {
    const positionArray = this.arrayOfFace.flatMap((f) => f.getRawPosition());

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positionArray),
      this.gl.STATIC_DRAW
    );
  }

  public addColor(): void {
    const colorArray = this.arrayOfFace.flatMap((f) =>
      Array<readonly [number, number, number]>(f.arrayOfPoint.length)
        .fill(f.getRawColor())
        .flat()
    );

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(colorArray),
      this.gl.STATIC_DRAW
    );
  }

  public render<T extends ProjectionType>(
    projectionType: T,
    params: ProjectionParams[T]
  ): void {
    const positionLocation = this.gl.getAttribLocation(
      this.program,
      "a_position"
    );
    const colorLocation = this.gl.getAttribLocation(this.program, "a_color");
    const matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");

    /* Setup position */
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.addPosition();

    const positionSize = 3; /* 3 components per iteration */
    const positionType = this.gl.FLOAT; /* The data is 32 bit float */
    const positionNormalized = false; /* Don't normalize the data */
    const positionStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
    const positionOffset = 0; /* Start at the beginning of the buffer */
    this.gl.vertexAttribPointer(
      positionLocation,
      positionSize,
      positionType,
      positionNormalized,
      positionStride,
      positionOffset
    );

    /* Setup color */
    this.gl.enableVertexAttribArray(colorLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.addColor();

    const colorSize = 3; /* 3 components per iteration */
    const colorType = this.gl.FLOAT; /* The data is 32 bit float */
    const colorNormalized = false; /* Don't normalize the data */
    const colorStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
    const colorOffset = 0; /* Start at the beginning of the buffer */
    this.gl.vertexAttribPointer(
      colorLocation,
      colorSize,
      colorType,
      colorNormalized,
      colorStride,
      colorOffset
    );

    let matrix = Transformation.general(
      this.tx,
      this.ty,
      this.tz,
      this.angleX,
      this.angleY,
      this.angleZ,
      this.sx,
      this.sy,
      this.sz,
      this.findCenter()
    );

    switch (projectionType) {
      case "orthographic":
        const {
          left,
          right,
          bottom,
          top,
          near: nearOrthograpic,
          far: farOrthographic,
        } = params as ProjectionParams["orthographic"];

        matrix = Projection.orthographic(
          left,
          right,
          bottom,
          top,
          nearOrthograpic,
          farOrthographic
        ).multiplyMatrix(matrix);
        break;
      case "perspective":
        const {
          fieldOfView,
          aspect,
          near: nearPerspective,
          far: farPerspective,
        } = params as ProjectionParams["perspective"];

        matrix = Projection.perspective(
          fieldOfView,
          aspect,
          nearPerspective,
          farPerspective
        ).multiplyMatrix(matrix);
        break;
      case "oblique":
        const { factor, angle } = params as ProjectionParams["oblique"];

        matrix = Projection.oblique(factor, angle).multiplyMatrix(matrix);
        break;
    }

    const rawMatrix = matrix.flatten();

    this.gl.uniformMatrix4fv(matrixLocation, false, rawMatrix);

    /* Draw Shape */
    const primitiveType = this.gl.TRIANGLE_STRIP;
    const offset = 0;
    const count = this.arrayOfFace.flatMap((f) => f.arrayOfPoint).length;

    this.gl.drawArrays(primitiveType, offset, count);
  }
}

export default Shape;
