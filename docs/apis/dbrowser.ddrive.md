---
title: dbrowser.dDrive
description: This API provides read and write access to ddrives.
---

The dDrive API provides read and write access to ddrives.

You can use the API by instantiating dDrive instances using [.dDrive()] by using the global methods. The global methods can accept paths or URLs. If you pass a path into a global method, the current dDrive will be used as the target. For example, if you were on a dDrive `dweb://foobar/`, the following three would be equivalent:

```javascript
await dbrowser.dDrive.readdir('/')
await dbrowser.dDrive.readdir('dweb://foobar/')
await dbrowser.dDrive.dDrive('dweb://foobar/').readdir('/')
```

A dDrive is always allowed to read and write its own files. Applications must ask permission before writing to other ddrives.

## API

### dbrowser.dDrive.dDrive(url)

Create a dDrive instance. The instance provides most methods in `dbrowser.dDrive` but scoped to the given dDrive's URL. Unlike the unscoped `dbrowser.dDrive` calls, only paths can be provided to the operations.

* **url** String. The URL of the dDrive to access.
* Returns **dDrive**.
  * **url** String. The URL of the dDrive.
  * **version** String. The checked-out version of the instance. Will be undefined if using latest.
  * **checkout**(version): dDrive. Returns a `dDrive` instance at the given version.
  * **watch**(path, onChanged): EventTarget. Emits a 'changed' event when writes occur. Does not emit any change events for mounted drives within the parent dDrive.
  * ...most methods on `dbrowser.dDrive`.

```javascript
var dDrive = dbrowser.dDrive.dDrive('dweb://1234..ef')
await dDrive.readdir('/')
```

### dbrowser.dDrive.createDrive(\[settings\])

Create a new dDrive.

* **settings** Object.
  * **title** String. The title of the dDrive.
  * **description** String. The description of the dDrive.
  * **prompt** Boolean. Should the creation prompt show? If false, permission will still be requested.
* Returns **Promise&lt;dDrive&gt;**.

```javascript
var dDrive = await dbrowser.dDrive.createDrive({
  title: 'My cool website',
  description: 'Demonstrating how to create dDrives'
})
```

### dbrowser.dDrive.forkDrive(url\[, opts\])

Creates a "fork or copy dDrive" prompt. The user will use this to copy the files and settings of a dDrive into a new dDrive, optionally overriding some settings.

* **url** String. The URL of the dDrive to fork.
* **opts** Object.
  * **detached** Boolean. If false, will create an "attached" fork. If true, will create a detached copy. Default false.
  * **title** String. Overrides the title. Only applies if `detached` is true.
  * **description** String. Overrides the description. Only applies if `detached` is true.
  * **prompt** Boolean. If true, shows the "fork" modal. If false, only asks the user for permission. Default true.
* Returns **Promise&lt;dDrive&gt;**.

```javascript
var myFork = await dbrowser.dDrive.forkDrive(existingDriveUrl)
var myCopy = await dbrowser.dDrive.forkDrive(existingDriveUrl, {detached: true})
```

### dbrowser.dDrive.getInfo(url\[, opts\])

Fetch metadata and system information about the dDrive.

* **url** String. The URL of the dDrive to query. (Not required on `dDrive` objects returned by [dbrowser.dDrive.dDrive()]
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Object&gt;**.
  * **key** String. The key of the dDrive.
  * **url** String. The URL of the dDrive.
  * **writable** Boolean. Can the local user modify the dDrive?
  * **version** Number. The latest revision number of the dDrive.
  * **title** String. The title of the dDrive.
  * **description** String. The description of the dDrive.

```javascript
var info = await dbrowser.dDrive.getInfo('dweb://1234..ef')
```

### dbrowser.dDrive.stat(url\[, opts\])

Get metadata about a file.

* **url** String. The url to the file.
* **opts** Object.
  * **lstat** Boolean. If the file is a symlink, give information about the symlink instead of the link target.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Object&gt;**.
  * **isFile()** Function(): Boolean. Is the entry a file?
  * **isDirectory()** Function(): Boolean. Is the entry a directory?
  * **size** Number. The size of the file in bytes.
  * **blocks** Number. The size of the file in blocks in the content hypercore.
  * **mtime** Number. The timestamp of the last modification of the file.
  * **ctime** Number. The timestamp of the creation of the file.
  * **mount** Object. Information about the target mount if the entry is a mount.
    * **key** String. The key of the mount target.
    * **version** Number. The version of the mount target, if specified.
  * **metadata** Object. User metadata attached to the entry.
  * **linkname** String. If a symlink, gives the target path.

```javascript
var stat = await dbrowser.dDrive.stat('dweb://1234..ef/index.json')
```

### dbrowser.dDrive.readFile(url\[, opts\])

Read the contents of a file.

* **url** String. The url to the file.
* **opts** Object \| String. If a String, will act as the 'encoding' option.
  * **encoding** String. Desired output encoding. May be 'binary', 'utf8', 'hex', 'json', or 'base64'. Default 'utf8'.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;String \| Uint8Array&gt;**

```javascript
var fileStr = await dbrowser.dDrive.readFile('dweb://1234..ef/foo.txt')
var fileObj = await dbrowser.dDrive.readFile('dweb://1234..ef/foo.json', 'json')
var imgBuf = await dbrowser.dDrive.readFile('dweb://1234..ef/bar.png', 'binary')
var imgBase64 = await dbrowser.dDrive.readFile('dweb://1234..ef/bar.png', 'base64')
```

### dbrowser.dDrive.readdir(url\[, opts\])

Read the contents of a directory.

* **url** String. The url to the directory.
* **opts** Object.
  * **includeStats** Boolean. Should the output include the 'stats' object for each entry?
  * **recursive** Boolean. Recurse into subfolders?
    * Note: does not recurse into child mounts.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Array&lt;String \| Object&gt;&gt;**
  * If an object, the shape will be `{ name, stat }`

```javascript
var files = await dbrowser.dDrive.readdir('dweb://1234..ef/')
var allFiles = await dbrowser.dDrive.readdir('dweb://1234..ef/', {recursive: true})
var filesWithStats = await dbrowser.dDrive.readdir('dweb://1234..ef/', {includeStats: true})
```

### dbrowser.dDrive.query(query)

Read the contents of a dDrive or drives across multiple specified paths. This function can be used to read a wide range of files while filtering by multiple various attributes. If dDrive were a SQL database, this would be the SELECT function.

* **query** Object.
  * **dDrive** String \| Array&lt;String&gt;. The dDrive(s) to query against.
  * **path** String \| Array&lt;String&gt;. The path(s) to query against. May use globbing patterns ('\*') to specify multiple files.
  * **type** String. Filters results to entries of this type. May be 'file', 'directory', or 'mount'.
  * **mount** String (URL). Filters results to mounts which point to the dDrive specified here.
  * **metadata** Object. Filters results by their metadata against the key-values specified here.
  * **sort** String. Specifies which attribute to sort the results by. May be 'name', 'ctime', or 'mtime'.
  * **reverse** Boolean. If true, the result order will be reversed.
  * **limit** Number. Specifies a maximum number of results to return.
  * **offset** Number. Specifies a starting offset within the results. Used for pagination.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Array&lt;Object&gt;&gt;**
  * **type** String. The type of the entry. Must be 'file', 'directory', or 'mount'.
  * **path** String. The path of the entry relative to the queried dDrive.
  * **url** String. The URL of the entry relative to the queried dDrive.
  * **stat** Object. The entry's Stat object, see stat().
  * **dDrive** String. The URL of the queried dDrive.
  * **mount** String. The URL of the target dDrive if the entry is a mount.
  * **origin** Object.
    * **path** String. The path of the entry relative to its owning dDrive.
    * **dDrive** String. The URL of the entry's owning dDrive.
    * **url** String. The URL of the entry relative to its owning dDrive.

```javascript
var rootFiles = await dbrowser.dDrive.query({
  dDrive: 'dweb://1234..ef',
  path: '/*',
  type: 'file'
})
var rootImgs = await dbrowser.dDrive.query({
  dDrive: 'dweb://1234..ef',
  path: ['/*.png', '/*.jpg', '/*.jpeg']
})
var postFiles = await dbrowser.dDrive.query({
  dDrive: 'dweb://1234..ef',
  path: '/microblog/*',
  sort: 'ctime'
})
var followMounts = await dbrowser.dDrive.query({
  dDrive: 'dweb://1234..ef',
  path: '/follows/*',
  type: 'mount'
})
var bobFollow = await dbrowser.dDrive.query({
  dDrive: 'dweb://1234..ef',
  path: '/follows/*',
  mount: bobsUrl
})
var commentsOnBeaker = await dbrowser.dDrive.query({
  dDrive: 'dweb://1234..ef',
  path: '/comments/*', 
  metadata: {href: 'https://dbrowser.com'}
})
```

### dbrowser.dDrive.diff(url, other\[, prefix, opts\])

List the changes that have occurred between two versions of the dDrive.

Note: this method can only compare drives to other versions of itself. It cannot be used to compare two different drives.

* **url** String. The URL to diff.
* **other** Number\|String\|dDrive. The version ID or dDrive instance to compare against.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Array&lt;Object&gt;&gt;**
  * type String. What operation occurred. One of: 'put', 'del', 'mount', 'unmount'.
  * name String. The path of the modified entry.
  * **value** Object. Information related to the change (e.g. the 'stat' object of a put file).

```javascript
var changes = await dbrowser.dDrive.diff('dweb://1234..ef', 5) // diff latest against revision 5
```

### dbrowser.dDrive.configure(url, settings\[, opts\])

Update the settings and/or manifest (index.json) of the dDrive.

* **url** String. The URL of the dDrive to configure.
* **settings** Object.
  * **title** String. The title of the dDrive.
  * **description** String. The description of the dDrive.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.configure('dweb://1234..ef', {
  title: 'The dDrive title',
  description: 'The dDrive description'
})
```

### dbrowser.dDrive.writeFile(url, data\[, opts\])

Write a file to the dDrive.

* **url** String. The URL of the file to write.
* **data** String\|Uint8Array. The content to write.
* **opts** String\|Object. If a string, acts as the encoding parameter.
  * **encoding** String. The encoding of the data parameter. Must be 'utf8', 'base64', 'hex', 'json', or 'binary'. Defaults to 'utf8' if data is a string and 'binary' if data is an Uint8Array.
  * **metadata** Object. The metadata to write to the file. Even if unspecified
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.writeFile('dweb://1234..ef/foo.txt', 'Foo')
await dbrowser.dDrive.writeFile('dweb://1234..ef/foo.json', {hello: 'world'}, 'json')
await dbrowser.dDrive.writeFile('dweb://1234..ef/foo.png', imgPngBase64, 'base64')
await dbrowser.dDrive.writeFile('dweb://1234..ef/foo.jpg', imgJpgUint8Array, {encoding: 'binary'})
await dbrowser.dDrive.writeFile('dweb://1234..ef/foo.md', '# Markdown Doc', {
  metadata: {title: 'Markdown Doc'}
})
```

### dbrowser.dDrive.mkdir(url\[, opts\])

Create a folder on the dDrive.

* **url** String. The URL of the folder to create.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.mkdir('dweb://1234..ef/sub')
```

### dbrowser.dDrive.symlink(target, url\[, opts\])

Create a symlink on the dDrive. Good luck getting the argument order right the first time!

* **target** String. The URL which the symlink should point to.
* **url** String. Where to place the symlink.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.symlink('dweb://1234..ef/this-file-already-exists.txt', 'dweb://1234..ef/the-symlink.txt')
```

### dbrowser.dDrive.mount(url, mount\[, opts\])

Create a mount on the dDrive to some other dDrive. (Mounts are like symlinks that work across ddrives.) Note: we know, we know, the argument order is the opposite of symlink.

* **url** String. Where to place the mount.
* **mount** String\|Object\|dDrive. The dDrive to mount. If a String or dDrive, acts as the key attribute.
  * **key** String. The key of the dDrive to mount.
  * **version** Number\|String. The version to pin the mount to. If undefined, the mount will point to latest.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.mount('dweb://1234..ef/mount', 'dweb://fedcb..12')
await dbrowser.dDrive.mount('dweb://1234..ef/mount2', {key: 'fedcb..12', version: 10})
```

### dbrowser.dDrive.copy(src, dst\[, opts\])

Copy a file or folder. Works across ddrives.

* **src** String. Where to copy the files from.
* **dst** String. Where to copy the files to.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.copy('dweb://1234..ef/foo.txt', 'dweb://1234..ef/bar.txt')
```

### dbrowser.dDrive.rename(src, dst\[, opts\])

Move a file or folder. Works across ddrives.

* **src** String. Where to move the files from.
* **dst** String. Where to move the files to.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.rename('dweb://1234..af/foo.txt', 'dweb://1234..af/bar.txt')
```

### dbrowser.dDrive.updateMetadata(url, metadata\[, opts\])

Modify the metadata on a file. Merges into the existing metadata of the file.

* **url** String. The URL of the file to modify.
* **metadata** Object. The metadata values to set.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.updateMetadata('dweb://1234..ef/foo.txt', {title: 'Foo'})
```

### dbrowser.dDrive.unlink(url\[, opts\])

Deletes a file on the dDrive.

* **url** String. The URL of the file to delete.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.unlink('dweb://1234..ef/foo.txt')
```

### dbrowser.dDrive.rmdir(url\[, opts\])

Deletes a folder on the dDrive.

* **url** String. The URL of the folder to delete.
* **opts** Object.
  * **recursive** Boolean. Delete the files within the folder if it's not empty. Default false.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.rmdir('dweb://1234..ef/sub')
await dbrowser.dDrive.rmdir('dweb://1234..ef/sub2', {recursive: true})
```

### dbrowser.dDrive.unmount(url\[, opts\])

Remove a mount on the dDrive.

* **url** String. The URL of the mount to delete.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.unmount('dweb://1234..ef/mount')
```

### dbrowser.dDrive.deleteMetadata(url, keys\[, opts\])

Remove metadata keys from the file.

* **url** String. The URL of the file to modify.
* **keys** String\|Array&lt;String&gt;. The key or keys to delete.
* **opts** Object.
  * **timeout** Number (ms). How long to wait for the operation to complete before throwing a timeout error. Defaults to 60000.
* Returns **Promise&lt;Void&gt;**

```javascript
await dbrowser.dDrive.deleteMetadata('dweb://1234..ef/foo.txt', 'title')
await dbrowser.dDrive.deleteMetadata('dweb://1234..ef/bar.txt', ['title', 'href'])
```
