---
title: Editing File Metadata
---

Files in a dDrive can have metadata values.

Metadata is stored as a UTF-8 string. Each value is identified by a key string. You can put as many metadata values as you like on a file, but avoid going _too_ far or you'll slow down reads.

## Via The Editor
1. Pull up the file you want to modify and [open the editor](using-the-editor.md). Then click on the `File Metadata` button in the toolbar.
2. A dropdown will appear with the metadata keys on the left and the values on the right. 
3. Use the empty inputs on the bottom to add a new value. 
4. You can modify existing values or remove them by simply deleting their values.
5. When you are finished, click `Save` to write the changes. 

## Via The Terminal
1. Pull up your dDrive and open the terminal by clicking `Terminal` or using the Terminal's keyboard shortcut.
2. Get all metadata values for a file by entering `meta {filename}`
3. Change a single metadata value by entering `meta {filename} {key} {value}`
_Note:_ If your value has spaces, wrap it in quotes.