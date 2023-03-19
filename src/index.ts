import createShader from "Utils/shader";
import createProgram from "Utils/program";
import { degToRad, radToDeg } from "Utils/angle";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import Shape from "Objects/shape";
import ProjectionType from "Types/projection-type";
import ProjectionParams from "Types/projection-params";
import FileHandling from "Files/file-handling";
import FileSystem from "Files/file-system";
import DEFAULT_SHAPE from "Main/default-shape";
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
const sliderEyeX = document.getElementById("slider-eye-x") as HTMLInputElement;
const labelEyeX = document.getElementById("label-eye-x");

const sliderEyeY = document.getElementById("slider-eye-y") as HTMLInputElement;
const labelEyeY = document.getElementById("label-eye-y");

const sliderEyeZ = document.getElementById("slider-eye-z") as HTMLInputElement;
const labelEyeZ = document.getElementById("label-eye-z");

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

const loadButton = document.getElementById("load-btn");
const saveButton = document.getElementById("save-btn");

const shadingModeButton = document.getElementById("shading-mode-btn");

const animationModeButton = document.getElementById("animation-mode-btn");

const listOfProjection = document.getElementById(
  "list-of-projection"
) as HTMLSelectElement;

/* Global Variables */
let object: Shape = DEFAULT_SHAPE;
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
    fieldOfView: degToRad(60),
    aspect:
      (gl.canvas as HTMLCanvasElement).clientWidth /
      (gl.canvas as HTMLCanvasElement).clientHeight,
    near: 1,
    far: 2000,
  },
  oblique: {
    factor: 0.5,
    angle: degToRad(45),
  },
};
let camera = new Camera();
let shader = false;
let animation = false;
let AngleY = sliderAngleY.valueAsNumber;
// Set custom lookAt numbers

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

  /* Update Angle if animation is enabled */
  if (animation) {
    AngleY =  (AngleY + 1) % 360;
    sliderAngleY.valueAsNumber = AngleY;
    labelAngleY.textContent = AngleY.toString();
    object.rotateY(degToRad(AngleY));
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

  sliderEyeX.valueAsNumber = camera.eye.x;
  labelEyeX.textContent = camera.eye.x.toString();

  sliderEyeY.valueAsNumber = camera.eye.y;
  labelEyeY.textContent = camera.eye.y.toString();

  sliderEyeZ.valueAsNumber = camera.eye.z;
  labelEyeZ.textContent = camera.eye.z.toString();

  sliderCenterX.valueAsNumber = camera.center.x;
  labelCenterX.textContent = camera.center.x.toString();

  sliderCenterY.valueAsNumber = camera.center.y;
  labelCenterY.textContent = camera.center.y.toString();

  sliderCenterZ.valueAsNumber = camera.center.z;
  labelCenterZ.textContent = camera.center.z.toString();

  sliderUpX.valueAsNumber = camera.up.x;
  labelUpX.textContent = camera.up.x.toString();

  sliderUpY.valueAsNumber = camera.up.y;
  labelUpY.textContent = camera.up.y.toString();

  sliderUpZ.valueAsNumber = camera.up.z;
  labelUpZ.textContent = camera.up.z.toString();

  sliderCamRadius.valueAsNumber = 0;
  labelCamRadius.textContent = "0";

  shadingModeButton.textContent = "OFF";

  animationModeButton.textContent = "OFF";
};

/* Event Listener */
/* Transformation listener */
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
sliderEyeX.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelEyeX.textContent = delta.toString();
  camera.setEyePosition(0, delta);
});

sliderEyeY.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelEyeY.textContent = delta.toString();
  camera.setEyePosition(1, delta);
});

sliderEyeZ.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelEyeZ.textContent = delta.toString();
  camera.setEyePosition(2, delta);
});

sliderCenterX.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCenterX.textContent = delta.toString();
  camera.setCenterPosition(0, delta);
});

sliderCenterY.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCenterY.textContent = delta.toString();
  camera.setCenterPosition(1, delta);
});

sliderCenterZ.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCenterZ.textContent = delta.toString();
  camera.setCenterPosition(2, delta);
});

sliderUpX.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelUpX.textContent = delta.toString();
  camera.setUpPosition(0, delta);
});

sliderUpY.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelUpY.textContent = delta.toString();
  camera.setUpPosition(1, delta);
});

sliderUpZ.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelUpZ.textContent = delta.toString();
  camera.setUpPosition(2, delta);
});

sliderCamRadius.addEventListener("input", (event) => {
  const delta = (event.target as HTMLInputElement).valueAsNumber;

  labelCamRadius.textContent = delta.toString();
  console.log(delta);
  camera.setRadiusRange(delta);
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
    animation = true;
    animationModeButton.textContent = "ON"
  }
  else {
    animation = false;
    animationModeButton.textContent = "OFF"
  }
});

listOfProjection.addEventListener("change", (event) => {
  const newProjectionType = listOfProjection.selectedOptions[0]
    .value as ProjectionType;

  projectionType = newProjectionType;
});

document.addEventListener("DOMContentLoaded", () => {
  initializeDefaultValue();
  renderCanvas();
});
