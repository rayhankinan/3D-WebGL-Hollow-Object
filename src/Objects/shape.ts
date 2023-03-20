import ShapeInterface from "Main/Interfaces/shape-interface";
import Point from "Main/Operations/point";
import Transformation from "Main/Operations/transformation";
import Projection from "Main/Operations/projection";
import ProjectionParams from "Main/Types/projection-params";
import ProjectionType from "Main/Types/projection-type";
import Face from "Objects/face";
import Camera from "Main/Operations/camera";

class Shape implements ShapeInterface {
  constructor(
    public readonly arrayOfFace: Face[],
    public tx: number,
    public ty: number,
    public tz: number,
    public angleX: number,
    public angleY: number,
    public angleZ: number,
    public sx: number,
    public sy: number,
    public sz: number
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

    return new Point(
      totalX / this.arrayOfFace.length,
      totalY / this.arrayOfFace.length,
      totalZ / this.arrayOfFace.length
    );
  }

  public findLength(): number {
    return Math.max(
      ...this.arrayOfFace.map((f) => f.findMaxX() - f.findMinX())
    );
  }

  public findWidth(): number {
    return Math.max(
      ...this.arrayOfFace.map((f) => f.findMaxY() - f.findMinY())
    );
  }

  public findDepth(): number {
    return Math.max(
      ...this.arrayOfFace.map((f) => f.findMaxZ() - f.findMinZ())
    );
  }

  public moveX(delta: number): void {
    this.tx = delta;
  }

  public moveY(delta: number): void {
    this.ty = delta;
  }

  public moveZ(delta: number): void {
    this.tz = delta;
  }

  public rotateX(angle: number): void {
    this.angleX = angle;
  }

  public rotateY(angle: number): void {
    this.angleY = angle;
  }

  public rotateZ(angle: number): void {
    this.angleZ = angle;
  }

  public scaleX(delta: number): void {
    this.sx = delta;
  }

  public scaleY(delta: number): void {
    this.sy = delta;
  }

  public scaleZ(delta: number): void {
    this.sz = delta;
  }

  public addPosition(gl: WebGLRenderingContext): void {
    const positionArray = this.arrayOfFace.flatMap((f) => f.getRawPosition());

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(positionArray),
      gl.STATIC_DRAW
    );
  }

  public addColor(gl: WebGLRenderingContext): void {
    const colorArray = this.arrayOfFace.flatMap((f) =>
      Array<readonly [number, number, number]>(f.arrayOfPoint.length)
        .fill(f.getRawColor())
        .flat()
    );

    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colorArray), gl.STATIC_DRAW);
  }

  public render<T extends ProjectionType>(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    positionBuffer: WebGLBuffer,
    colorBuffer: WebGLBuffer,
    projectionType: T,
    params: ProjectionParams[T],
    camera: Camera
  ): void {
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const colorLocation = gl.getAttribLocation(program, "a_color");
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");

    /* Setup position */
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    this.addPosition(gl);

    const positionSize = 3; /* 3 components per iteration */
    const positionType = gl.FLOAT; /* The data is 32 bit float */
    const positionNormalized = false; /* Don't normalize the data */
    const positionStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
    const positionOffset = 0; /* Start at the beginning of the buffer */
    gl.vertexAttribPointer(
      positionLocation,
      positionSize,
      positionType,
      positionNormalized,
      positionStride,
      positionOffset
    );

    /* Setup color */
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    this.addColor(gl);

    const colorSize = 3; /* 3 components per iteration */
    const colorType = gl.UNSIGNED_BYTE; /* The data is 8 bit unsigned values */
    const colorNormalized = true; /* Normalize the data */
    const colorStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
    const colorOffset = 0; /* Start at the beginning of the buffer */
    gl.vertexAttribPointer(
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
        const { factor, angle, ortho_left, ortho_right, 
                ortho_bottom, ortho_top, ortho_near, 
                ortho_far } = params as ProjectionParams["oblique"];

        matrix = Projection.oblique(factor, angle, ortho_left, ortho_right, 
                                    ortho_bottom, ortho_top, ortho_near, 
                                    ortho_far).multiplyMatrix(matrix);
        break;
    }

    camera.cameraMatrix = camera.lookAt();
    camera.generateViewMatrix();
    var viewModelMatrix = matrix.multiplyMatrix(camera.viewMatrix);
    const rawMatrix = viewModelMatrix.flatten();

    gl.uniformMatrix4fv(matrixLocation, false, rawMatrix);

    /* Draw Shape */
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = this.arrayOfFace.flatMap((f) => f.arrayOfPoint).length;

    gl.drawArrays(primitiveType, offset, count);
  }
}

export default Shape;
