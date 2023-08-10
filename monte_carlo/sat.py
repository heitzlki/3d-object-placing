import numpy as np


def triangle_normal(a, b, c):
    """
    Compute the normal of a triangle given its three vertices.
    """
    return np.cross(b - a, c - a)


def project(vertices, axis):
    """
    Project vertices on an axis.
    """
    return np.dot(vertices, axis)


def overlap(p1, p2):
    """
    Check if 1-dimensional projections overlap.
    """
    return np.max(p1) >= np.min(p2) and np.max(p2) >= np.min(p1)


def separating_axis_theorem(triangle1, triangle2):
    """
    Implement SAT collision detection between two triangles.
    """
    # Compute triangle normals
    n1 = triangle_normal(*triangle1)
    n2 = triangle_normal(*triangle2)

    # Store triangle vertices
    vertices1 = triangle1
    vertices2 = triangle2

    # Test axes of the first triangle
    for i in range(3):
        axis = np.cross(n1, vertices1[i] - vertices1[(i + 1) % 3])
        p1 = project(vertices1, axis)
        p2 = project(vertices2, axis)
        if not overlap(p1, p2):
            return False

    # Test axes of the second triangle
    for i in range(3):
        axis = np.cross(n2, vertices2[i] - vertices2[(i + 1) % 3])
        p1 = project(vertices1, axis)
        p2 = project(vertices2, axis)
        if not overlap(p1, p2):
            return False

    # Test axis of both triangles normals
    axis = np.cross(n1, n2)
    p1 = project(vertices1, axis)
    p2 = project(vertices2, axis)
    if not overlap(p1, p2):
        return False

    # All separating axes failed, therefore the triangles intersect
    return True
