import struct


def export_ascii_stl(filename, faces):
    with open(filename, "w") as f:
        f.write("solid\n")
        for face in faces:
            f.write(
                "facet normal 0 0 0\n"
            )  # you might want to compute the actual normal
            f.write("outer loop\n")
            for vertex in face:
                f.write("vertex {} {} {}\n".format(*vertex))
            f.write("endloop\n")
            f.write("endfacet\n")
        f.write("endsolid\n")


def export_binary_stl(filename, faces):
    with open(filename, "wb") as f:
        f.write(struct.pack("<80sI", b"", len(faces)))  # header
        for face in faces:
            f.write(
                struct.pack("<12fH", 0, 0, 0, *face.flatten(), 0)
            )  # normal, vertices, attribute byte count
