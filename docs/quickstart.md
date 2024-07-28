# Quick start

It is recommended to install `CMD-cli` globally, which helps initializing and previewing the website locally.

```bash
npm i CMD-cli -g
```

## Initialize

If you want to write the documentation in the `./docs` subdirectory, you can use the `init` command.

```bash
CMD init ./docs
```

## Writing content

After the `init` is complete, you can see the file list in the `./docs` subdirectory.

- `index.html` as the entry file
- `README.md` as the home page
- `.nojekyll` prevents GitHub Pages from ignoring files that begin with an underscore

You can easily update the documentation in `./docs/README.md`, of course you can add [more pages](more-pages.md).

## Preview your site

Run the local server with `CMD serve`. You can preview your site in your browser on `http://localhost:3000`.

```bash
CMD serve docs
```

?> For more use cases of `CMD-cli`, head over to the [CMD-cli documentation](https://github.com/CMDjs/CMD-cli).

## Manual initialization

If you don't like `npm` or have trouble installing the tool, you can manually create `index.html`:

<!-- prettier-ignore -->
```html
<!-- index.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/CMD@5/themes/vue.min.css" />
  </head>
  <body>
    <div id="app"></div>
    <script>
      window.$CMD = {
        //...
      };
    </script>
    <script src="//cdn.jsdelivr.net/npm/CMD@5"></script>
  </body>
</html>
```

### Specifying CMD versions

?> Note that in both of the examples below, CMD URLs will need to be manually updated when a new major version of CMD is released (e.g. `v5.x.x` => `v6.x.x`). Check the CMD website periodically to see if a new major version has been released.

Specifying a major version in the URL (`@5`) will allow your site to receive non-breaking enhancements (i.e. "minor" updates) and bug fixes (i.e. "patch" updates) automatically. This is the recommended way to load CMD resources.

<!-- prettier-ignore -->
```html
<!-- Theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/CMD@5/themes/vue.min.css" />

<!-- CMD -->
<script src="//cdn.jsdelivr.net/npm/CMD@5"></script>
```

If you prefer to lock CMD to a specific version, specify the full version after the `@` symbol in the URL. This is the safest way to ensure your site will look and behave the same way regardless of any changes made to future versions of CMD.

<!-- prettier-ignore -->
```html
<!-- Theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/CMD@5/themes/vue.min.css" />

<!-- CMD -->
<script src="//cdn.jsdelivr.net/npm/CMD@5"></script>
```

### Manually preview your site

If you have Python installed on your system, you can easily use it to run a static server to preview your site.

```python
# Python 2
cd docs && python -m SimpleHTTPServer 3000
```

```python
# Python 3
cd docs && python -m http.server 3000
```

## Loading dialog

If you want, you can show a loading dialog before CMD starts to render your documentation:

```html
<!-- index.html -->

<div id="app">Please wait...</div>
```

You should set the `data-app` attribute if you changed `el`:

```html
<!-- index.html -->

<div data-app id="main">Please wait...</div>

<script>
  window.$CMD = {
    el: '#main',
  };
</script>
```

Compare [el configuration](configuration.md#el).
