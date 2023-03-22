import Shape from "Objects/shape";
import Face from "Objects/face";
import Point from "Operations/point";
import Color from "Operations/color";
import { degToRad } from "Utils/angle";
import Vector from "Operations/vector";

function generateDefaultShape() {
  return new Shape(
    [
      /* Left Column Front */
      new Face(
        [
          new Point(0, 0, 0),
          new Point(0, 150, 0),
          new Point(30, 0, 0),
          new Point(0, 150, 0),
          new Point(30, 150, 0),
          new Point(30, 0, 0),
        ],
        new Color(200, 70, 120),
        new Vector(0, 0, 1)
      ),
      /* Top Rung Front */
      new Face(
        [
          new Point(30, 0, 0),
          new Point(30, 30, 0),
          new Point(100, 0, 0),
          new Point(30, 30, 0),
          new Point(100, 30, 0),
          new Point(100, 0, 0),
        ],
        new Color(200, 70, 120),
        new Vector(0, 0, 1)
      ),
      /* Middle Rung Front */
      new Face(
        [
          new Point(30, 60, 0),
          new Point(30, 90, 0),
          new Point(67, 60, 0),
          new Point(30, 90, 0),
          new Point(67, 90, 0),
          new Point(67, 60, 0),
        ],
        new Color(200, 70, 120),
        new Vector(0, 0, 1)
      ),
      /* Left Column Back */
      new Face(
        [
          new Point(0, 0, 30),
          new Point(30, 0, 30),
          new Point(0, 150, 30),
          new Point(0, 150, 30),
          new Point(30, 0, 30),
          new Point(30, 150, 30),
        ],
        new Color(80, 70, 200),
        new Vector(0, 0, -1)
      ),
      /* Top Rung Back */
      new Face(
        [
          new Point(30, 0, 30),
          new Point(100, 0, 30),
          new Point(30, 30, 30),
          new Point(30, 30, 30),
          new Point(100, 0, 30),
          new Point(100, 30, 30),
        ],
        new Color(80, 70, 200),
        new Vector(0, 0, -1)
      ),
      /* Middle Rung Back */
      new Face(
        [
          new Point(30, 60, 30),
          new Point(67, 60, 30),
          new Point(30, 90, 30),
          new Point(30, 90, 30),
          new Point(67, 60, 30),
          new Point(67, 90, 30),
        ],
        new Color(80, 70, 200),
        new Vector(0, 0, -1)
      ),
      /* Top */
      new Face(
        [
          new Point(0, 0, 0),
          new Point(100, 0, 0),
          new Point(100, 0, 30),
          new Point(0, 0, 0),
          new Point(100, 0, 30),
          new Point(0, 0, 30),
        ],
        new Color(70, 200, 210),
        new Vector(0, 1, 0)
      ),
      /* Top Rung Right */
      new Face(
        [
          new Point(100, 0, 0),
          new Point(100, 30, 0),
          new Point(100, 30, 30),
          new Point(100, 0, 0),
          new Point(100, 30, 30),
          new Point(100, 0, 30),
        ],
        new Color(200, 200, 70),
        new Vector(-1, 0, 0)
      ),
      /* Under Top Rung */
      new Face(
        [
          new Point(30, 30, 0),
          new Point(30, 30, 30),
          new Point(100, 30, 30),
          new Point(30, 30, 0),
          new Point(100, 30, 30),
          new Point(100, 30, 0),
        ],
        new Color(210, 100, 70),
        new Vector(0, -1, 0)
      ),
      /* Between Top Rung and Middle */
      new Face(
        [
          new Point(30, 30, 0),
          new Point(30, 60, 30),
          new Point(30, 30, 30),
          new Point(30, 30, 0),
          new Point(30, 60, 0),
          new Point(30, 60, 30),
        ],
        new Color(210, 160, 70),
        new Vector(-1, 0, 0)
      ),
      /* Top of Middle Rung */
      new Face(
        [
          new Point(30, 60, 0),
          new Point(67, 60, 30),
          new Point(30, 60, 30),
          new Point(30, 60, 0),
          new Point(67, 60, 0),
          new Point(67, 60, 30),
        ],
        new Color(70, 180, 210),
        new Vector(0, 1, 0)
      ),
      /* Right of Middle Rung */
      new Face(
        [
          new Point(67, 60, 0),
          new Point(67, 90, 30),
          new Point(67, 60, 30),
          new Point(67, 60, 0),
          new Point(67, 90, 0),
          new Point(67, 90, 30),
        ],
        new Color(100, 70, 210),
        new Vector(-1, 0, 0)
      ),
      /* Bottom of Middle Rung */
      new Face(
        [
          new Point(30, 90, 0),
          new Point(30, 90, 30),
          new Point(67, 90, 30),
          new Point(30, 90, 0),
          new Point(67, 90, 30),
          new Point(67, 90, 0),
        ],
        new Color(76, 210, 100),
        new Vector(0, -1, 0)
      ),
      /* Right of Bottom */
      new Face(
        [
          new Point(30, 90, 0),
          new Point(30, 150, 30),
          new Point(30, 90, 30),
          new Point(30, 90, 0),
          new Point(30, 150, 0),
          new Point(30, 150, 30),
        ],
        new Color(140, 210, 80),
        new Vector(-1, 0, 0)
      ),
      /* Bottom */
      new Face(
        [
          new Point(0, 150, 0),
          new Point(0, 150, 30),
          new Point(30, 150, 30),
          new Point(0, 150, 0),
          new Point(30, 150, 30),
          new Point(30, 150, 0),
        ],
        new Color(90, 130, 110),
        new Vector(0, -1, 0)
      ),
      /* Left Side */
      new Face(
        [
          new Point(0, 0, 0),
          new Point(0, 0, 30),
          new Point(0, 150, 30),
          new Point(0, 0, 0),
          new Point(0, 150, 30),
          new Point(0, 150, 0),
        ],
        new Color(160, 160, 220),
        new Vector(1, 0, 0)
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

export default generateDefaultShape;
