export const parseBinary = (buf: Buffer) => {
  const triangleCount = buf.readUInt32LE(80);
  let vertices: number[][] = [];
  let normals: number[][] = [];
  let faces: number[][] = [];

  for (let i = 0; i < triangleCount; i++) {
    const offset = 84 + i * 50;
    const normal = [
      buf.readFloatLE(offset),
      buf.readFloatLE(offset + 4),
      buf.readFloatLE(offset + 8),
    ];
    normals.push(normal);

    for (let j = 1; j <= 3; j++) {
      const vertex = [
        buf.readFloatLE(offset + j * 12),
        buf.readFloatLE(offset + j * 12 + 4),
        buf.readFloatLE(offset + j * 12 + 8),
      ];
      vertices.push(vertex);
    }

    const index = i * 3;
    faces.push([index, index + 1, index + 2]);
  }

  return {
    vertices,
    normals,
    faces,
  };
};
