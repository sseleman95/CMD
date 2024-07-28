import { waitForFunction, waitForText } from '../helpers/wait-for.js';
import CMDInit from '../helpers/CMD-init.js';

describe('Creating a CMD site (integration tests in Jest)', function () {
  test('CMD /docs/ site using CMDInit()', async () => {
    await CMDInit({
      // _logHTML: true,
    });

    // Verify config options
    expect(typeof window.$CMD).toBe('object');

    // Verify options.markdown content was rendered
    expect(document.querySelector('#main').textContent).toContain(
      'A magical documentation site generator',
    );
  });

  test('kitchen sink CMD site using CMDInit()', async () => {
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

    // Verify config options
    expect(typeof window.$CMD).toBe('object');
    expect(window.$CMD).toHaveProperty('themeColor', 'red');
    expect(document.querySelector('.app-name').textContent).toContain(
      'CMD Name',
    );

    // Verify CMDInitConfig.markdown content was rendered
    Object.entries({
      'section.cover': 'CMD Test', // Coverpage
      'nav.app-nav': '', // Navbar
      'aside.sidebar': 'Test Page', // Sidebar
      '#main': 'This is the homepage', // Homepage
    }).forEach(([selector, content]) => {
      expect(document.querySelector(selector).textContent).toContain(content);
    });

    // Verify CMDInitConfig.scriptURLs were added to the DOM
    for (const scriptURL of CMDInitConfig.scriptURLs) {
      const matchElm = document.querySelector(
        `script[data-src$="${scriptURL}"]`,
      );
      expect(matchElm).toBeTruthy();
    }

    // Verify CMDInitConfig.scriptURLs were executed
    expect(document.body.hasAttribute('data-test-scripturls')).toBe(true);
    expect(document.querySelector('.search input[type="search"]')).toBeTruthy();

    // Verify CMDInitConfig.script was added to the DOM
    expect(
      [...document.querySelectorAll('script')].some(
        elm =>
          elm.textContent.replace(/\s+/g, '') ===
          CMDInitConfig.script.replace(/\s+/g, ''),
      ),
    ).toBe(true);

    // Verify CMDInitConfig.script was executed
    expect(document.body.hasAttribute('data-test-script')).toBe(true);

    // Verify CMDInitConfig.styleURLs were added to the DOM
    for (const styleURL of CMDInitConfig.styleURLs) {
      const matchElm = document.querySelector(
        `link[rel*="stylesheet"][href$="${styleURL}"]`,
      );
      expect(matchElm).toBeTruthy();
    }

    // Verify CMDInitConfig.style was added to the DOM
    expect(
      [...document.querySelectorAll('style')].some(
        elm =>
          elm.textContent.replace(/\s+/g, '') ===
          CMDInitConfig.style.replace(/\s+/g, ''),
      ),
    ).toBe(true);

    // Verify CMD navigation and CMDInitConfig.routes
    document.querySelector('a[href="#/test"]').click();
    expect(
      await waitForFunction(() => /#\/test$/.test(window.location.href)),
    ).toBeTruthy();
    expect(await waitForText('#main', 'This is a custom route')).toBeTruthy();
  });
});
