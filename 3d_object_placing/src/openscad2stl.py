import argparse
import os
import subprocess


def convert_file(input_path, output_path):
    # Check if output file already exists
    if os.path.exists(output_path):
        response = input(
            f"{output_path} already exists. Do you want to overwrite? (y/n): "
        )
        if response.lower() != "y":
            print(f"Skipped conversion for {input_path}")
            return

    try:
        subprocess.check_call(["openscad", "-o", output_path, input_path])
        print(f"{input_path} successfully converted to {output_path}")
    except subprocess.CalledProcessError:
        print(f"Error converting {input_path} to {output_path}")


def convert_files_in_directory(input_dir, output_dir):
    for filename in os.listdir(input_dir):
        if filename.endswith(".scad"):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename.replace(".scad", ".stl"))
            convert_file(input_path, output_path)


def main():
    parser = argparse.ArgumentParser(description="Convert OpenSCAD files to STL files.")
    parser.add_argument("-f", "--file", help="Convert a single OpenSCAD file to STL.")
    parser.add_argument(
        "-m", "--multiple", nargs="*", help="Convert multiple OpenSCAD files to STL."
    )
    parser.add_argument(
        "-d", "--directory", help="Convert all OpenSCAD files in a directory to STL."
    )
    parser.add_argument(
        "-o",
        "--output",
        help="Specify the output directory. Defaults to the same as input or 'stl_output' for directory conversion.",
    )

    args = parser.parse_args()

    output_dir = args.output

    if args.file:
        output_path = os.path.join(
            output_dir if output_dir else os.path.dirname(args.file),
            os.path.basename(args.file).replace(".scad", ".stl"),
        )
        convert_file(args.file, output_path)

    if args.multiple:
        for file in args.multiple:
            output_path = os.path.join(
                output_dir if output_dir else os.path.dirname(file),
                os.path.basename(file).replace(".scad", ".stl"),
            )
            convert_file(file, output_path)

    if args.directory:
        source_dir = args.directory
        target_dir = (
            output_dir if output_dir else os.path.join(source_dir, "stl_output")
        )
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)
        convert_files_in_directory(source_dir, target_dir)


if __name__ == "__main__":
    main()
