from plotly.subplots import make_subplots
import numpy as np


def visualize_triangle_grid(triangle_groups):
    n_groups = len(triangle_groups)
    nrows = int(np.ceil(np.sqrt(n_groups)))  # Arrange in a square grid
    ncols = nrows

    fig = make_subplots(
        rows=nrows, cols=ncols, specs=[[{"type": "scatter3d"}] * ncols] * nrows
    )

    for group_index, triangle_group in enumerate(triangle_groups):
        triangles = triangle_group[:-1]  # All but last elements are triangles
        group_title = triangle_group[-1]  # Last element is the title
        row = group_index // ncols + 1  # calculate row index for subplot
        col = group_index % ncols + 1  # calculate column index for subplot

        for triangle_index, triangle in enumerate(triangles):
            x, y, z = triangle.T
            fig.add_trace(
                go.Scatter3d(
                    x=np.concatenate([x, [x[0]]]),
                    y=np.concatenate([y, [y[0]]]),
                    z=np.concatenate([z, [z[0]]]),
                    mode="lines+markers",
                    name=f"{group_title} Triangle {triangle_index}",
                ),
                row=row,
                col=col,
            )

    fig.update_layout(height=400 * nrows, width=400 * ncols)

    fig.show()
