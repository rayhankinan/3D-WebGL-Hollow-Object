function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = width;
  canvas.height = height;
}

export default resizeCanvasToDisplaySize;
