# Cover

Activate the cover feature by setting `coverpage` to **true**. See [coverpage configuration](configuration.md#coverpage).

## Basic usage

Set `coverpage` to **true**, and create a `_coverpage.md`:

```html
<!-- index.html -->

<script>
  window.$CMD = {
    coverpage: true,
  };
</script>
<script src="//cdn.jsdelivr.net/npm/CMD@5/dist/CMD.min.js"></script>
```

```markdown
<!-- _coverpage.md -->

![logo](_static/media/icon.svg)

# CMD <small>3.5</small>

> A magical documentation site generator.

- Simple and lightweight
- No statically built html files
- Multiple themes

[GitHub](https://github.com/CMDjs/CMD/)
[Get Started](#CMD)
```

## Custom background

The background color is generated randomly by default. You can customize the background color or a background image:

```markdown
<!-- _coverpage.md -->

# CMD <small>3.5</small>

[GitHub](https://github.com/CMDjs/CMD/)
[Get Started](#quick-start)

<!-- background image -->

![](_static/media/bg.png)

<!-- background color -->

![color](#f0f0f0)
```

## Coverpage as homepage

Normally, the coverpage and the homepage appear at the same time. Of course, you can also separate the coverpage by [onlyCover option](configuration.md#onlycover).

## Multiple covers

If your docs site is in more than one language, it may be useful to set multiple covers.

For example, your docs structure is like this

```text
.
└── docs
    ├── README.md
    ├── guide.md
    ├── _coverpage.md
    └── zh-cn
        ├── README.md
        └── guide.md
        └── _coverpage.md
```

Now, you can set

```js
window.$CMD = {
  coverpage: ['/', '/zh-cn/'],
};
```

Or a special file name

```js
window.$CMD = {
  coverpage: {
    '/': 'cover.md',
    '/zh-cn/': 'cover.md',
  },
};
```
