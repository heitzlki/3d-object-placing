import { parseSTL } from './parseSTL';
import { readFileSync } from 'fs';
import { join } from 'path';

const buf = readFileSync(join(__dirname, 'mesh.stl'));
let mesh = parseSTL(buf);

console.dir(mesh.vertices);

function filterDuplicateVertices(vertices: number[][]): number[][] {
  const uniqueVertices = new Set<string>();
  const filteredVertices: number[][] = [];

  for (const vertex of vertices) {
    const vertexKey = vertex.join(',');
    if (!uniqueVertices.has(vertexKey)) {
      uniqueVertices.add(vertexKey);
      filteredVertices.push(vertex);
    }
  }

  return filteredVertices;
}
let filteredVertices = filterDuplicateVertices(mesh.vertices);

console.log('filteredVertices', filteredVertices);

// function to move the verticies by a give x,y,z amount
function moveVertices(
  vertices: number[][],
  x: number,
  y: number,
  z: number
): number[][] {
  const movedVertices: number[][] = [];
  for (const vertex of vertices) {
    movedVertices.push([vertex[0] + x, vertex[1] + y, vertex[2] + z]);
  }
  return movedVertices;
}

let movedVertices = moveVertices(filteredVertices, 10, 10, 10);

console.log('movedVertices', movedVertices);

// function to scale the verticies by a give x,y,z amount
function scaleVertices(
  vertices: number[][],
  x: number,
  y: number,
  z: number
): number[][] {
  const scaledVertices: number[][] = [];
  for (const vertex of vertices) {
    scaledVertices.push([vertex[0] * x, vertex[1] * y, vertex[2] * z]);
  }
  return scaledVertices;
}

let scaledVertices = scaleVertices(filteredVertices, 2, 2, 2);

console.log('scaledVertices', scaledVertices);

// function to rotate the verticies by a give x,y,z amount
function rotateVertices(
  vertices: number[][],
  x: number,
  y: number,
  z: number
): number[][] {
  const rotatedVertices: number[][] = [];
  for (const vertex of vertices) {
    rotatedVertices.push([vertex[0] + x, vertex[1] + y, vertex[2] + z]);
  }
  return rotatedVertices;
}

let rotatedVertices = rotateVertices(filteredVertices, 10, 10, 10);

console.log('rotatedVertices', rotatedVertices);

// function to calculate the center of the verticies
function centerVertices(vertices: number[][]): number[] {
  let x = 0;
  let y = 0;
  let z = 0;
  for (const vertex of vertices) {
    x += vertex[0];
    y += vertex[1];
    z += vertex[2];
  }
  return [x / vertices.length, y / vertices.length, z / vertices.length];
}

// function to calculate min distance between two verticies arrays
function minDistanceBetweenVertices(
  vertices1: number[][],
  vertices2: number[][]
): number {
  let minDistance = Infinity;
  for (const vertex1 of vertices1) {
    for (const vertex2 of vertices2) {
      const distance = Math.sqrt(
        (vertex1[0] - vertex2[0]) ** 2 +
          (vertex1[1] - vertex2[1]) ** 2 +
          (vertex1[2] - vertex2[2]) ** 2
      );
      if (distance < minDistance) {
        minDistance = distance;
      }
    }
  }
  return minDistance;
}

let minDistance = minDistanceBetweenVertices(filteredVertices, movedVertices);

console.log('minDistance', minDistance);

// function to calculate max distance between two verticies arrays
function maxDistanceBetweenVertices(
  vertices1: number[][],
  vertices2: number[][]
): number {
  let maxDistance = 0;
  for (const vertex1 of vertices1) {
    for (const vertex2 of vertices2) {
      const distance = Math.sqrt(
        (vertex1[0] - vertex2[0]) ** 2 +
          (vertex1[1] - vertex2[1]) ** 2 +
          (vertex1[2] - vertex2[2]) ** 2
      );
      if (distance > maxDistance) {
        maxDistance = distance;
      }
    }
  }
  return maxDistance;
}

let maxDistance = maxDistanceBetweenVertices(filteredVertices, movedVertices);

console.log('maxDistance', maxDistance);

// function to position two verticies next to each other with a given distance between them, automatically rotate and move them to fit effiently with a given min distance between them
function positionVertices(
  vertices1: number[][],
  vertices2: number[][],
  minDistance: number
): number[][] {
  const center1 = centerVertices(vertices1);
  const center2 = centerVertices(vertices2);
  const distance = Math.sqrt(
    (center1[0] - center2[0]) ** 2 +
      (center1[1] - center2[1]) ** 2 +
      (center1[2] - center2[2]) ** 2
  );
  const scale = (distance + minDistance) / distance;
  const scaledVertices2 = scaleVertices(vertices2, scale, scale, scale);
  const movedVertices2 = moveVertices(
    scaledVertices2,
    center1[0] - center2[0],
    center1[1] - center2[1],
    center1[2] - center2[2]
  );
  return movedVertices2;
}

let positionedVertices = positionVertices(filteredVertices, scaledVertices, 10);

console.log('positionedVertices', positionedVertices);
