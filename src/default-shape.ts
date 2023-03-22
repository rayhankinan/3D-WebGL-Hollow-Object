import Shape from "Objects/shape";
import Face from "Objects/face";
import Point from "Operations/point";
import Color from "Operations/color";
import Vector from "Operations/vector";
import { degToRad } from "Utils/angle";

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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
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
        new Color(0.1, 0.5, 0.1),
        new Vector(1, 0, 0)
      ),
    ],
    0,
    0,
    0,
    degToRad(30),
    degToRad(135),
    degToRad(180),
    1,
    1,
    1
  );
}

export default generateDefaultShape;
