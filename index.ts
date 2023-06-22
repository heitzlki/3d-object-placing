import * as fs from "fs";

interface STLVertex {
  x: number;
  y: number;
  z: number;
}

interface STLFacet {
  normal: STLVertex;
  vertices: [STLVertex, STLVertex, STLVertex];
}

function parseSTL(data: Buffer): STLFacet[] {
  const facets: STLFacet[] = [];
  const buffer = Buffer.from(data);

  console.log("buffer", buffer);

  // Skip the STL header (80 bytes)
  let offset = 80;

  // Read the number of facets (4 bytes, little-endian)
  const numFacets = buffer.readUInt32LE(offset);
  console.log("numFacets", numFacets);
  offset += 4;
  //   console.log("offset", buffer.readFloatLE(offset));

  // Parse each facet
  for (let i = 0; i < numFacets; i++) {
    console.log("offset", offset);
    const normal: STLVertex = {
      x: buffer.readFloatLE(offset),
      y: buffer.readFloatLE(offset + 4),
      z: buffer.readFloatLE(offset + 8),
    };
    offset += 12;

    const vertices: [STLVertex, STLVertex, STLVertex] = [
      {
        x: buffer.readFloatLE(offset),
        y: buffer.readFloatLE(offset + 4),
        z: buffer.readFloatLE(offset + 8),
      },
      {
        x: buffer.readFloatLE(offset + 12),
        y: buffer.readFloatLE(offset + 16),
        z: buffer.readFloatLE(offset + 20),
      },
      {
        x: buffer.readFloatLE(offset + 24),
        y: buffer.readFloatLE(offset + 28),
        z: buffer.readFloatLE(offset + 32),
      },
    ];
    offset += 48; // 3 vertices * 3 floats * 4 bytes per float = 36 bytes

    // Skip the attribute byte count (2 bytes)
    offset += 2;

    facets.push({
      normal,
      vertices,
    });
  }
  return facets;
}

function parseSTLFile(filePath: string): Promise<STLFacet[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(parseSTL(data));
      }
    });
  });
}

async function main() {
  const filePath = "assets/cube.stl";
  try {
    const facets = await parseSTLFile(filePath);
    // Do something with the parsed facets
    console.log("STL file parsed successfully:", facets);
  } catch (error) {
    console.error("Error parsing STL file:", error);
  }
}

main();
