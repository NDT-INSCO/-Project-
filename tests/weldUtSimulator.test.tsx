import React from 'react';
import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { ComprehensiveWeldUtSimulator } from '../src/components/academy/virtuallab/ComprehensiveWeldUtSimulator';
import { EducationalAcademy } from '../src/components/EducationalAcademy';

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.org/-Project-/#academy' });
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  localStorage: dom.window.localStorage,
  HTMLElement: dom.window.HTMLElement,
  HTMLCanvasElement: dom.window.HTMLCanvasElement,
});

// Mock HTML5 canvas getContext for jsdom
if (!dom.window.HTMLCanvasElement.prototype.getContext) {
  // @ts-expect-error jsdom canvas mock
  dom.window.HTMLCanvasElement.prototype.getContext = () => ({
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: new Array(4) }),
    putImageData: () => {},
    createImageData: () => ([]),
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    fill: () => {},
    arc: () => {},
    ellipse: () => {},
    quadraticCurveTo: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
    createRadialGradient: () => ({ addColorStop: () => {} }),
    setLineDash: () => {},
  });
}

const { render, fireEvent, cleanup } = await import('@testing-library/react');
afterEach(() => {
  cleanup();
  localStorage.clear();
});

test('ComprehensiveWeldUtSimulator renders weld cross-section and flaw detector controls', () => {
  const ui = render(<ComprehensiveWeldUtSimulator language="en" />);

  // Title and banner
  assert.ok(ui.getAllByText(/Comprehensive Ultrasonic Weld Inspection/i).length > 0);

  // Workflow steps buttons
  assert.ok(ui.getByRole('button', { name: /1\. Scan & Ray Trace/i }));
  assert.ok(ui.getByRole('button', { name: /2\. Full Calibration Keys/i }));
  assert.ok(ui.getByRole('button', { name: /3\. Code Evaluation/i }));
  assert.ok(ui.getByRole('button', { name: /4\. Official Test Report/i }));

  // Angle beam probe buttons
  assert.ok(ui.getByRole('button', { name: /45° Shear/i }));
  assert.ok(ui.getByRole('button', { name: /60° Shear/i }));
  assert.ok(ui.getByRole('button', { name: /70° Shear/i }));

  // Standoff slider
  const standoffSlider = ui.getByLabelText(/Probe Standoff Distance/i) as HTMLInputElement;
  assert.ok(standoffSlider);
  assert.equal(standoffSlider.min, '10');
  assert.equal(standoffSlider.max, '80');
});

test('ComprehensiveWeldUtSimulator switches between calibration keys, code evaluation and official report', () => {
  const ui = render(<ComprehensiveWeldUtSimulator language="en" />);

  // Switch to Full Calibration Keys
  fireEvent.click(ui.getByRole('button', { name: /2\. Full Calibration Keys/i }));
  assert.ok(ui.getByText(/VELOCITY & PROBE ZERO/i));
  assert.ok(ui.getByText(/PULSER & RECEIVER/i));
  assert.ok(ui.getByText(/CALIBRATION BLOCK & DAC/i));

  // Trigger Auto-Cal
  fireEvent.click(ui.getByRole('button', { name: /Auto-Cal Standard/i }));

  // Switch to Code Evaluation
  fireEvent.click(ui.getByRole('button', { name: /3\. Code Evaluation/i }));
  assert.ok(ui.getByText(/Code Compliance & Flaw Acceptance Engine/i));
  assert.ok(ui.getAllByText(/ASME Sec VIII/i).length > 0);

  // Switch to Official Test Report
  fireEvent.click(ui.getByRole('button', { name: /4\. Official Test Report/i }));
  assert.ok(ui.getByText(/Official Ultrasonic Examination Test Report/i));
  assert.ok(ui.getByText(/INSCO-UT-2026-0428/i));
  assert.ok(ui.getByText(/Print \/ Export PDF/i));
});

test('ComprehensiveWeldUtSimulator correctly evaluates Planar Crack as REJECT per ASME UW-51', () => {
  const ui = render(<ComprehensiveWeldUtSimulator language="en" />);

  // Open Code Evaluation tab
  fireEvent.click(ui.getByRole('button', { name: /3\. Code Evaluation/i }));

  // Default flaw is Root Crack (Planar) -> Should be REJECT
  assert.ok(ui.getByText(/VERDICT: REJECTED \/ UNACCEPTABLE/i));
  assert.ok(ui.getByText(/ASME Sec VIII Div 1/i));
});

test('EducationalAcademy renders ComprehensiveWeldUtSimulator when initialSubTab is weld_simulator', () => {
  const ui = render(<EducationalAcademy language="en" initialSubTab="weld_simulator" />);

  assert.ok(ui.getAllByText(/Comprehensive Ultrasonic Weld Inspection/i).length > 0);
  assert.ok(ui.getByLabelText(/Probe Standoff Distance/i));
});
