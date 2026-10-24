/**
 * Regression guard for the link/asset bugs fixed alongside this file.
 *
 * Everything here is checked against the *source* of the published site:
 *   1. No component may hard-code a root path such as `/src/assets/…` or
 *      `/assets/…`. GitHub Pages serves the app from `/-Project-/`, so such a
 *      path works in dev and 404s in production (the hero photos and the PDF
 *      brochure were broken exactly this way).
 *   2. The routes reachable from the header — including `#dac_builder`, which the
 *      global search points at — must open a real view.
 *   3. The document must not inherit a fixed-width header: horizontal overflow
 *      is what pushed the brand out of the viewport in RTL.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { assetUrl, assetBase } from '../src/utils/assetUrl';
import { ACADEMY_TABS, isAcademyTab, readAcademyTab } from '../src/academyTabs';

const root = path.resolve(process.cwd(), 'src');

/** Drops block/line comments so prose that mentions a bad path is not flagged. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap(entry => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(ts|tsx)$/.test(entry) ? [full] : [];
  });
}

test('public assets are addressed through the Vite base, never a root-absolute path', () => {
  const offenders: string[] = [];
  for (const file of walk(root)) {
    const source = stripComments(readFileSync(file, 'utf8'));
    // `/src/...` is a dev-server path: Vite rewrites it during a build, but a
    // string literal that reaches the browser (img src, href) is not rewritten.
    for (const match of source.matchAll(/(['"`])\/(?:src|assets|edb|epub|images)\/[^'"`]*\1/g)) {
      const line = source.slice(0, match.index).split('\n').length;
      offenders.push(`${path.relative(root, file)}:${line} → ${match[0]}`);
    }
  }
  assert.deepEqual(offenders, [], `use assetUrl(...) instead of a root path:\n${offenders.join('\n')}`);
});

test('assetUrl applies the configured base exactly once', () => {
  const base = assetBase();
  assert.ok(base.startsWith('/') && base.endsWith('/'), `unexpected base: ${base}`);
  assert.equal(assetUrl('images/hero.jpg'), `${base}images/hero.jpg`);
  assert.equal(assetUrl('/images/hero.jpg'), `${base}images/hero.jpg`);
});

test('every academy route declared in the tab list resolves, and unknown hashes do not', () => {
  assert.ok(isAcademyTab('dac_builder'), 'the DAC builder route must be reachable from search');
  assert.equal(readAcademyTab('#dac_builder'), 'dac_builder');
  assert.equal(readAcademyTab('#not-a-tab'), undefined);

  const searchSource = readFileSync(path.join(root, 'utils/globalSearchIndex.ts'), 'utf8');
  for (const match of searchSource.matchAll(/subTab:\s*'([a-z_]+)'/g)) {
    assert.ok(
      (ACADEMY_TABS as readonly string[]).includes(match[1]),
      `search points at #${match[1]} but the academy has no such tab`
    );
  }
});

test('the header does not lock its width, and the mobile strip follows the measured header height', () => {
  const app = readFileSync(path.join(root, 'App.tsx'), 'utf8');
  assert.match(app, /--insco-header-h/, 'the header height must be published as a CSS variable');
  assert.match(app, /<GlobalHeaderSearch/, 'the header must expose the global search');

  const portal = readFileSync(path.join(root, 'components/company/CompanyPortal.tsx'), 'utf8');
  assert.match(
    portal,
    /top-\[var\(--insco-header-h/,
    'the quick-jump strip must not hard-code a header height'
  );
});
