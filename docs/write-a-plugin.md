# Write a plugin

A CMD plugin is a function with the ability to execute custom JavaScript code at various stages of CMD's lifecycle.

## Setup

CMD plugins can be added directly to the `plugins` array:

```js
window.$CMD = {
  plugins: [
    function myPlugin1(hook, vm) {
      // ...
    },
    function myPlugin2(hook, vm) {
      // ...
    },
  ],
};
```

Alternatively, a plugin can be stored in a separate file and "installed" using a standard `<script>` tag:

```js
// CMD-plugin-myplugin.js

{
  function myPlugin(hook, vm) {
    // ...
  }

  // Add plugin to CMD's plugin array
  window.$CMD = window.$CMD || {};
  $CMD.plugins = [...($CMD.plugins || []), myPlugin];
}
```

```html
<script src="CMD-plugin-myplugin.js"></script>
```

## Template

Below is a plugin template with placeholders for all available lifecycle hooks.

1. Copy the template
1. Modify the `myPlugin` name as appropriate
1. Add your plugin logic
1. Remove unused lifecycle hooks
1. Save the file as `CMD-plugin-[name].js`
1. Load your plugin using a standard `<script>` tag

```js
{
  function myPlugin(hook, vm) {
    // Invoked one time when CMD script is initialized
    hook.init(() => {
      // ...
    });

    // Invoked one time when the CMD instance has mounted on the DOM
    hook.mounted(() => {
      // ...
    });

    // Invoked on each page load before new markdown is transformed to HTML.
    // Supports asynchronous tasks (see beforeEach documentation for details).
    hook.beforeEach(markdown => {
      // ...
      return markdown;
    });

    // Invoked on each page load after new markdown has been transformed to HTML.
    // Supports asynchronous tasks (see afterEach documentation for details).
    hook.afterEach(html => {
      // ...
      return html;
    });

    // Invoked on each page load after new HTML has been appended to the DOM
    hook.doneEach(() => {
      // ...
    });

    // Invoked one time after rendering the initial page
    hook.ready(() => {
      // ...
    });
  }

  // Add plugin to CMD's plugin array
  window.$CMD = window.$CMD || {};
  $CMD.plugins = [myPlugin, ...($CMD.plugins || [])];
}
```

## Lifecycle Hooks

Lifecycle hooks are provided via the `hook` argument passed to the plugin function.

### init()

Invoked one time when CMD script is initialized.

```js
hook.init(() => {
  // ...
});
```

### mounted()

Invoked one time when the CMD instance has mounted on the DOM.

```js
hook.mounted(() => {
  // ...
});
```

### beforeEach()

Invoked on each page load before new markdown is transformed to HTML.

```js
hook.beforeEach(markdown => {
  // ...
  return markdown;
});
```

For asynchronous tasks, the hook function accepts a `next` callback as a second argument. Call this function with the final `markdown` value when ready. To prevent errors from affecting CMD and other plugins, wrap async code in a `try/catch/finally` block.

```js
hook.beforeEach((markdown, next) => {
  try {
    // Async task(s)...
  } catch (err) {
    // ...
  } finally {
    next(markdown);
  }
});
```

### afterEach()

Invoked on each page load after new markdown has been transformed to HTML.

```js
hook.afterEach(html => {
  // ...
  return html;
});
```

For asynchronous tasks, the hook function accepts a `next` callback as a second argument. Call this function with the final `html` value when ready. To prevent errors from affecting CMD and other plugins, wrap async code in a `try/catch/finally` block.

```js
hook.afterEach((html, next) => {
  try {
    // Async task(s)...
  } catch (err) {
    // ...
  } finally {
    next(html);
  }
});
```

### doneEach()

Invoked on each page load after new HTML has been appended to the DOM.

```js
hook.doneEach(() => {
  // ...
});
```

### ready()

Invoked one time after rendering the initial page.

```js
hook.ready(() => {
  // ...
});
```

## Tips

- Access CMD methods and properties using `window.CMD`
- Access the current CMD instance using the `vm` argument
- Developers who prefer using a debugger can set the [`catchPluginErrors`](configuration#catchpluginerrors) configuration option to `false` to allow their debugger to pause JavaScript execution on error
- Be sure to test your plugin on all supported platforms and with related configuration options (if applicable) before publishing

## Examples

#### Page Footer

```js
window.$CMD = {
  plugins: [
    function pageFooter(hook, vm) {
      const footer = /* html */ `
        <hr/>
        <footer>
          <span><a href="https://github.com/QingWei-Li">cinwell</a> &copy;2017.</span>
          <span>Proudly published with <a href="https://github.com/CMDjs/CMD" target="_blank">CMD</a>.</span>
        </footer>
      `;

      hook.afterEach(html => {
        return html + footer;
      });
    },
  ],
};
```

### Edit Button (GitHub)

```js
window.$CMD = {
  plugins: [
    function editButton(hook, vm) {
      // The date template pattern
      $CMD.formatUpdated = '{YYYY}/{MM}/{DD} {HH}:{mm}';

      hook.beforeEach(html => {
        const url =
          'https://github.com/CMDjs/CMD/blob/master/docs/' +
          vm.route.file;
        const editHtml = '[📝 EDIT DOCUMENT](' + url + ')\n';

        return (
          editHtml +
          html +
          '\n----\n' +
          'Last modified {CMD-updated}' +
          editHtml
        );
      });
    },
  ],
};
```
