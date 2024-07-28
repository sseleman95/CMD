import CMDInit from '../helpers/CMD-init.js';
import { test, expect } from './fixtures/CMD-init-fixture.js';

test.describe('Search Plugin Tests', () => {
  test('search readme', async ({ page }) => {
    const CMDInitConfig = {
      markdown: {
        homepage: `
          # Hello World

          This is the homepage.
        `,
        sidebar: `
          - [Test Page](test)
        `,
      },
      routes: {
        '/test.md': `
          # Test Page

          This is a custom route.
        `,
      },
      scriptURLs: ['/dist/plugins/search.js'],
    };

    const searchFieldElm = page.locator('input[type=search]');
    const resultsHeadingElm = page.locator('.results-panel h2');

    await CMDInit(CMDInitConfig);

    await searchFieldElm.fill('hello');
    await expect(resultsHeadingElm).toHaveText('Hello World');
    await page.click('.clear-button');
    await searchFieldElm.fill('test');
    await expect(resultsHeadingElm).toHaveText('Test Page');
  });

  test('search ignore title', async ({ page }) => {
    const CMDInitConfig = {
      markdown: {
        homepage: `
          # Hello World

          This is the homepage.
        `,
        sidebar: `
          - [Home page](/)
          - [GitHub Pages](github)
        `,
      },
      routes: {
        '/github.md': `
            # GitHub Pages

            This is the GitHub Pages.

            ## GitHub Pages ignore1 <!-- {CMD-ignore} -->

            There're three places to populate your docs for your Github repository1.

            ## GitHub Pages ignore2 {CMD-ignore}

            There're three places to populate your docs for your Github repository2.
          `,
      },
      scriptURLs: ['/dist/plugins/search.js'],
    };

    const searchFieldElm = page.locator('input[type=search]');
    const resultsHeadingElm = page.locator('.results-panel h2');

    await CMDInit(CMDInitConfig);

    await searchFieldElm.fill('repository1');
    await expect(resultsHeadingElm).toHaveText('GitHub Pages ignore1');
    await page.click('.clear-button');
    await searchFieldElm.fill('repository2');
    await expect(resultsHeadingElm).toHaveText('GitHub Pages ignore2');
  });

  test('search only one homepage', async ({ page }) => {
    const CMDInitConfig = {
      markdown: {
        sidebar: `
          - [README](README)
          - [Test Page](test)
        `,
      },
      routes: {
        '/README.md': `
          # Hello World

          This is the homepage.
        `,
        '/test.md': `
          # Test Page

          This is a custom route.
        `,
      },
      scriptURLs: ['/dist/plugins/search.js'],
    };

    const searchFieldElm = page.locator('input[type=search]');
    const resultsHeadingElm = page.locator('.results-panel h2');
    const resultElm = page.locator('.matching-post');

    await CMDInit(CMDInitConfig);

    await searchFieldElm.fill('hello');
    await expect(resultElm).toHaveCount(1);
    await expect(resultsHeadingElm).toHaveText('Hello World');
    await page.click('.clear-button');
    await searchFieldElm.fill('test');
    await expect(resultsHeadingElm).toHaveText('Test Page');
  });

  test('search ignore diacritical marks', async ({ page }) => {
    const CMDInitConfig = {
      markdown: {
        homepage: `
          # Qué es

          CMD genera su sitio web de documentación sobre la marcha. A diferencia de GitBook, no genera archivos estáticos html. En cambio, carga y analiza de forma inteligente sus archivos de Markdown y los muestra como sitio web. Todo lo que necesita hacer es crear un index.html para comenzar y desplegarlo en GitHub Pages.
        `,
      },
      scriptURLs: ['/dist/plugins/search.js'],
    };

    const searchFieldElm = page.locator('input[type=search]');
    const resultsHeadingElm = page.locator('.results-panel h2');

    await CMDInit(CMDInitConfig);

    await searchFieldElm.fill('documentacion');
    await expect(resultsHeadingElm).toHaveText('Que es');
    await page.click('.clear-button');
    await searchFieldElm.fill('estáticos');
    await expect(resultsHeadingElm).toHaveText('Que es');
  });

  test('search when there is no title', async ({ page }) => {
    const CMDInitConfig = {
      markdown: {
        homepage: `
          This is some description. We assume autoHeader added the # Title. A long paragraph.
        `,
        sidebar: `
          - [Changelog](changelog)
        `,
      },
      routes: {
        '/changelog.md': `
          feat: Support search when there is no title

          ## Changelog Title

          hello, this is a changelog
        `,
      },
      scriptURLs: ['/dist/plugins/search.js'],
    };

    const searchFieldElm = page.locator('input[type=search]');
    const resultsHeadingElm = page.locator('.results-panel h2');

    await CMDInit(CMDInitConfig);

    await searchFieldElm.fill('paragraph');
    await expect(resultsHeadingElm).toHaveText('Home Page');
    await page.click('.clear-button');
    await searchFieldElm.fill('Support');
    await expect(resultsHeadingElm).toHaveText('changelog');
    await page.click('.clear-button');
    await searchFieldElm.fill('hello');
    await expect(resultsHeadingElm).toHaveText('Changelog Title');
  });

  test('search when there is no body', async ({ page }) => {
    const CMDInitConfig = {
      markdown: {
        homepage: `
          # EmptyContent
          ---
          ---
        `,
      },
      scriptURLs: ['/dist/plugins/search.js'],
    };

    const searchFieldElm = page.locator('input[type=search]');
    const resultsHeadingElm = page.locator('.results-panel h2');

    await CMDInit(CMDInitConfig);

    await searchFieldElm.fill('empty');
    await expect(resultsHeadingElm).toHaveText('EmptyContent');
  });

  test('handles default focusSearch binding', async ({ page }) => {
    const CMDInitConfig = {
      scriptURLs: ['/dist/plugins/search.js'],
    };

    const searchFieldElm = page.locator('input[type="search"]');

    await CMDInit(CMDInitConfig);

    await expect(searchFieldElm).not.toBeFocused();
    await page.keyboard.press('/');
    await expect(searchFieldElm).toBeFocused();
  });

  test('handles custom focusSearch binding', async ({ page }) => {
    const CMDInitConfig = {
      config: {
        search: {
          keyBindings: ['z'],
        },
      },
      scriptURLs: ['/dist/plugins/search.js'],
    };

    const searchFieldElm = page.locator('input[type="search"]');

    await CMDInit(CMDInitConfig);

    await expect(searchFieldElm).not.toBeFocused();
    await page.keyboard.press('/');
    await expect(searchFieldElm).not.toBeFocused();
    await page.keyboard.press('z');
    await expect(searchFieldElm).toBeFocused();
  });
});
