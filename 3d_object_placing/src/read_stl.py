import struct
import numpy as np


def read_ascii_stl(filename):
    with open(filename, "r") as f:
        lines = f.readlines()

    vertices = []
    for line in lines:
        parts = line.split()
        if len(parts) > 0 and parts[0] == "vertex":
            vertices.append(list(map(float, parts[1:])))

    faces = np.array(vertices).reshape((-1, 3, 3))
    return faces, np.unique(faces.reshape(-1, 3), axis=0)


def read_binary_stl(filename):
    with open(filename, "rb") as f:
        header = f.read(80)
        num_faces = struct.unpack("<I", f.read(4))[0]
        faces = []
        for _ in range(num_faces):
            f.read(12)  # skip the normal vector
            for _ in range(3):  # read and store the vertices
                vertex = struct.unpack("<fff", f.read(12))
                faces.append(vertex)
            f.read(2)  # skip attribute byte count

    faces = np.array(faces).reshape((-1, 3, 3))
    return faces, np.unique(faces.reshape(-1, 3), axis=0)


def read_stl_file(filename):
    with open(filename, "rb") as f:
        if f.read(5).decode("utf-8").lower() == "solid":
            return read_ascii_stl(filename)
        else:
            return read_binary_stl(filename)
