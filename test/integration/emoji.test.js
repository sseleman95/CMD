import CMDInit from '../helpers/CMD-init.js';

// Suite
// -----------------------------------------------------------------------------
describe('Emoji', function () {
  // Tests
  // ---------------------------------------------------------------------------
  const emojiMarkdown = `
    :smile:

    :smile::smile:

    :smile: :smile:

    :smile::smile::smile:

    :smile: :smile: :smile:

    text:smile:

    :smile:text

    text:smile:text
  `;

  test('Renders native emoji characters (nativeEmoji:true)', async () => {
    await CMDInit({
      config: {
        nativeEmoji: true,
      },
      markdown: {
        homepage: emojiMarkdown,
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Renders GitHub emoji images (nativeEmoji:false)', async () => {
    await CMDInit({
      config: {
        nativeEmoji: false,
      },
      markdown: {
        homepage: emojiMarkdown,
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Ignores all emoji shorthand codes (noEmoji:true)', async () => {
    await CMDInit({
      config: {
        noEmoji: true,
      },
      markdown: {
        homepage: emojiMarkdown,
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Ignores unmatched emoji shorthand codes', async () => {
    await CMDInit({
      markdown: {
        homepage: `
          hh:mm

          hh:mm:ss

          Namespace::SubNameSpace

          Namespace::SubNameSpace::Class

          2014-12-29T16:11:20+00:00
        `,
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Ignores emoji shorthand codes in comments', async () => {
    await CMDInit({
      markdown: {
        homepage: 'Text <!-- :foo: :100: -->',
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Ignores emoji shorthand codes in URIs', async () => {
    await CMDInit({
      markdown: {
        homepage:
          '',
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Ignores emoji shorthand codes in URIs while handling anchor content', async () => {
    await CMDInit({
      markdown: {
        homepage: '',
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Ignores emoji shorthand codes in html attributes', async () => {
    await CMDInit({
      markdown: {
        homepage:
          /* html */ '<a href="http://domain.com/:smile:/"> <img src=\'http://domain.com/:smile:/file.png\'> <script src=http://domain.com/:smile:/file.js></script>',
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Ignores emoji shorthand codes in style url() values', async () => {
    await CMDInit({
      markdown: {
        homepage:
          /* html */ '<style>@import url(http://domain.com/:smile/file.css);</style>',
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });

  test('Ignores emoji shorthand codes in code, pre, script, and template tags', async () => {
    await CMDInit({
      markdown: {
        homepage: /* html */ `
          <pre>:100:</pre>

          <code>:100:</code>

          <script>
            var test = ':100:';
          </script>

          <template>
            <p>:100</p>
          </template>
        `,
      },
      // _logHTML: true,
    });

    const mainElm = document.querySelector('#main');

    expect(mainElm.innerHTML).toMatchSnapshot();
  });
});
