/**
 * grid-painter.js — a tiny standalone visualisation library.
 *
 * Renders a 2-D grid of coloured cells from a string[][] matrix.
 * Each string value is mapped to a colour via a chosen colourmap.
 *
 * This module knows nothing about anywidget, MyST, or shadow DOMs.
 * It is a plain ESM module that takes a container element and data.
 */

// ── Colourmaps ─────────────────────────────────────────────────────
// Each map is an array of [stop, r, g, b] where stop ∈ [0, 1].

const VIRIDIS = [
  [0.0, 68, 1, 84],
  [0.25, 59, 82, 139],
  [0.5, 33, 145, 140],
  [0.75, 94, 201, 98],
  [1.0, 253, 231, 37],
];

const INFERNO = [
  [0.0, 0, 0, 4],
  [0.25, 87, 16, 110],
  [0.5, 188, 55, 84],
  [0.75, 249, 142, 9],
  [1.0, 252, 255, 164],
];

const PLASMA = [
  [0.0, 13, 8, 135],
  [0.25, 126, 3, 168],
  [0.5, 204, 71, 120],
  [0.75, 248, 149, 64],
  [1.0, 240, 249, 33],
];

export const COLORMAPS = { viridis: VIRIDIS, inferno: INFERNO, plasma: PLASMA };

// ── Helpers ────────────────────────────────────────────────────────

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function sampleColormap(stops, t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [s0, r0, g0, b0] = stops[i - 1];
      const [s1, r1, g1, b1] = stops[i];
      const f = (t - s0) / (s1 - s0);
      return `rgb(${Math.round(lerp(r0, r1, f))}, ${Math.round(lerp(g0, g1, f))}, ${Math.round(lerp(b0, b1, f))})`;
    }
  }
  const [, r, g, b] = stops[stops.length - 1];
  return `rgb(${r}, ${g}, ${b})`;
}

function valueToNorm(val, lo, hi) {
  if (hi === lo) return 0.5;
  return (val - lo) / (hi - lo);
}

// ── Public API ─────────────────────────────────────────────────────

/**
 * Render a coloured grid into the given container element.
 *
 * @param {HTMLElement}  container  – DOM element to render into.
 * @param {object}       opts
 * @param {number[][]}   opts.data       – 2-D array of numeric values.
 * @param {string}       opts.colormap   – "viridis" | "inferno" | "plasma"
 * @param {number}       opts.cellSize   – px per cell side (default 32).
 * @param {number}       opts.gap        – px gap between cells (default 2).
 * @param {boolean}      opts.showValues – show the numeric value on each cell.
 * @returns {{ update: Function, destroy: Function }}
 */
export function createGrid(container, opts = {}) {
  let {
    data = [],
    colormap = "viridis",
    cellSize = 32,
    gap = 2,
    showValues = false,
  } = opts;

  const wrapper = document.createElement("div");
  wrapper.className = "gp-grid";
  container.appendChild(wrapper);

  function render() {
    wrapper.innerHTML = "";
    if (!data.length) return;

    const flat = data.flat();
    const lo = Math.min(...flat);
    const hi = Math.max(...flat);
    const stops = COLORMAPS[colormap] || COLORMAPS.viridis;
    const cols = data[0].length;

    wrapper.style.display = "grid";
    wrapper.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    wrapper.style.gap = `${gap}px`;
    wrapper.style.width = "fit-content";

    for (let r = 0; r < data.length; r++) {
      for (let c = 0; c < cols; c++) {
        const val = data[r][c];
        const t = valueToNorm(val, lo, hi);
        const color = sampleColormap(stops, t);

        const cell = document.createElement("div");
        cell.className = "gp-cell";
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.backgroundColor = color;
        cell.style.borderRadius = "3px";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";

        if (showValues) {
          cell.style.fontSize = `${Math.max(9, cellSize * 0.3)}px`;
          cell.style.color = t > 0.55 ? "#000" : "#fff";
          cell.style.fontFamily = "monospace";
          cell.textContent = Number.isInteger(val)
            ? val
            : val.toFixed(1);
        }

        wrapper.appendChild(cell);
      }
    }
  }

  render();

  return {
    /** Re-render with new options (partial update). */
    update(newOpts) {
      if (newOpts.data !== undefined) data = newOpts.data;
      if (newOpts.colormap !== undefined) colormap = newOpts.colormap;
      if (newOpts.cellSize !== undefined) cellSize = newOpts.cellSize;
      if (newOpts.gap !== undefined) gap = newOpts.gap;
      if (newOpts.showValues !== undefined) showValues = newOpts.showValues;
      render();
    },
    /** Remove the grid from the DOM. */
    destroy() {
      wrapper.remove();
    },
  };
}
