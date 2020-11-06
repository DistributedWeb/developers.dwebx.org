---
title: Content-Type Negotiation
---
You don't always have to type the extension of a file, if you don't want to. Rather than typing:

```markup
<img src="/trump.png">
```

You can type:

```markup
<img src="/trump">
```

This is helpful if you do not know which extension a site may use. It also allows dWeb sites to utilize links that do not utilize the .html extension, just an .htaccess file would allow for.

For example, you could have a file called `MAGA.html` and could easily access it via `{dwebkey}/MAGA`, rather than `{dwebkey}/MAGA.html`

The following content-types are valid:
* **text/html**. Will match .html and .md.
* **text/css**. Will match .css.
* **image/\***. Will match .png, .jpg, .jpeg, and .gif.
