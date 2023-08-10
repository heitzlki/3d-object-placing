# Assets README

Welcome to the `assets` directory! This folder contains 3D objects generated using OpenSCAD and saved as binary STL (stereolithography) files.

## What is STL?

STL, or stereolithography, is a file format native to the stereolithography CAD software created by 3D Systems. The STL format specifies both ASCII and binary representations. In this folder, I specifically use the binary representation.

STL files describe raw, unstructured triangulated surfaces by the unit normal and vertices (ordered by the right-hand rule) of the triangles using a three-dimensional Cartesian coordinate system. Essentially, these files break down a 3D object's surface into a series of small triangles. The more triangles, the more detailed and smoother the surface becomes, but it also increases the file size.

## Why STL?

STL files are widely accepted and used in 3D printing, CAD, and other fields of computer graphics. Their simplicity makes them universal, allowing for easy interoperation between software and hardware from various vendors.

## Example Objects

Here's a brief overview of some of the objects stored in this directory:

| Filename      | Dimensions (mm) | Intersects With | Description          |
| ------------- | --------------- | --------------- | -------------------- |
| `object1.stl` | 20x20x20        | `object4.stl`   | A small cube         |
| `object2.stl` | 50x30x15        | None            | A rectangular prism  |
| `object3.stl` | 10x10x100       | `object5.stl`   | A tall thin cylinder |
| `object4.stl` | 30x30x30        | `object1.stl`   | A larger cube        |
| `object5.stl` | 100x100x5       | `object3.stl`   | A flat square plate  |

_Note: The 'Intersects With' column indicates if and with which other object the current object intersects in its 3D space._

## Working with STL in OpenSCAD

OpenSCAD is a powerful, script-only CAD tool that's perfect for generating 3D models. If you'd like to modify or view the source code of these STL objects, you'll need the original OpenSCAD files and the OpenSCAD software.

For more information on working with STL files in OpenSCAD, refer to the [official OpenSCAD documentation](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/STL_Import_and_Export).

---

I hope this gives you a clearer understanding of the assets available in this directory. Should you have any questions or need further clarifications, don't hesitate to ask.
