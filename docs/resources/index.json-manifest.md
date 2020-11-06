---
title: Index.json Manifest
---

Every dDrive has a manifest file at `/index.json`. This file is used by dBrowser to store various kinds of metadata, including the title and description of a dDrive.

:::warning
Warning: We're currently re-designing the manifest schema to allow for dDrives to be searchable by dWeb-based search engines. The schema below will soon change.
:::

An example manifest:
```json
{
  "title": "My dWeb site",
  "description": "An example dDrive"
}
```

## Manifest schema
### .title
A string indentifying the title of the dDrive

### .description
A string providing a description of the dDrive's contents.

### .forkOf
A string identifying the dWeb key of the dDrive which this dDrive has forked.

### .csp
A string specifying the [Content-Security Policy Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) to use in all dDrive resources.