/* global fail */
import CMDInit from '../helpers/CMD-init.js';
import { test, expect } from './fixtures/CMD-init-fixture.js';

test.describe('Configuration options', () => {
  test.describe('catchPluginErrors', () => {
    test('true (handles uncaught errors)', async ({ page }) => {
      let consoleMsg, errorMsg;

      page.on('console', msg => (consoleMsg = msg.text()));
      page.on('pageerror', err => (errorMsg = err.message));

      await CMDInit({
        config: {
          catchPluginErrors: true,
          plugins: [
            function (hook, vm) {
              hook.init(function () {
                fail();
              });
              hook.beforeEach(markdown => {
                return `${markdown}\n\nbeforeEach`;
              });
            },
          ],
        },
        markdown: {
          homepage: '# Hello World',
        },
        // _logHTML: true,
      });

      const mainElm = page.locator('#main');

      expect(errorMsg).toBeUndefined();
      expect(consoleMsg).toContain('CMD plugin error');
      await expect(mainElm).toContainText('Hello World');
      await expect(mainElm).toContainText('beforeEach');
    });

    test('false (throws uncaught errors)', async ({ page }) => {
      let consoleMsg, errorMsg;

      page.on('console', msg => (consoleMsg = msg.text()));
      page.on('pageerror', err => (errorMsg = err.message));

      await CMDInit({
        config: {
          catchPluginErrors: false,
          plugins: [
            function (hook, vm) {
              hook.ready(function () {
                fail();
              });
            },
          ],
        },
        markdown: {
          homepage: '# Hello World',
        },
        // _logHTML: true,
      });

      expect(consoleMsg).toBeUndefined();
      expect(errorMsg).toContain('fail');
    });
  });

  test.describe('notFoundPage', () => {
    test.describe('renders default error content', () => {
      test.beforeEach(async ({ page }) => {
        await page.route('README.md', async route => {
          await route.fulfill({
            status: 500,
          });
        });
      });

      test('false', async ({ page }) => {
        await CMDInit({
          config: {
            notFoundPage: false,
          },
        });

        await expect(page.locator('#main')).toContainText('500');
      });

      test('true with non-404 error', async ({ page }) => {
        await CMDInit({
          config: {
            notFoundPage: true,
          },
          routes: {
            '_404.md': '',
          },
        });

        await expect(page.locator('#main')).toContainText('500');
      });

      test('string with non-404 error', async ({ page }) => {
        await CMDInit({
          config: {
            notFoundPage: '404.md',
          },
          routes: {
            '404.md': '',
          },
        });

        await expect(page.locator('#main')).toContainText('500');
      });
    });

    test('true: renders _404.md page', async ({ page }) => {
      const expectText = 'Pass';

      await CMDInit({
        config: {
          notFoundPage: true,
        },
        routes: {
          '_404.md': expectText,
        },
      });

      await page.evaluate(() => (window.location.hash = '#/fail'));
      await expect(page.locator('#main')).toContainText(expectText);
    });

    test('string: renders specified 404 page', async ({ page }) => {
      const expectText = 'Pass';

      await CMDInit({
        config: {
          notFoundPage: '404.md',
        },
        routes: {
          '404.md': expectText,
        },
      });

      await page.evaluate(() => (window.location.hash = '#/fail'));
      await expect(page.locator('#main')).toContainText(expectText);
    });
  });
});

test.describe('keyBindings', () => {
  test('handles toggleSidebar binding (default)', async ({ page }) => {
    const CMDInitConfig = {
      markdown: {
        homepage: `
          # Heading 1
        `,
      },
    };

    await CMDInit(CMDInitConfig);

    const bodyElm = page.locator('body');

    await expect(bodyElm).not.toHaveClass(/close/);
    await page.keyboard.press('\\');
    await expect(bodyElm).toHaveClass(/close/);
  });

  test('handles custom binding', async ({ page }) => {
    const CMDInitConfig = {
      config: {
        keyBindings: {
          customBinding: {
            bindings: 'z',
            callback(e) {
              const elm = document.querySelector('main input[type="text"]');

              elm.value = 'foo';
            },
          },
        },
      },
      markdown: {
        homepage: `
          <input type="text">
        `,
      },
    };

    const inputElm = page.locator('main input[type="text"]');

    await CMDInit(CMDInitConfig);

    await expect(inputElm).toHaveValue('');
    await page.keyboard.press('z');
    await expect(inputElm).toHaveValue('foo');
  });

  test('ignores event when focused on text input elements', async ({
    page,
  }) => {
    const CMDInitConfig = {
      config: {
        keyBindings: {
          customBinding: {
            bindings: 'z',
            callback(e) {
              document.body.setAttribute('data-foo', '');
            },
          },
        },
      },
      markdown: {
        homepage: `
          <input type="text">
          <select>
            <option value="a" selected>a</option>
            <option value="z">z</option>
          </select>
          <textarea></textarea>
        `,
      },
    };

    const bodyElm = page.locator('body');
    const inputElm = page.locator('input[type="text"]');
    const selectElm = page.locator('select');
    const textareaElm = page.locator('textarea');

    await CMDInit(CMDInitConfig);

    await inputElm.focus();
    await expect(inputElm).toHaveValue('');
    await page.keyboard.press('z');
    await expect(inputElm).toHaveValue('z');
    await inputElm.blur();

    await textareaElm.focus();
    await expect(textareaElm).toHaveValue('');
    await page.keyboard.press('z');
    await expect(textareaElm).toHaveValue('z');
    await textareaElm.blur();

    await selectElm.focus();
    await page.keyboard.press('z');
    await expect(selectElm).toHaveValue('z');
    await selectElm.blur();

    await expect(bodyElm).not.toHaveAttribute('data-foo');
    await page.keyboard.press('z');
    await expect(bodyElm).toHaveAttribute('data-foo');
  });
});
