# SuperSplat for Pinokio

[![Install with Pinokio](https://badges.pinokio.co/install.svg)](https://pinokio.co/resolve?url=https://github.com/cocktailpeanut/supersplat.pinokio)

A local launcher for [PlayCanvas SuperSplat](https://github.com/playcanvas/supersplat), an open source browser editor for inspecting, editing, optimizing and exporting 3D Gaussian splats. Runs on Windows, macOS and Linux with Pinokio's bundled Node.js and npm. A browser with working GPU acceleration is required.

## Installation

Open [Install with Pinokio](https://pinokio.co/resolve?url=https://github.com/cocktailpeanut/supersplat.pinokio) to add the launcher to Pinokio. Sign in if prompted, then follow these steps:

1. Open this project in Pinokio and click **Install**. It downloads SuperSplat into `app/`, installs its locked dependencies with `npm ci --include=dev`, and builds the editor.
2. Click **Start**, then **Open Web UI**. Pinokio automatically opens the editor when the server is ready.
3. Drag a supported splat file into the editor, edit it, and use the editor's export options to save your results outside `app/`.

Pinokio supplies the runtime. SuperSplat requires Node.js 20.19 or newer; dependency engine requirements are enforced during installation. Update Pinokio's bundled tools if npm reports an unsupported Node version. No Python, Docker, API key or global npm package is needed.

The server listens only on `127.0.0.1` at a port selected by Pinokio. Use the displayed URL; the port may change between launches. Close/stop the running script through Pinokio's native controls before updating or resetting. Unsaved edits live in your browser session, so export them first.

## Maintenance

- **Update** fast-forwards the launcher when it has a Git upstream, fast-forwards SuperSplat, reinstalls locked dependencies, and rebuilds. An unpublished local launcher has no upstream and skips its own pull.
- **Reinstall** reruns dependency installation and the build without deleting the cloned source.
- **Reset** deletes the entire `app/` directory, including dependencies, source, build output and any files you saved inside it. Click **Install** afterward to download and rebuild it.

App code stays in `app/`, separate from launcher files. Installation and update preserve the upstream manifests and lockfile. Troubleshooting logs are under `logs/api/` and `logs/shell/`; inspect the relevant `latest` files.

## Programmatic access

SuperSplat processes models in the browser. Its local server serves static editor assets; it does not expose a REST API for editing or converting splats.

Replace the example port below with the URL shown by Pinokio. These examples check that the editor is being served; they do not edit a model.

JavaScript (Node.js 20.19+):

```javascript
const response = await fetch('http://127.0.0.1:PORT/');
if (!response.ok) throw new Error(`HTTP ${response.status}`);
console.log(await response.text());
```

Python (standard library):

```python
from urllib.request import urlopen

with urlopen('http://127.0.0.1:PORT/') as response:
    print(response.status, response.read().decode('utf-8')[:200])
```

Curl:

```sh
curl --fail http://127.0.0.1:PORT/
```

For browser automation, upstream provides experimental native [WebMCP tools](https://github.com/playcanvas/supersplat/blob/main/docs/webmcp.md) for scene inspection, selection, editing, camera control and import/export. They require a compatible browser with WebMCP enabled. For example, in that browser's DevTools on the open editor:

```javascript
const context = document.modelContext ?? navigator.modelContext;
if (!context) throw new Error('This browser does not support WebMCP');
const tools = await context.getTools();
const tool = tools.find(tool => tool.name === 'get_scene');
console.log(JSON.parse(await context.executeTool(tool, {})));
```

Python and Curl cannot call those browser-native tools through the static server. For scripted file conversion, see the separate upstream [splat-transform](https://github.com/playcanvas/splat-transform) CLI.

## Verification

Tested on macOS on November 13, 2026 with Pinokio schema 8.0.0, its bundled Node.js 24.22.1, and SuperSplat 3.8.1 (commit `919f0e5d60a94470ed8ebcbc7353a29d0a4344f0`).

- Install, Start, native Stop, Update, Reset, and a fresh Install after Reset passed through `pterm`.
- Pinokio reported the server ready with the captured URL. A socket check confirmed a loopback-only listener. HTML, JavaScript, CSS, locales and WebP WASM returned HTTP 200.
- SuperSplat's existing Chrome test passed model import, selection and undo with WebMCP disabled. Eight launcher menu states and URL capture were also checked.
- The cloned app's tracked source and lockfile remained unchanged. Windows, Linux and experimental WebMCP were not runtime-tested. Updating a published launcher with its own Git upstream was not exercised; the unpublished-launcher path was tested.

npm reported 19 upstream dependency advisories (3 low, 10 moderate, 6 high), plus peer-dependency warnings. The release build completed with upstream Sass and Rollup warnings. The launcher preserves the upstream dependency versions; no automatic audit fixes were applied.

## License

This launcher's source is available under the [MIT license](LICENSE).

The bundled `icon.png` is an unchanged copy of SuperSplat's [official favicon](https://github.com/playcanvas/supersplat/blob/919f0e5d60a94470ed8ebcbc7353a29d0a4344f0/static/icons/logo-192.png), copyright PlayCanvas Ltd., under the same MIT terms. Its copyright notice is included in [LICENSE](LICENSE).

SuperSplat is provided under its upstream [MIT license](https://github.com/playcanvas/supersplat/blob/main/LICENSE), downloaded with the app. The launcher downloads the app's source during installation.
