import * as THREE from 'three';
import * as fs from 'fs';

function verticesToSTLString(vertices: number[][]): string {
  let stl = '';
  for (let i = 0; i < vertices.length; i += 3) {
    const a = vertices[i];
    const b = vertices[i + 1];
    const c = vertices[i + 2];
    const normal = new THREE.Vector3().crossVectors(
      new THREE.Vector3().subVectors(
        new THREE.Vector3(...b),
        new THREE.Vector3(...a)
      ),
      new THREE.Vector3().subVectors(
        new THREE.Vector3(...c),
        new THREE.Vector3(...a)
      )
    );
    stl += `facet normal ${normal.x} ${normal.y} ${normal.z}\n`;
    stl += 'outer loop\n';
    stl += `vertex ${a[0]} ${a[1]} ${a[2]}\n`;
    stl += `vertex ${b[0]} ${b[1]} ${b[2]}\n`;
    stl += `vertex ${c[0]} ${c[1]} ${c[2]}\n`;
    stl += 'endloop\n';
    stl += 'endfacet\n';
  }
  return stl;
}

function meshToSTLString(mesh: THREE.Mesh): string {
  const geometry = mesh.geometry as THREE.BufferGeometry;
  const position = geometry.getAttribute('position') as THREE.BufferAttribute;
  const vertices = position.array as unknown as number[];
  const vertices2d: number[][] = [];
  for (let i = 0; i < vertices.length; i += 3) {
    vertices2d.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
  }
  return verticesToSTLString(vertices2d);
}

export function exportSTL(mesh: THREE.Mesh | number[][], filename: string) {
  let stl: string = '';
  if (mesh instanceof THREE.Mesh) {
    stl = meshToSTLString(mesh);
  } else {
    stl = verticesToSTLString(mesh);
  }
  // write string to file

  fs.writeFileSync('./test.stl', stl);
}
