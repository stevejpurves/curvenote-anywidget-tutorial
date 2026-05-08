/**
 * grid-painter anywidget module.
 *
 * Wraps grid-painter.js as an anywidget ESM module suitable for MyST documents.
 */

import { createGrid, COLORMAPS } from "./grid-painter.js";
import STYLES from "./styles.css";

function render({ model, el }) {
  // ── Inject styles into the widget's own DOM tree ──────────────
  const style = document.createElement("style");
  style.textContent = STYLES;
  el.appendChild(style);

  // ── Read parameters from the anywidget model ──────────────────
  const data = model.get("data") || [[0, 1], [2, 3]];
  const colormap = model.get("colormap") || "viridis";
  const cellSize = model.get("cell_size") || 32;
  const gap = model.get("gap") || 2;
  const showValues = model.get("show_values") || false;
  const showControls = model.get("show_controls") !== false;

  // ── Root container ────────────────────────────────────────────
  const root = document.createElement("div");
  root.className = "gpw-root";
  el.appendChild(root);

  // ── Optional interactive controls ─────────────────────────────
  let currentColormap = colormap;
  let currentCellSize = cellSize;

  if (showControls) {
    const controls = document.createElement("div");
    controls.className = "gpw-controls";

    // Colourmap selector
    const cmLabel = document.createElement("label");
    cmLabel.textContent = "Colourmap:";
    const cmSelect = document.createElement("select");
    for (const name of Object.keys(COLORMAPS)) {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      if (name === colormap) opt.selected = true;
      cmSelect.appendChild(opt);
    }
    cmSelect.addEventListener("change", () => {
      currentColormap = cmSelect.value;
      grid.update({ colormap: currentColormap });
    });

    // Cell size slider
    const szLabel = document.createElement("label");
    szLabel.textContent = "Cell size:";
    const szSlider = document.createElement("input");
    szSlider.type = "range";
    szSlider.min = "12";
    szSlider.max = "64";
    szSlider.value = String(cellSize);
    const szValue = document.createElement("span");
    szValue.textContent = `${cellSize}px`;
    szValue.style.fontSize = "13px";
    szValue.style.minWidth = "36px";
    szSlider.addEventListener("input", () => {
      currentCellSize = Number(szSlider.value);
      szValue.textContent = `${currentCellSize}px`;
      grid.update({ cellSize: currentCellSize });
    });

    controls.append(cmLabel, cmSelect, szLabel, szSlider, szValue);
    root.appendChild(controls);
  }

  // ── Render the grid ───────────────────────────────────────────
  const gridContainer = document.createElement("div");
  gridContainer.className = "gpw-grid-container";
  root.appendChild(gridContainer);

  const grid = createGrid(gridContainer, {
    data,
    colormap: currentColormap,
    cellSize: currentCellSize,
    gap,
    showValues,
  });

  // ── Cleanup function ──────────────────────────────────────────
  return () => {
    grid.destroy();
  };
}

export default { render };
