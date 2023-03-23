import Shape from "Objects/shape";
import Face from "Objects/face";
import Point from "Operations/point";
import Color from "Operations/color";
import { degToRad } from "Utils/angle";

function generateDefaultShape(): Shape {
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
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
        new Color(0.1, 0.5, 0.1)
      ),
    ],
    0,
    0,
    0,
    degToRad(0),
    degToRad(0),
    degToRad(0),
    1,
    1,
    1
  );
}

export default generateDefaultShape;
