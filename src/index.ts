import createShader from "Utils/shader";
import createProgram from "Utils/program";
import { degToRad, radToDeg } from "Utils/angle";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import Shape from "Objects/shape";
import ProjectionType from "Types/projection-type";
import ProjectionParams from "Types/projection-params";
import FileHandling from "Files/file-handling";
import FileSystem from "Files/file-system";
import generateDefaultShape from "Main/default-shape";
import Camera from "./Operations/camera";

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
/* Transformation elements */
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

/* Camera control elements */
const sliderCenterX = document.getElementById(
  "slider-center-x"
) as HTMLInputElement;
const labelCenterX = document.getElementById("label-center-x");

const sliderCenterY = document.getElementById(
  "slider-center-y"
) as HTMLInputElement;
const labelCenterY = document.getElementById("label-center-y");

const sliderCenterZ = document.getElementById(
  "slider-center-z"
) as HTMLInputElement;
const labelCenterZ = document.getElementById("label-center-z");

const sliderUpX = document.getElementById("slider-up-x") as HTMLInputElement;
const labelUpX = document.getElementById("label-up-x");

const sliderUpY = document.getElementById("slider-up-y") as HTMLInputElement;
const labelUpY = document.getElementById("label-up-y");

const sliderUpZ = document.getElementById("slider-up-z") as HTMLInputElement;
const labelUpZ = document.getElementById("label-up-z");

const sliderCamRadius = document.getElementById(
  "slider-radius"
) as HTMLInputElement;
const labelCamRadius = document.getElementById("label-radius");

const sliderCamAngle = document.getElementById(
  "slider-angle"
) as HTMLInputElement;
const labelCamAngle = document.getElementById("label-angle");

const loadButton = document.getElementById("load-btn");
const saveButton = document.getElementById("save-btn");
const shadingModeButton = document.getElementById("shading-mode-btn");
const animationModeButton = document.getElementById("animation-mode-btn");

const listOfProjection = document.getElementById(
  "list-of-projection"
) as HTMLSelectElement;

const resetButton = document.getElementById("reset-btn");

/* Global Variables */
let object: Shape = generateDefaultShape();
let projectionType: ProjectionType = "orthographic";
let projectionParams: ProjectionParams = {
  orthographic: {
    left: 0,
    right: (gl.canvas as HTMLCanvasElement).clientWidth,
    bottom: (gl.canvas as HTMLCanvasElement).clientHeight,
    top: 0,
    near: 1000,
    far: -1000,
  },
  perspective: {
    fieldOfView: degToRad(60),
    aspect:
      (gl.canvas as HTMLCanvasElement).clientWidth /
      (gl.canvas as HTMLCanvasElement).clientHeight,
    near: 1,
    far: 2000,
  },
  oblique: {
    factor: 0.1,
    angle: degToRad(15),
    ortho_left: 0,
    ortho_right: (gl.canvas as HTMLCanvasElement).clientWidth,
    ortho_bottom: (gl.canvas as HTMLCanvasElement).clientHeight,
    ortho_top: 0,
    ortho_near: 1000,
    ortho_far: -1000,
  },
};
let camera: Camera = new Camera();
let shader = false;
let animation = false;
let angleY = sliderAngleY.valueAsNumber;

/* Render Canvas */
const renderCanvas = () => {
  /* Clear Color and Buffer */
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  /* Render Object */
  object.render(
    gl,
    program,
    positionBuffer,
    colorBuffer,
    projectionType,
    projectionParams[projectionType],
    camera
  );

  /* Update angle if animation is enabled */
  if (animation) {
    angleY = (angleY + 1) % 360;
    object.rotateY(degToRad(angleY));

    sliderAngleY.valueAsNumber = angleY;
    labelAngleY.textContent = angleY.toString();
  } else {
    angleY = sliderAngleY.valueAsNumber;
  }

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

  sliderCenterX.valueAsNumber = camera.targetX;
  labelCenterX.textContent = camera.targetX.toString();

  sliderCenterY.valueAsNumber = camera.targetY;
  labelCenterY.textContent = camera.targetY.toString();

  sliderCenterZ.valueAsNumber = camera.targetZ;
  labelCenterZ.textContent = camera.targetZ.toString();

  sliderUpX.valueAsNumber = camera.upX;
  labelUpX.textContent = camera.upX.toString();

  sliderUpY.valueAsNumber = camera.upY;
  labelUpY.textContent = camera.upY.toString();

  sliderUpZ.valueAsNumber = camera.upZ;
  labelUpZ.textContent = camera.upZ.toString();

  sliderCamRadius.valueAsNumber = camera.radius;
  labelCamRadius.textContent = camera.radius.toString();

  sliderCamAngle.valueAsNumber = camera.angle;
  labelCamAngle.textContent = camera.angle.toString();

  shadingModeButton.textContent = "OFF";
  shadingModeButton.classList.remove("active");

  animationModeButton.textContent = "OFF";
  animationModeButton.classList.remove("active");
  animation = false;
};

/* Event Listener */
/* Transformation Listener */
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

/* Camera control listener */
sliderCenterX.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCenterX.textContent = delta.toString();
  camera.targetX = delta;
});

sliderCenterY.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCenterY.textContent = delta.toString();
  camera.targetY = delta;
});

sliderCenterZ.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCenterZ.textContent = delta.toString();
  camera.targetZ = delta;
});

sliderUpX.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelUpX.textContent = delta.toString();
  camera.upX = delta;
});

sliderUpY.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelUpY.textContent = delta.toString();
  camera.upY = delta;
});

sliderUpZ.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelUpZ.textContent = delta.toString();
  camera.upZ = delta;
});

sliderCamRadius.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCamRadius.textContent = delta.toString();
  camera.radius = delta;
});

sliderCamAngle.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCamAngle.textContent = delta.toString();
  camera.angle = degToRad(delta);
});

loadButton.addEventListener("click", () => {
  FileHandling.upload((text) => {
    object = FileSystem.loadShape(text);

    initializeDefaultValue();
  });
});

saveButton.addEventListener("click", () => {
  FileHandling.download(FileSystem.serializeShape(object));
});

shadingModeButton.addEventListener("click", () => {
  if (!shader) {
    shader = true;
    shadingModeButton.classList.add("active");
    shadingModeButton.textContent = "ON";
  } else {
    shader = false;
    shadingModeButton.classList.remove("active");
    shadingModeButton.textContent = "OFF";
  }
});

animationModeButton.addEventListener("click", () => {
  if (!animation) {
    animationModeButton.classList.add("active");
    animationModeButton.textContent = "ON";

    animation = true;
  } else {
    animationModeButton.classList.remove("active");
    animationModeButton.textContent = "OFF";

    animation = false;
  }
});

listOfProjection.addEventListener("change", () => {
  const newProjectionType = listOfProjection.selectedOptions[0]
    .value as ProjectionType;

  projectionType = newProjectionType;
});

resetButton.addEventListener("click", () => {
  initializeDefaultValue();
});

document.addEventListener("DOMContentLoaded", () => {
  initializeDefaultValue();
  renderCanvas();
});
