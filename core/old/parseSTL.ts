import { parseASCII } from './parseASCII';
import { parseBinary } from './parseBinary';

export const parseSTL = (buf: Buffer) => {
  if (typeof buf === 'string') {
    return parseASCII(buf);
  }

  var triangleCount = buf.readUInt32LE(80);
  var expectedSize = 80 + 4 + triangleCount * (4 * 3 * 4 + 2);

  if (expectedSize === buf.length) {
    return parseBinary(buf);
  }

  return parseASCII(buf.toString('ascii'));
};
