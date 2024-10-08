import { isExternal } from '../../src/core/util/index.js';

// Core util
// -----------------------------------------------------------------------------
describe('core/util', () => {
  // isExternal()
  // ---------------------------------------------------------------------------
  describe('isExternal()', () => {
    // cases non external
    test('non external local url with one /', () => {
      const result = isExternal(`/${location.host}/CMD/demo.md`);

      expect(result).toBeFalsy();
    });

    test('non external local url with two //', () => {
      const result = isExternal(`//${location.host}/CMD/demo.md`);

      expect(result).toBeFalsy();
    });

    test('non external local url with three ///', () => {
      const result = isExternal(`///${location.host}/CMD/demo.md`);

      expect(result).toBeFalsy();
    });

    test('non external local url with more /', () => {
      const result = isExternal(
        `//////////////////${location.host}/CMD/demo.md`,
      );

      expect(result).toBeFalsy();
    });

    test('non external url with one /', () => {
      const result = isExternal('/example.github.io/CMD/demo.md');

      expect(result).toBeFalsy();
    });

    // cases is external
    test('external url with two //', () => {
      const result = isExternal('/CMD/demo.md');

      expect(result).toBeFalsy();
    });

    test('external url with three ///', () => {
      const result = isExternal('///example.github.io/CMD/demo.md');

      expect(result).toBeTruthy();
    });

    test('external url with more /', () => {
      const result = isExternal(
        '//////////////////example.github.io/CMD/demo.md',
      );

      expect(result).toBeTruthy();
    });

    test('external url with one \\', () => {
      const result = isExternal('/\\example.github.io/CMD/demo.md');

      expect(result).toBeTruthy();
    });

    test('external url with two \\', () => {
      const result = isExternal('/\\\\example.github.io/CMD/demo.md');

      expect(result).toBeTruthy();
    });
  });
});
