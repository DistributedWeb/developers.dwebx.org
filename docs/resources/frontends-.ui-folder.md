---
title: Frontends (.ui folder)
---

The standard behavior of `dweb://` is to serve whichever file is referenced by the URL. This works fine for simple use-cases but can struggle in several areas, including:

1. Sites which need a consistent theme and template applied across each page.
2. Applications which need to serve interfaces even where a file does not exist (as in the [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) pattern).

## How Frontends Work
A `Frontend` is simply an html file found at `/.ui/ui.html`. This file is used to provide a consistent interface for the site. It is served _rather_ _than_ the target file in the following cases:

* No file exists at the target URL or if the target URL is a folder
* The `Accept` header includes text/html (which indicates dBrowser is asking for a `page`).

Because the `Frontend` effectively overrides all page-serving, it can render whatever the site author wants. A common pattern is to use JavaScript to read whatever file is referenced by `window.location.pathname` and then place that in the UI.

Here is an example:

```markup title="/.ui/ui.html"
<body>
  <main></main>
</body>
async function setup() {
  var main = document.querySelector('main')
  if (location.pathname.endsWith('.html')) {
    let html = await dbrowser.ddrive.readFile(location.pathname).catch(e => `<h1>404 not found</h1>`)
    main.innerHTML = html
  } else if (location.pathname.endsWith('.jpg')) {
    main.innerHTML = `<img src="${location.pathname}">`
  } // etc...
}
setup()
</script>
```

## Mounted Frontends
An advantage of Frontends is that they are stored in a subfolder. This makes it possible for fontends to be their own dDrive sites which are mounted to `/.ui`.

```markup
|12345..af> mount $my_frontend_drive_url /.ui
```

Frontend dDrives can therefore be published and shared by multiple sites or applications.