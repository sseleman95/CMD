import CMDInit from '../helpers/CMD-init.js';
import { test, expect } from './fixtures/CMD-init-fixture.js';

test.describe('Creating a CMD site (e2e tests in Playwright)', () => {
  test('manual CMD site using playwright methods', async ({ page }) => {
    // Add CMD target element
    await page.setContent('<div id="app"></div>');

    // Set CMD configuration
    await page.evaluate(() => {
      window.$CMD = {
        el: '#app',
        themeColor: 'red',
      };
    });

    // Inject CMD theme (vue.css)
    await page.addStyleTag({ url: '/dist/themes/vue.css' });

    // Inject CMD.js
    await page.addScriptTag({ url: '/dist/CMD.js' });

    // Wait for CMD to initialize
    await page.locator('#main').waitFor();

    // Create handle for JavaScript object in browser
    const $CMD = await page.evaluate(() => window.$CMD);
    // const $CMD = await page.evaluateHandle(() => window.$CMD);

    // Test object property and value
    expect($CMD).toHaveProperty('themeColor', 'red');
  });

  test('CMD /docs/ site using CMDInit()', async ({ page }) => {
    // Load custom CMD
    // (See ./helpers/CMDInit.js for details)
    await CMDInit({
      // _logHTML: true,
    });

    // Verify CMDInitConfig.markdown content was rendered
    const mainElm = page.locator('#main');
    await expect(mainElm).toHaveCount(1);
    await expect(mainElm).toContainText(
      'A magical documentation site generator',
    );
  });

  test('custom CMD site using CMDInit()', async ({ page }) => {
    const CMDInitConfig = {
      config: {
        name: 'CMD Name',
        themeColor: 'red',
      },
      markdown: {
        coverpage: `
          # CMD Test

          > Testing a magical documentation site generator

        `,
        homepage: `
          # Hello World

          This is the homepage.
        `,
        navbar: `
        `,
        sidebar: `
          - [Test Page](test)
        `,
      },
      routes: {
        'test.md': `
          # Test Page

          This is a custom route.
        `,
        'data-test-scripturls.js': `
          document.body.setAttribute('data-test-scripturls', 'pass');
        `,
      },
      script: `
        document.body.setAttribute('data-test-script', 'pass');
      `,
      scriptURLs: [
        // CMDInit() route
        'data-test-scripturls.js',
        // Server route
        '/dist/plugins/search.js',
      ],
      style: `
        body {
          background: red !important;
        }
      `,
      styleURLs: ['/dist/themes/vue.css'],
    };

    await CMDInit({
      ...CMDInitConfig,
      // _logHTML: true,
    });

    const $CMD = await page.evaluate(() => window.$CMD);

    // Verify config options
    expect(typeof $CMD).toEqual('object');
    expect($CMD).toHaveProperty('themeColor', 'red');
    await expect(page.locator('.app-name')).toHaveText('CMD Name');

    // Verify CMDInitConfig.markdown content was rendered
    await expect(page.locator('section.cover h1')).toHaveText('CMD Test'); // Coverpage
    await expect(page.locator('nav.app-nav')).toHaveText('CMD.js.org'); // Navbar
    await expect(page.locator('aside.sidebar')).toContainText('Test Page'); // Sidebar
    await expect(page.locator('#main')).toContainText('This is the homepage'); // Homepage

    // Verify CMDInitConfig.scriptURLs were added to the DOM
    for (const scriptURL of CMDInitConfig.scriptURLs) {
      await expect(page.locator(`script[src$="${scriptURL}"]`)).toHaveCount(1);
    }

    // Verify CMDInitConfig.scriptURLs were executed
    await expect(page.locator('body[data-test-scripturls]')).toHaveCount(1);
    await expect(page.locator('.search input[type="search"]')).toHaveCount(1);

    // Verify CMDInitConfig.script was added to the DOM
    expect(
      await page.evaluate(
        scriptText => {
          return [...document.querySelectorAll('script')].some(
            elm => elm.textContent.replace(/\s+/g, '') === scriptText,
          );
        },
        CMDInitConfig.script.replace(/\s+/g, ''),
      ),
    ).toBe(true);

    // Verify CMDInitConfig.script was executed
    await expect(page.locator('body[data-test-script]')).toHaveCount(1);

    // Verify CMDInitConfig.styleURLs were added to the DOM
    for (const styleURL of CMDInitConfig.styleURLs) {
      await expect(
        page.locator(`link[rel*="stylesheet"][href$="${styleURL}"]`),
      ).toHaveCount(1);
    }

    // Verify CMDInitConfig.style was added to the DOM
    expect(
      await page.evaluate(
        styleText => {
          return [...document.querySelectorAll('style')].some(
            elm => elm.textContent.replace(/\s+/g, '') === styleText,
          );
        },
        CMDInitConfig.style.replace(/\s+/g, ''),
      ),
    ).toBe(true);

    // Verify CMD navigation and CMDInitConfig.routes
    await page.click('a[href="#/test"]');
    expect(page.url()).toMatch(/\/test$/);
    await expect(page.locator('#main')).toContainText('This is a custom route');
  });

  // test.fixme('image snapshots', async ({ page }) => {
  //   await CMDInit({
  //     config: {
  //       name: 'CMD Test',
  //     },
  //     markdown: {
  //       homepage: `
  //         # The Cosmos Awaits

  //         [Carl Sagan](https://en.wikipedia.org/wiki/Carl_Sagan)

  //         Cosmic ocean take root and flourish decipherment hundreds of thousands
  //         dream of the mind's eye courage of our questions. At the edge of forever
  //         network of wormholes ship of the imagination two ghostly white figures
  //         in coveralls and helmets are softly dancing are creatures of the cosmos
  //         the only home we've ever known? How far away emerged into consciousness
  //         bits of moving fluff gathered by gravity with pretty stories for which
  //         there's little good evidence vanquish the impossible.

  //         The ash of stellar alchemy permanence of the stars shores of the cosmic
  //         ocean billions upon billions Drake Equation finite but unbounded.
  //         Hundreds of thousands cosmic ocean hearts of the stars Hypatia invent
  //         the universe hearts of the stars? Realm of the galaxies muse about dream
  //         of the mind's eye hundreds of thousands the only home we've ever known
  //         how far away. Extraordinary claims require extraordinary evidence
  //         citizens of distant epochs invent the universe as a patch of light the
  //         carbon in our apple pies gathered by gravity.

  //         Billions upon billions gathered by gravity white dwarf intelligent
  //         beings vanquish the impossible descended from astronomers. A still more
  //         glorious dawn awaits cosmic ocean star stuff harvesting star light the
  //         sky calls to us kindling the energy hidden in matter rich in heavy
  //         atoms. A mote of dust suspended in a sunbeam across the centuries the
  //         only home we've ever known bits of moving fluff a very small stage in a
  //         vast cosmic arena courage of our questions.

  //         Euclid the only home we've ever known realm of the galaxies trillion
  //         radio telescope Apollonius of Perga. The carbon in our apple pies invent
  //         the universe muse about stirred by starlight great turbulent clouds
  //         emerged into consciousness? Invent the universe vastness is bearable
  //         only through love a still more glorious dawn awaits descended from
  //         astronomers as a patch of light the sky calls to us. Great turbulent
  //         clouds citizens of distant epochs invent the universe two ghostly white
  //         figures in coveralls and helmets are softly dancing courage of our
  //         questions rich in heavy atoms and billions upon billions upon billions
  //         upon billions upon billions upon billions upon billions.
  //       `,
  //     },
  //     styleURLs: [`/dist/themes/vue.css`],
  //     // _logHTML: true,
  //   });

  //   // Viewport screenshot
  //   const viewportShot = await page.screenshot();
  //   expect(viewportShot).toMatchSnapshot('viewport.png');

  //   // Element screenshot
  //   const elmHandle = await page.locator('h1').first();
  //   const elmShot = await elmHandle.screenshot();
  //   expect(elmShot).toMatchSnapshot('element.png');
  // });
});
