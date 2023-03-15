import createShader from "Utils/shader";
import createProgram from "Utils/program";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import Shape from "Objects/shape";
import Face from "Objects/face";
import Color from "Operations/color";
import Point from "Operations/point";
import ProjectionType from "Types/projection-type";
import ProjectionParams from "Types/projection-params";
import { degToRad, radToDeg } from "Utils/angle";

/* Create Program */
const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl");

const vertexShaderElement = document.getElementById("vertex-shader");
const fragmentShaderElement = document.getElementById("fragment-shader");

const vertexShaderSource = vertexShaderElement.textContent;
const fragmentShaderSource = fragmentShaderElement.textContent;

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);

const program = createProgram(gl, vertexShader, fragmentShader);

/* Setup Program */
gl.useProgram(program);

/* Setup Viewport */
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

/* Clear Color and Buffer */
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

/* Turn On Culling */
gl.enable(gl.CULL_FACE);

/* Enable the Depth Buffer */
gl.enable(gl.DEPTH_TEST);

/* Setup Buffer */
const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

/* Global Variables */
let object: Shape = new Shape(
  gl,
  program,
  positionBuffer,
  colorBuffer,
  [
    new Face(
      [
        new Point(0, 0, 0),
        new Point(0, 150, 0),
        new Point(30, 0, 0),
        new Point(0, 150, 0),
        new Point(30, 150, 0),
        new Point(30, 0, 0),
      ],
      new Color(200, 70, 120)
    ),
  ],
  100,
  100,
  0,
  degToRad(45),
  degToRad(45),
  degToRad(0),
  1,
  1,
  1
);
let projectionType: ProjectionType = "orthographic";
let projectionParams: ProjectionParams = {
  orthographic: {
    left: 0,
    right: (gl.canvas as HTMLCanvasElement).clientWidth,
    bottom: (gl.canvas as HTMLCanvasElement).clientHeight,
    top: 0,
    near: 400,
    far: -400,
  },
  perspective: {
    fieldOfView: degToRad(120),
    aspect:
      (gl.canvas as HTMLCanvasElement).clientWidth /
      (gl.canvas as HTMLCanvasElement).clientHeight,
    near: 5,
    far: 2000,
  },
  oblique: {
    factor: 0.5,
    angle: degToRad(45),
  },
};

/* Render Canvas */
const renderCanvas = () => {
  /* Clear Color and Buffer */
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  /* Render Object */
  object.render(projectionType, projectionParams[projectionType]);

  /* Render Recursively */
  window.requestAnimationFrame(renderCanvas);
};

/* Event Listener */
document.addEventListener("DOMContentLoaded", renderCanvas);
