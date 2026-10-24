/**
 * URL builder for files that ship in `public/`.
 *
 * The site is published from GitHub Pages under `/-Project-/`, not from the
 * domain root. A hard-coded `/assets/...` therefore 404s in production while
 * still working in `npm run dev` — a difference that only shows up after
 * deployment. Every reference to a public file goes through this helper so the
 * Vite base (`base` in vite.config.ts) is applied exactly once.
 *
 * `import.meta.env` does not exist when the tests run through `tsx`, hence the
 * optional access instead of a direct read.
 */
type ViteEnv = { BASE_URL?: string };

export function assetBase(): string {
  let base = '/';
  try {
    base = (import.meta as ImportMeta & { env?: ViteEnv }).env?.BASE_URL || '/';
  } catch {
    base = '/';
  }
  return base.endsWith('/') ? base : `${base}/`;
}

/** Absolute-from-site-root path for a file in `public/`, honouring the Vite base. */
export function assetUrl(relative: string): string {
  return `${assetBase()}${relative.replace(/^\/+/, '')}`;
}
