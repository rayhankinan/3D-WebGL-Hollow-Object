import Shape from "Objects/shape";
import Face from "Objects/face";
import Point from "Operations/point";
import Color from "Operations/color";
import { degToRad } from "Utils/angle";

function generate_default_shape() { 
  return new Shape(
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
}

export default generate_default_shape;
