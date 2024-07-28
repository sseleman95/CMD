import initGlobalAPI from '../../src/core/global-api.js';

// Suite
// -----------------------------------------------------------------------------
describe('Global APIs', function () {
  // Tests
  // ---------------------------------------------------------------------------
  test('APIs are available', () => {
    initGlobalAPI();

    expect(typeof window.CMD).toBe('object');
    expect(typeof window.CMD.util).toBe('object');
    expect(typeof window.CMD.dom).toBe('object');
    expect(typeof window.CMD.get).toBe('function');
    expect(typeof window.CMD.slugify).toBe('function');
    expect(typeof window.CMD.version).toBe('string');
    expect(typeof window.CMDCompiler).toBe('function');
    expect(typeof window.marked).toBe('function');
    expect(typeof window.Prism).toBe('object');
  });
});
