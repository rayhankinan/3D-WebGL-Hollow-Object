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
let tx: number = 100;
let ty: number = 100;
let tz: number = 0;
let angleX: number = degToRad(45);
let angleY: number = degToRad(45);
let angleZ: number = degToRad(0);
let sx: number = 1;
let sy: number = 1;
let sz: number = 1;
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
    new Face(
      [
        new Point(30, 0, 0),
        new Point(30, 30, 0),
        new Point(100, 0, 0),
        new Point(30, 30, 0),
        new Point(100, 30, 0),
        new Point(100, 0, 0),
      ],
      new Color(200, 70, 120)
    ),
    new Face(
      [
        new Point(30, 60, 0),
        new Point(30, 90, 0),
        new Point(67, 60, 0),
        new Point(30, 90, 0),
        new Point(67, 90, 0),
        new Point(67, 60, 0),
      ],
      new Color(200, 70, 120)
    ),
    new Face(
      [
        new Point(0, 0, 30),
        new Point(30, 0, 30),
        new Point(0, 150, 30),
        new Point(0, 150, 30),
        new Point(30, 0, 30),
        new Point(30, 150, 30),
      ],
      new Color(80, 70, 200)
    ),
    new Face(
      [
        new Point(30, 0, 30),
        new Point(100, 0, 30),
        new Point(30, 30, 30),
        new Point(30, 30, 30),
        new Point(100, 0, 30),
        new Point(100, 30, 30),
      ],
      new Color(80, 70, 200)
    ),
    new Face(
      [
        new Point(30, 60, 30),
        new Point(67, 60, 30),
        new Point(30, 90, 30),
        new Point(30, 90, 30),
        new Point(67, 60, 30),
        new Point(67, 90, 30),
      ],
      new Color(80, 70, 200)
    ),
    new Face(
      [
        new Point(0, 0, 0),
        new Point(100, 0, 0),
        new Point(100, 0, 30),
        new Point(0, 0, 0),
        new Point(100, 0, 30),
        new Point(0, 0, 30),
      ],
      new Color(70, 200, 210)
    ),
    new Face(
      [
        new Point(100, 0, 0),
        new Point(100, 30, 0),
        new Point(100, 30, 30),
        new Point(100, 0, 0),
        new Point(100, 30, 30),
        new Point(100, 0, 30),
      ],
      new Color(200, 200, 70)
    ),
    new Face(
      [
        new Point(30, 30, 0),
        new Point(30, 30, 30),
        new Point(100, 30, 30),
        new Point(30, 30, 0),
        new Point(100, 30, 30),
        new Point(100, 30, 0),
      ],
      new Color(210, 100, 70)
    ),
    new Face(
      [
        new Point(30, 30, 0),
        new Point(30, 60, 30),
        new Point(30, 30, 30),
        new Point(30, 30, 0),
        new Point(30, 60, 0),
        new Point(30, 60, 30),
      ],
      new Color(210, 160, 70)
    ),
    new Face(
      [
        new Point(30, 60, 0),
        new Point(67, 60, 30),
        new Point(30, 60, 30),
        new Point(30, 60, 0),
        new Point(67, 60, 0),
        new Point(67, 60, 30),
      ],
      new Color(70, 180, 210)
    ),
    new Face(
      [
        new Point(67, 60, 0),
        new Point(67, 90, 30),
        new Point(67, 60, 30),
        new Point(67, 60, 0),
        new Point(67, 90, 0),
        new Point(67, 90, 30),
      ],
      new Color(100, 70, 210)
    ),
    new Face(
      [
        new Point(30, 90, 0),
        new Point(30, 90, 30),
        new Point(67, 90, 30),
        new Point(30, 90, 0),
        new Point(67, 90, 30),
        new Point(67, 90, 0),
      ],
      new Color(76, 210, 100)
    ),
    new Face(
      [
        new Point(30, 90, 0),
        new Point(30, 150, 30),
        new Point(30, 90, 30),
        new Point(30, 90, 0),
        new Point(30, 150, 0),
        new Point(30, 150, 30),
      ],
      new Color(140, 210, 80)
    ),
    new Face(
      [
        new Point(0, 150, 0),
        new Point(0, 150, 30),
        new Point(30, 150, 30),
        new Point(0, 150, 0),
        new Point(30, 150, 30),
        new Point(30, 150, 0),
      ],
      new Color(90, 130, 110)
    ),
    new Face(
      [
        new Point(0, 0, 0),
        new Point(0, 0, 30),
        new Point(0, 150, 30),
        new Point(0, 0, 0),
        new Point(0, 150, 30),
        new Point(0, 150, 0),
      ],
      new Color(160, 160, 220)
    ),
  ],
  tx,
  ty,
  tz,
  angleX,
  angleY,
  angleZ,
  sx,
  sy,
  sz
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
