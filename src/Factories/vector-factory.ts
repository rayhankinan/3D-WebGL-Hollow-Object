import VectorInterface from "Interfaces/vector-interface";
import Vector from "Operations/vector";

class VectorFactory {
  public static fromInterface(vector: VectorInterface): Vector {
    const { x, y, z } = vector;

    return new Vector(x, y, z);
  }
}

export default VectorFactory;
