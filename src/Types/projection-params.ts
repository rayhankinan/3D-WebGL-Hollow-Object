type ProjectionParams = {
  orthographic: {
    left: number;
    right: number;
    bottom: number;
    top: number;
    near: number;
    far: number;
  };
  perspective: {
    fieldOfView: number;
    aspect: number;
    near: number;
    far: number;
  };
  oblique: { factor: number; angle: number };
};

export default ProjectionParams;
