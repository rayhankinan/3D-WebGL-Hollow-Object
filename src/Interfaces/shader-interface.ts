interface ShaderInterface {
  readonly gl: WebGLRenderingContext;
  readonly program: WebGLProgram;
  readonly positionBuffer: WebGLBuffer;
  readonly colorBuffer: WebGLBuffer;
}

export default ShaderInterface;
