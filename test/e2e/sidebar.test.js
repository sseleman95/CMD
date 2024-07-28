import CMDInit from '../helpers/CMD-init.js';
import { test, expect } from './fixtures/CMD-init-fixture.js';

// Suite
// -----------------------------------------------------------------------------
test.describe('Sidebar Tests', () => {
  // Tests
  // ---------------------------------------------------------------------------
  test('Active Test', async ({ page }) => {
    const CMDInitConfig = {
      markdown: {
        sidebar: `
          - [Test Space](test%20space)
          - [Test _](test_foo)
          - [Test -](test-foo)
          - [Test .](test.foo)
          - [Test >](test>foo)
          - [Test](test)
        `,
      },
      routes: {
        '/test space.md': `
          # Test Space
        `,
        '/test_foo.md': `
          # Test _
        `,
        '/test-foo.md': `
          # Test -
        `,
        '/test.foo.md': `
          # Test .
        `,
        '/test>foo.md': `
          # Test >
        `,
        '/test.md': `
          # Test page
        `,
      },
    };

    const activeLinkElm = page.locator('.sidebar-nav li[class=active]');

    await CMDInit(CMDInitConfig);

    await page.click('a[href="#/test"]');
    await expect(activeLinkElm).toHaveText('Test');
    expect(page.url()).toMatch(/\/test$/);

    await page.click('a[href="#/test%20space"]');
    await expect(activeLinkElm).toHaveText('Test Space');
    expect(page.url()).toMatch(/\/test%20space$/);

    await page.click('a[href="#/test_foo"]');
    await expect(activeLinkElm).toHaveText('Test _');
    expect(page.url()).toMatch(/\/test_foo$/);

    await page.click('a[href="#/test-foo"]');
    await expect(activeLinkElm).toHaveText('Test -');
    expect(page.url()).toMatch(/\/test-foo$/);

    await page.click('a[href="#/test.foo"]');
    await expect(activeLinkElm).toHaveText('Test .');
    expect(page.url()).toMatch(/\/test.foo$/);

    await page.click('a[href="#/test>foo"]');
    await expect(activeLinkElm).toHaveText('Test >');
    expect(page.url()).toMatch(/\/test%3Efoo$/);
  });
});
