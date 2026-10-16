import React from 'react';
import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { AcademyKnowledgeLibrary } from '../src/components/academy/AcademyKnowledgeLibrary';
import { KNOWLEDGE_LESSONS, ACADEMY_SOURCES } from '../src/data/academyKnowledge';
import { ENGINEERING_DISCIPLINES } from '../src/data/academyCurriculum';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.org/-Project-/#academy' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, localStorage: dom.window.localStorage, HTMLElement: dom.window.HTMLElement });
const { render, fireEvent, cleanup } = await import('@testing-library/react');
afterEach(() => { cleanup(); localStorage.clear(); });
const open = (language: 'ar' | 'en' = 'en', onCurriculum = (_id: string) => {}) => render(<AcademyKnowledgeLibrary language={language} onCurriculum={onCurriculum} />);

test('all lessons have unique IDs, valid sources, bilingual content and valid answers', () => {
  assert.equal(new Set(KNOWLEDGE_LESSONS.map(l => l.id)).size, KNOWLEDGE_LESSONS.length);
  assert.equal(KNOWLEDGE_LESSONS.length, 23);
  for (const l of KNOWLEDGE_LESSONS) {
    assert.ok(ENGINEERING_DISCIPLINES.some(d => d.id === l.discipline));
    assert.ok(l.sources.length && l.sources.every(id => ACADEMY_SOURCES.some(s => s.id === id)));
    assert.ok(l.answer >= 0 && l.answer < l.options.length);
    for (const lang of ['ar', 'en'] as const) {
      assert.ok(l.title[lang] && l.example[lang] && l.explanation[lang]);
      assert.equal(l.sections.length, 3);
      assert.ok(l.sections.every(s => s.body[lang].length > 80));
    }
  }
  for (const d of ENGINEERING_DISCIPLINES) assert.ok(KNOWLEDGE_LESSONS.some(l => l.discipline === d.id));
});

test('search, empty state and reset', () => {
  const ui = open();
  fireEvent.change(ui.getByRole('textbox', { name: 'Search lessons' }), { target: { value: 'no-such-lesson' } });
  assert.ok(ui.getByText(/No results/));
  fireEvent.click(ui.getByRole('button', { name: 'Clear search and filters' }));
  assert.ok(ui.getAllByRole('button', { name: /Measurement, units/ })[0]);
  fireEvent.change(ui.getByRole('textbox'), { target: { value: 'capillary' } });
  assert.ok(ui.getByRole('button', { name: /PT: wetting/ }));
  assert.equal(ui.queryByRole('button', { name: /FOUNDATION Measurement, units/ }), null);
});

test('Arabic search handles hamza and renders RTL', () => {
  const ui = open('ar');
  assert.equal(ui.container.firstElementChild?.getAttribute('dir'), 'rtl');
  fireEvent.change(ui.getByRole('textbox'), { target: { value: 'الانبعاث' } });
  assert.ok(ui.getByRole('button', { name: /الانبعاث الصوتي/ }));
});

test('discipline filter and related curriculum navigation', () => {
  let destination = '';
  const ui = open('en', id => { destination = id; });
  fireEvent.change(ui.getByRole('combobox'), { target: { value: 'api_inspection' } });
  fireEvent.click(ui.getByRole('button', { name: /Corrosion rate & remaining life/ }));
  fireEvent.click(ui.getByRole('button', { name: 'Open related curriculum' }));
  assert.equal(destination, 'api_inspection');
});

test('knowledge check requires selection, explains wrong answer and allows retry', () => {
  const ui = open();
  fireEvent.click(ui.getAllByRole('button', { name: /Measurement, units/ })[0]);
  assert.equal((ui.getByRole('button', { name: 'Check answer' }) as HTMLButtonElement).disabled, true);
  fireEvent.click(ui.getByRole('radio', { name: 'Always' }));
  fireEvent.click(ui.getByRole('button', { name: 'Check answer' }));
  assert.ok(ui.getByText('Review the concept and try again'));
  fireEvent.click(ui.getByRole('button', { name: 'Try again' }));
  fireEvent.click(ui.getByRole('radio', { name: 'No; a common bias may remain' }));
  fireEvent.click(ui.getByRole('button', { name: 'Check answer' }));
  assert.ok(ui.getByText('Correct'));
  fireEvent.click(ui.getByRole('button', { name: 'Next lesson →' }));
  assert.equal(ui.getAllByRole('radio').some(r => (r as HTMLInputElement).checked), false);
});

test('read/unread persists without affecting existing curriculum progress', () => {
  localStorage.setItem('insco_academy_completed_modules', '{"existing":true}');
  const ui = open();
  fireEvent.click(ui.getAllByRole('button', { name: /Measurement, units/ })[0]);
  fireEvent.click(ui.getByRole('button', { name: 'Mark as read' }));
  assert.deepEqual(JSON.parse(localStorage.getItem('insco_knowledge_read_v1')!), ['measurement']);
  assert.equal(localStorage.getItem('insco_academy_completed_modules'), '{"existing":true}');
  ui.unmount();
  const reloaded = open();
  assert.equal(reloaded.getByRole('progressbar').getAttribute('aria-valuenow'), '1');
  fireEvent.click(reloaded.getAllByRole('button', { name: /Measurement, units/ })[0]);
  fireEvent.click(reloaded.getByRole('button', { name: 'Mark as unread' }));
  assert.equal(reloaded.getByRole('progressbar').getAttribute('aria-valuenow'), '0');
});

test('malformed and duplicate saved progress is handled', () => {
  localStorage.setItem('insco_knowledge_read_v1', 'null');
  const ui = open();
  assert.equal(ui.getByRole('progressbar').getAttribute('aria-valuenow'), '0');
  ui.unmount();
  localStorage.setItem('insco_knowledge_read_v1', '["measurement","measurement","unknown",42]');
  const next = open();
  assert.equal(next.getByRole('progressbar').getAttribute('aria-valuenow'), '1');
});

test('source directory has safe external links and lesson references', () => {
  const ui = open();
  fireEvent.click(ui.getByRole('button', { name: 'Source library' }));
  assert.equal(ui.getAllByRole('link').length, ACADEMY_SOURCES.length);
  for (const link of ui.getAllByRole('link')) {
    assert.ok(link.getAttribute('href')?.startsWith('https://'));
    assert.equal(link.getAttribute('rel'), 'noopener noreferrer');
  }
});
