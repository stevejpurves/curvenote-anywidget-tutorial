import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

export function syncArticle() {
  fs.copyFileSync(
    join(repoRoot, "dist", "widget.mjs"),
    join(repoRoot, "article", "widget.mjs"),
  );
}

const invokedDirectly =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) {
  syncArticle();
}
