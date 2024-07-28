import { jest } from '@jest/globals';
import CMDInit from '../helpers/CMD-init.js';

// Suite
// -----------------------------------------------------------------------------
describe('CMD', function () {
  // Tests
  // ---------------------------------------------------------------------------
  test('allows $CMD configuration to be a function', async () => {
    const testConfig = jest.fn(vm => {
      expect(vm).toBeInstanceOf(Object);
      expect(vm.constructor.name).toBe('CMD');
      expect(vm.$fetch).toBeInstanceOf(Function);
      expect(vm.route).toBeInstanceOf(Object);
    });

    await CMDInit({
      config: testConfig,
    });

    expect(typeof CMD).toBe('object');
    expect(testConfig).toHaveBeenCalled();
  });

  test('provides the hooks and vm API to plugins', async () => {
    const testConfig = jest.fn(vm => {
      const vm1 = vm;

      return {
        plugins: [
          function (hook, vm2) {
            expect(vm1).toEqual(vm2);

            expect(hook.init).toBeInstanceOf(Function);
            expect(hook.beforeEach).toBeInstanceOf(Function);
            expect(hook.afterEach).toBeInstanceOf(Function);
            expect(hook.doneEach).toBeInstanceOf(Function);
            expect(hook.mounted).toBeInstanceOf(Function);
            expect(hook.ready).toBeInstanceOf(Function);
          },
        ],
      };
    });

    await CMDInit({
      config: testConfig,
    });

    expect(typeof CMD).toBe('object');
    expect(testConfig).toHaveBeenCalled();
  });
});
