import * as esbuild from "esbuild";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { syncArticle } from "./sync-article.mjs";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const ctx = await esbuild.context({
  absWorkingDir: repoRoot,
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "esm",
  outfile: "dist/widget.mjs",
  loader: { ".css": "text" },
  minify: true,
  plugins: [
    {
      name: "sync-article",
      setup(build) {
        build.onEnd((result) => {
          if (result.errors.length === 0) syncArticle();
        });
      },
    },
  ],
});

await ctx.watch();
