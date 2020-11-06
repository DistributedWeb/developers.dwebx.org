---
title: Goto Files
---

A .goto file is a shortcut file used by dBrowser in many different contexts. All bookmarks for instances, are saved as .goto files in the user's `Home dDrive`.


* **`title`**. The title of the resource being pointed to by the .goto file.
* **`href`**. The URL of the resource being pointed to by the .goto file.

When a .goto file is visited on the `dweb://` protocol, dBrowser will automatically redirect to its `href` value.

:::note
You can create .goto files using dBrowser's [builtin terminal](developers/using-the-terminal.md) using the `mkgoto` command.
