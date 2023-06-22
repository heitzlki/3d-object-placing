export const parseASCII = (str: String) => {
  const lines = str.split('\r');
  let vertices: number[][] = [];
  let normals: number[][] = [];
  let faces: number[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('facet normal')) {
      const normal = line.split(' ').slice(2).map(parseFloat);
      normals.push(normal);
    } else if (line.startsWith('vertex')) {
      const vertex = line.split(' ').slice(1).map(parseFloat);
      vertices.push(vertex);
    } else if (line.startsWith('endloop')) {
      const face = [
        vertices.length - 3,
        vertices.length - 2,
        vertices.length - 1,
      ];
      faces.push(face);
    }
  }

  return {
    vertices,
    normals,
    faces,
  };
};
