function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const ext = gl.getExtension("OES_element_index_uint");
  if (!ext) {
    throw Error("OES_element_index_uint is not supported!");
  }

  const success = gl.getProgramParameter(program, gl.LINK_STATUS) as boolean;
  if (!success) {
    gl.deleteProgram(program);

    throw Error("Failed to link program!");
  }

  return program;
}

export default createProgram;
