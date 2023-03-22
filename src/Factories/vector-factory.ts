import VectorInterface from "Main/Interfaces/vector-interface";
import Vector from "Main/Operations/vector";

class VectorFactory {
  public static fromInterface(vector: VectorInterface): Vector {
    const { x, y, z } = vector;

    return new Vector(x, y, z);
  }
}

export default VectorFactory;
