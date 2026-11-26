import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/instrument-sans';
import './styles/tokens.css';
import './styles/base.css';
import App from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds ship prerendered HTML (scripts/prerender.mjs), so hydrate it.
// The dev server serves an empty #root, so render from scratch there.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
