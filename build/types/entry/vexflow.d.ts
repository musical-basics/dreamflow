import { VexFlow } from '../src/vexflow';
/**
 * A promise that resolves when all bundled fonts have been loaded and added
 * to `document.fonts`. Await this before rendering to ensure correct font glyphs.
 */
export declare const fontsReady: Promise<void>;
export * from '../src/index';
export default VexFlow;
