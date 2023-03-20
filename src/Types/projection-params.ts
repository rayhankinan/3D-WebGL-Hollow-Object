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
  oblique: { 
    factor: number; 
    angle: number;     
    ortho_left: number;
    ortho_right: number;
    ortho_bottom: number;
    ortho_top: number;
    ortho_near: number;
    ortho_far: number };
};

export default ProjectionParams;
