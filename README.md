# grid-painter-widget

A minimal anywidget wrapping a standalone JavaScript visualisation library, used
as the companion example for the tutorial blog post.

## Quick start

```sh
npm install
npm run build          # → dist/index.js
cp dist/index.js article/widget.mjs

# Preview in MyST
cd article && npx mystmd start
```

## Structure

```
src/
  grid-painter.js   ← standalone visualisation library (no widget knowledge)
  styles.css        ← widget styles (bundled as text)
  index.js          ← anywidget render() wrapper
dist/
  index.js          ← esbuild bundle (ESM)
article/
  widget.mjs        ← copy of the bundle for MyST
  index.md          ← MyST article using the widget
  myst.yml          ← MyST config
```
