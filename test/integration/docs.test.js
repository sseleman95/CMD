import { jest } from '@jest/globals';
import CMDInit from '../helpers/CMD-init.js';

// Suite
// -----------------------------------------------------------------------------
describe('Docs Site', function () {
  // Tests
  // ---------------------------------------------------------------------------
  test('coverpage renders and is unchanged', async () => {
    // Override Math.random implementation to prevent random gradient values
    // used as background image from causing test to fail
    const mathSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

    await CMDInit({
      config: {
        coverpage: '_coverpage.md',
      },
      markdown: {
        homepage: '# Hello World',
      },
      waitForSelector: '.cover-main > *',
    });

    const coverpageElm = document.querySelector('section.cover');

    // Test snapshots
    expect(mathSpy).toHaveBeenCalled();
    expect(coverpageElm).not.toBeNull();
    expect(coverpageElm.outerHTML).toMatchSnapshot();
  });

  test('sidebar renders and is unchanged', async () => {
    await CMDInit({
      config: {
        loadSidebar: '_sidebar.md',
      },
      markdown: {
        homepage: '# Hello World',
      },
      waitForSelector: '.sidebar-nav > ul',
    });

    const sidebarElm = document.querySelector('.sidebar');

    // Test snapshots
    expect(sidebarElm).not.toBeNull();
    expect(sidebarElm.outerHTML).toMatchSnapshot();
  });

  test('navbar renders and is unchanged', async () => {
    await CMDInit({
      config: {
        loadNavbar: '_navbar.md',
      },
      markdown: {
        homepage: '# Hello World',
      },
      waitForSelector: '.app-nav > ul',
    });

    const navbarElm = document.querySelector('nav.app-nav');

    // Test snapshots
    expect(navbarElm).not.toBeNull();
    expect(navbarElm.outerHTML).toMatchSnapshot();
  });
});
