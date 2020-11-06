---
title: Creating Mounts
---

`Mounting` is a tool which links one dDrive to another as a subfolder. It is probably one of the dWeb's most powerful features. Mounts can be used to make collections, to attach code-module dependencies, and more.

A mounted dDrive will act just like a subfolder. If you are not the creator of the mounted dDrive, you will be unable to write to it, even if the containing dDrive is yours.

## Mounting Via The Editor
1. Pull up your dDrive and [open the editor](using-the-editor.md). 
2. Then expand the files listing by clicking on the folder icon.
3. Right-click in the files listing (but not on the file) and select `New Mount`.
4. You will be prompted to select a dDrive to mount. If your target dDrive is not in the listing, enter the dDrive's URL in the input.
5. You'll then be prompted to enter the mount's name. This is the name of the `folder` which the mount will represent. Choose a name and press `OK`.
6. Your new mount will appear in the editor's files listing.

## Mounting Via The Files Explorer
1. Pull up your dDrive and open the files explorer by clicking `Explore Files`.
2. Right-click in the files listing (but not on a file) and select `New Mount`.
3. You will be prompted to select a dDrive to mount. If your target dDrive is not in the listing, enter the dWeb key in the input. 
4. You'll then be prompted to enter the mount's name. This is the name of the `folder` which the mount will represent. choose a name and press `OK`.
5. Your new mount will appear in the explorer's files listing.

## Mounting Via The Terminal
1. Pull up your dDrive and open the terminal by clicking `Terminal`.
2. You can create a directory by typing `mount` followed by the dDrive URL and then the mount's name.