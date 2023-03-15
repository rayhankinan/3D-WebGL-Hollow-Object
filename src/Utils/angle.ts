export function degToRad(d: number) {
  return (d * Math.PI) / 180;
}

export function radToDeg(r: number) {
  return Math.round((r * 180) / Math.PI);
}
