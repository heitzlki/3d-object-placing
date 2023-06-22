// import * as THREE from 'three';
// import * as STDLIB from "three-stdlib";
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { STLLoader } from "three-stdlib";

export const loadGeometry = async (
  url: string
): Promise<THREE.BufferGeometry> => {
  const loader = new STLLoader();

  return new Promise((resolve, reject) => {
    loader.load(url, (geometry: THREE.BufferGeometry) => {
      resolve(geometry);
    });
  });
};
