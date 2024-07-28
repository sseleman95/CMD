import CMDInit from '../helpers/CMD-init.js';
import { test, expect } from './fixtures/CMD-init-fixture.js';

test.describe('Security - Cross Site Scripting (XSS)', () => {
  const sharedOptions = {
    markdown: {
      homepage: '# Hello World',
    },
    routes: {
      'test.md': '# Test Page',
    },
  };
  const slashStrings = ['//', '///'];

  for (const slashString of slashStrings) {
    const hash = `#${slashString}domain.com/file.md`;

    test(`should not load remote content from hash (${hash})`, async ({
      page,
    }) => {
      const mainElm = page.locator('#main');

      await CMDInit(sharedOptions);
      await expect(mainElm).toContainText('Hello World');
      await page.evaluate(() => (location.hash = '#/test'));
      await expect(mainElm).toContainText('Test Page');
      await page.evaluate(newHash => {
        location.hash = newHash;
      }, hash);
      await expect(mainElm).toContainText('Hello World');
      expect(page.url()).toMatch(/#\/$/);
    });
  }
});
