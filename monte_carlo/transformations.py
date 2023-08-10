def translate(vertices, vector):
    return vertices + vector


def rotate(vertices, axis, angle):
    angle = np.deg2rad(angle)
    rotation_matrix = np.array(
        [
            [
                np.cos(angle) + axis[0] ** 2 * (1 - np.cos(angle)),
                axis[0] * axis[1] * (1 - np.cos(angle)) - axis[2] * np.sin(angle),
                axis[0] * axis[2] * (1 - np.cos(angle)) + axis[1] * np.sin(angle),
            ],
            [
                axis[1] * axis[0] * (1 - np.cos(angle)) + axis[2] * np.sin(angle),
                np.cos(angle) + axis[1] ** 2 * (1 - np.cos(angle)),
                axis[1] * axis[2] * (1 - np.cos(angle)) - axis[0] * np.sin(angle),
            ],
            [
                axis[2] * axis[0] * (1 - np.cos(angle)) - axis[1] * np.sin(angle),
                axis[2] * axis[1] * (1 - np.cos(angle)) + axis[0] * np.sin(angle),
                np.cos(angle) + axis[2] ** 2 * (1 - np.cos(angle)),
            ],
        ]
    )
    return np.dot(vertices, rotation_matrix.T)


def scale(vertices, vector):
    return vertices * vector


def resize(vertices, size):
    min_values = vertices.min(axis=0)
    max_values = vertices.max(axis=0)
    current_size = max_values - min_values
    scale_factor = size / current_size
    return scale(translate(vertices, -min_values), scale_factor)


def mirror(vertices, vector):
    return vertices - 2 * np.dot(vertices, vector)[:, None] * vector


def minkowski(vertices1, vertices2):
    return np.array([v1 + v2 for v1 in vertices1 for v2 in vertices2])


def is_valid_stl(faces):
    for face in faces:
        # A face is a valid triangle if the length of its sides satisfy the triangle inequality
        side_lengths = np.sqrt(((face - np.roll(face, -1, axis=0)) ** 2).sum(axis=1))
        if not (
            side_lengths[0] < side_lengths[1] + side_lengths[2]
            and side_lengths[1] < side_lengths[0] + side_lengths[2]
            and side_lengths[2] < side_lengths[0] + side_lengths[1]
        ):
            return False
    return True
