import createShader from "Utils/shader";
import createProgram from "Utils/program";
import { degToRad, radToDeg } from "Utils/angle";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import Shape from "Objects/shape";
import Face from "Objects/face";
import Color from "Operations/color";
import Point from "Operations/point";
import ProjectionType from "Types/projection-type";
import ProjectionParams from "Types/projection-params";
import FileHandling from "Files/file-handling";
import FileSystem from "./Files/file-system";
import ShapeInterface from "./Interfaces/shape-interface";

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

/* Get HTML Element */
const sliderTranslateX = document.getElementById(
  "slider-translate-x"
) as HTMLInputElement;
const labelTranslateX = document.getElementById("label-translate-x");

const sliderTranslateY = document.getElementById(
  "slider-translate-y"
) as HTMLInputElement;
const labelTranslateY = document.getElementById("label-translate-y");

const sliderTranslateZ = document.getElementById(
  "slider-translate-z"
) as HTMLInputElement;
const labelTranslateZ = document.getElementById("label-translate-z");

const sliderAngleX = document.getElementById(
  "slider-angle-x"
) as HTMLInputElement;
const labelAngleX = document.getElementById("label-angle-x");

const sliderAngleY = document.getElementById(
  "slider-angle-y"
) as HTMLInputElement;
const labelAngleY = document.getElementById("label-angle-y");

const sliderAngleZ = document.getElementById(
  "slider-angle-z"
) as HTMLInputElement;
const labelAngleZ = document.getElementById("label-angle-z");

const sliderScaleX = document.getElementById(
  "slider-scale-x"
) as HTMLInputElement;
const labelScaleX = document.getElementById("label-scale-x");

const sliderScaleY = document.getElementById(
  "slider-scale-y"
) as HTMLInputElement;
const labelScaleY = document.getElementById("label-scale-y");

const sliderScaleZ = document.getElementById(
  "slider-scale-z"
) as HTMLInputElement;
const labelScaleZ = document.getElementById("label-scale-z");

const loadButton = document.getElementById("load-btn");
const saveButton = document.getElementById("save-btn");

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
  720,
  270,
  0,
  degToRad(30),
  degToRad(30),
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

/* Initialize Default Value */
const initializeDefaultValue = () => {
  sliderTranslateX.valueAsNumber = object.tx;
  labelTranslateX.textContent = object.tx.toString();

  sliderTranslateY.valueAsNumber = object.ty;
  labelTranslateY.textContent = object.ty.toString();

  sliderTranslateZ.valueAsNumber = object.tz;
  labelTranslateZ.textContent = object.tz.toString();

  sliderAngleX.valueAsNumber = radToDeg(object.angleX);
  labelAngleX.textContent = radToDeg(object.angleX).toString();

  sliderAngleY.valueAsNumber = radToDeg(object.angleY);
  labelAngleY.textContent = radToDeg(object.angleY).toString();

  sliderAngleZ.valueAsNumber = radToDeg(object.angleZ);
  labelAngleZ.textContent = radToDeg(object.angleZ).toString();

  sliderScaleX.valueAsNumber = object.sx;
  labelScaleX.textContent = object.sx.toString();

  sliderScaleY.valueAsNumber = object.sy;
  labelScaleY.textContent = object.sy.toString();

  sliderScaleZ.valueAsNumber = object.sz;
  labelScaleZ.textContent = object.sz.toString();
};

/* Event Listener */
sliderTranslateX.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelTranslateX.textContent = delta.toString();
  object.moveX(delta);
});

sliderTranslateY.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelTranslateY.textContent = delta.toString();
  object.moveY(delta);
});

sliderTranslateZ.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelTranslateZ.textContent = delta.toString();
  object.moveZ(delta);
});

sliderAngleX.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelAngleX.textContent = delta.toString();
  object.rotateX(degToRad(delta));
});

sliderAngleY.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelAngleY.textContent = delta.toString();
  object.rotateY(degToRad(delta));
});

sliderAngleZ.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelAngleZ.textContent = delta.toString();
  object.rotateZ(degToRad(delta));
});

sliderScaleX.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelScaleX.textContent = delta.toString();
  object.scaleX(delta);
});

sliderScaleY.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelScaleY.textContent = delta.toString();
  object.scaleY(delta);
});

sliderScaleZ.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelScaleZ.textContent = delta.toString();
  object.scaleZ(delta);
});

loadButton.addEventListener("click", () => {
  FileHandling.upload((text) => {
    object = FileSystem.load(text, {
      gl,
      program,
      positionBuffer,
      colorBuffer,
    });

    initializeDefaultValue();
  });
});

saveButton.addEventListener("click", () => {
  FileHandling.download(FileSystem.serialize(object));
});

document.addEventListener("DOMContentLoaded", () => {
  initializeDefaultValue();
  renderCanvas();
});
