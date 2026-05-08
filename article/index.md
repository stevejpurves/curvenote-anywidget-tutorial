---
title: Grid Painter Widget
---

## Default grid (viridis)

```{anywidget} ./widget.mjs
{
  "data": [
    [0.0, 0.2, 0.4, 0.6, 0.8, 1.0],
    [0.1, 0.3, 0.5, 0.7, 0.9, 1.1],
    [0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
    [3.0, 2.5, 2.0, 1.5, 1.0, 0.5]
  ],
  "colormap": "viridis",
  "cell_size": 48,
  "show_values": true
}
```

## Inferno colourmap, larger cells

```{anywidget} ./widget.mjs
{
  "data": [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
  ],
  "colormap": "inferno",
  "cell_size": 56,
  "show_values": true
}
```

## Plasma, no controls

```{anywidget} ./widget.mjs
{
  "data": [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [8, 7, 6, 5, 4, 3, 2, 1],
    [1, 3, 5, 7, 7, 5, 3, 1],
    [2, 4, 6, 8, 8, 6, 4, 2]
  ],
  "colormap": "plasma",
  "cell_size": 36,
  "gap": 3,
  "show_controls": false
}
```
