---
title: dbrowser.markdown
description: This API renders Markdown into HTML
---

## dbrowser.markdown.toHTML(md)

Renders Markdown into HTML.

* **md** String. The Markdown to render.
* Returns **String**.

```javascript
var html = dbrowser.markdown.toHTML('# hello!')
console.log(html) // => '<h1>Hello!</h1>'
```
