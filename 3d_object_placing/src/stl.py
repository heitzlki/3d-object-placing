import struct
import numpy as np

from read_stl import read_stl_file, read_ascii_stl, read_binary_stl
from export_stl import export_ascii_stl, export_binary_stl


def merge_stl_objects(*args):
    faces = np.concatenate([faces for faces, _ in args])
    vertices = np.unique(faces.reshape(-1, 3), axis=0)
    return faces, vertices
