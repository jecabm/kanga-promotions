// Build step: render <App /> to static HTML and inject it into dist/index.html, so crawlers,
// social previews and the browser's image preloader see the full page without running JS.
// The client then hydrates this markup (see src/main.tsx).
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const indexPath = `${root}dist/index.html`;
const serverDir = `${root}dist-server`;

const { render } = await import(pathToFileURL(`${serverDir}/entry-server.js`).href);
const template = await readFile(indexPath, 'utf8');

const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error(`prerender: ${placeholder} not found in dist/index.html`);

const html = render();
if (!html.includes('<h1')) throw new Error('prerender: rendered markup has no <h1>, refusing to write');

await writeFile(indexPath, template.replace(placeholder, `<div id="root">${html}</div>`));
await rm(serverDir, { recursive: true, force: true });
console.log(`prerender: wrote ${(html.length / 1024).toFixed(1)} KiB of HTML into dist/index.html`);
