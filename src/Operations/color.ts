import ColorInterface from "Interfaces/color-interface";

class Color implements ColorInterface {
  constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number
  ) {}

  public getTriplet(): readonly [number, number, number] {
    return [this.r, this.g, this.b];
  }
}

export default Color;
