// Copyright (c) 2023-present VexFlow contributors: https://github.com/vexflow/vexflow/graphs/contributors
// MIT License
//
// vexflow.ts is the entry point for the build output file vexflow.js.

// The webpack config inside Gruntfile.js sets the webpack mode to 'production' to produce a minified build.

import { VexFlow } from '../src/vexflow';

import { Font } from '../src/font';
import { Academico } from '../src/fonts/academico';
import { AcademicoBold } from '../src/fonts/academicobold';
import { Bravura } from '../src/fonts/bravura';
import { Gonville } from '../src/fonts/gonville';
import { Petaluma } from '../src/fonts/petaluma';
import { PetalumaScript } from '../src/fonts/petalumascript';

// Our convention is to use display: 'swap' for text fonts, and 'block' for music fonts.
const block = { display: 'block' };
const swap = { display: 'swap' };
const swapBold = { display: 'swap', weight: 'bold' };

const fontBravura = Font.load('Bravura', Bravura, block);
const fontAcademico = Font.load('Academico', Academico, swap);
const fontAcademicoBold = Font.load('Academico', AcademicoBold, swapBold);
const fontGonville = Font.load('Gonville', Gonville, block);
const fontPetaluma = Font.load('Petaluma', Petaluma, block);
const fontPetalumaScript = Font.load('Petaluma Script', PetalumaScript, swap);

const fontLoadPromises = [
  fontBravura,
  fontAcademico,
  fontAcademicoBold,
  fontGonville,
  fontPetaluma,
  fontPetalumaScript,
];

VexFlow.BUILD.INFO = 'vexflow';

// Set default fonts immediately so Metrics.get('fontFamily') returns
// the correct value even before fonts finish loading.
VexFlow.setFonts('Bravura', 'Academico');

/**
 * A promise that resolves when all bundled fonts have been loaded and added
 * to `document.fonts`. Consumers should `await fontsReady` before rendering
 * to ensure font-family references in SVG resolve to the correct glyphs.
 *
 * Usage:
 * ```ts
 * import { fontsReady } from 'dreamflow';
 * await fontsReady;
 * // Now safe to render
 * ```
 */
export const fontsReady: Promise<void> = Promise.allSettled(fontLoadPromises).then(() => {
  // Re-apply setFonts after load to clear any stale Metrics caches
  // that may have been populated during the async font loading window.
  VexFlow.setFonts(...VexFlow.getFonts());
});

export * from '../src/index';
export default VexFlow;
