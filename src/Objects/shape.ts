import ShaderInterface from "Main/Interfaces/shader-interface";
import ShapeInterface from "Main/Interfaces/shape-interface";
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
}

export default Shape;
