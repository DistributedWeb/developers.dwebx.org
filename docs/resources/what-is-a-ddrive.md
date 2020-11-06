---
title: What Is A dDrive?
---

The dWeb is a peer-to-peer network which is made up of a bunch of dDatabases and dDrives. You could compare it to something like BitTorrent in many ways, considering:

* dDrives can be hosted from any user's device
* All data is authenticated with cryptography
* Peers are announced and found using a DHT
* Peers can help "co-host" a dDrive to contribute bandwidth

However, there are many key differences between something like the dWeb and BitTorrent:

* dDrives are addressed by public-key URLs, e.g. `dweb://8f1d4..af` (dWeb keys)
* Files are signed to prove authenticity rather than only using a checksum in the Merkle tree
* Files in a dDrive can be changed
* The history of changes to a dDrive is stored in a log

If you plan on developing dApps or websites on the dWeb, it's crucial that you understand the mechanics of a dDrive.

## The Guts Of A dDrive
Each dDrive is essentially a networked folder. A dDrive can contain files, folders, symlinks, and mounts.  A dDrive within dBrowser are able to execute web-based content like HTML, JavaScript and CSS.

### dWeb Keys
Every dDrive is identified by a public key, often called just the `key`. This key is encoded as a 64-character hex string.  In the URL, this key acts as an IP address would on the centralized web. The rest of the URL behavs as a typical HTTPS URL, including the path, query and the hash segments.

```text
dweb://5f2gfb733b3927388bb3d33db37edc433e861808f781a2a070ed8a55fb562e1/
```

### Authorization
A device must possess the private key of a dDrive to make changes to it.

:::note
**Curently the private key cannot be shared between devices or users, although we are readying the release of `dSync` which will allow for keys to be synced between devices. This kind of collaboration (called `multi-writer`) requires additions to the protocol which are still in progress.
:::

### Hosting / Seeding
A dDrive can be hosted by multiple devices. With the dWeb, we call this `Seeding`. Devices host by announcing themselves on the `dWeb DHT`, effectively listing their IP as a device which can provide the dDrive's content to other users.

### Caching
When accessing a dDrive's content, dBrowser will automatically cache the content to the local device. This means that subsequent reads will not require network access, unless a change has occurred. The network stack watches for changes and uses the local cache by default if the latest content is available.

### Versioning
dDrives maintain a version counter which is incremented with every write. It's possible to read previous versions and `diff` between them. Unlike `Git`, however, a dDrive has no branching There is one linear history.

The version of a dDrive can be specified in its URL after the key as follows:

```text
dweb://{key}+{version}/{path...}
```

### dDrive Mounts
`Mounts` are like a symlink between dDrives. They are also conceptually similar to Git submodules. They cause a dDrive to behave as a subfolder to another dDrive.  It is possible to mount dDrives with or without a version. If a version is not specified, the latest content will always be provided when accessing the mounted folder.

### File Key-Value Metadata
Every file has a key-value metadata, which can be used to store useful information. For example, a common metadata K/V is the `href` key, which is used to indicate that a file is written in reference to some other resource on the Internet. 

### Querying
The dDrive API includes a [query() method](apis/dbrowser.ddrive.md#dbrowserddrivequeryquery) which can be used to quickly scan multiple folders. It is able to filter against paths, metadata, entry type, and mount destinations. It can also sort the output and apply limit/offset for pagination.