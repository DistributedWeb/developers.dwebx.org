---
title: Syncing With Folders
---

If you want to work on a dDrive using files that are outside of the dBrowser ecosystem, you can also simply use the folder syncing feature. You may need to utilize this feature when working with a system that uses `source-control`, like Git, or when you just want to use an editor outside of dBrowser's [builtin editor](using-the-editor.md).

## With A New dDrive
When [creating a new dDrive](creating-new-ddrives.md), you can select a folder to sync by pressing the `From Folder` button, which will cause the dDrive to be initialized with the contents of the selected folder.

## With An Existing dDrive
To add `folder-sync` to an existing dDrive, click the `Site Info` button and then select `Sync with local folder` under the `tools`. 

## Syncing With The Folder
Once the folder sync is initiated with a new dDrive or an existing dDrive, you'll see an icon on the top right of the URL bar. You can click on that icon to open the folder's `sync controls`. By default, `folder sync` will manually sync the folder.

On the right side of files that are marked for deletion, you'll find a `restore` button. You can click this to copy the file from the dDrive to the local folder that it is being synced with.

## Setting Skip Rules
You can set rules that will allow you to skip syncing specific files. You can achieve this by expanding the `Skip items matching these rules` control. This control is similar to `.gitignore` files and supports using `glob stars` (*). Skipping files is useful for avoiding accidental imports (like your .git or node_modules folders) and for preserving data created by dBrowser (like the index.json manifest).

## Sync It
When you're ready to sync the folder, click the `Sync` button.

## Autosync
If you would like a folder to automatically sync when changes occur, toggle the `Autosync` checkbox. This will sync a folder, while ignoring deselected files. Autosync only stays active as long as dBrowser is active (running). So if you restart dBrowser, you will need to reactivate `Autosync`.

:::caution
If you're generating folders with a `git init` or `npm install`, you should probably disable `autosync`, so that the sync settings for those newly created folders is disabled. When using `autosync`, it's important that you're only syncing the folders that you want to sync publicly within the dDrive itself.
:::