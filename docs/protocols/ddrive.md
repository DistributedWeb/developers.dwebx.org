---
title : dDrive
---

###dDrive
dDrive is a secure, real-time distributed file system abstraction layer on top of dWebTrie, designed for the real-time exchange of file systems on a peer-to-peer basis. When comparing the dWeb to the World Wide Web, one could easily arrive at the conclusion that a dDrive is the equivalent to a server on the World Wide Web for some use-cases, like handling a client's request for a specific file. This is somewhat true, since a dDrive can be discovered on dWeb's DHT and a request can be sent to the peer(s) in its underlying swarm for specific files, or the entire file system for that matter - although the process of doing this on the dWeb is more secure and far more efficient.

**NOTE:** a dDrive cannot replace a server and its ability to act as a backend for both user authentication and remote application execution (currently, at the time of this writing). Web applications within a dDrive can utilize blockchain-based protocol suites like dWeb's [ARISEN](#arisen) to build truly serverless and decentralized applications that do require a backend and/or user authentication.

Just as I noted within my explanation of dWebTrie, dDrive is also completely logical; in other words, it doesn't technically exist. A dDrive is an abstraction for storing files from a file system as dWebTrie-based `Entries` within a dDatabase and reproducing the actual file system and its files from those same `Entries`.

Consider the following pseudo-representation of how files in a dDrive are logically referenced via a dWebTrie and actually stored within a dDatabase:

-Alice creates a dDrive with her website files:
```
index.html
img/logo.png
```

-dDrive creates the following key-value entries into its underlying dWebTrie (put):
```
Key                              Value
= = = = = = = = = = = = = = = = = = = = = = = = = =
/index.html                 <html><head>...
/img/logo.png             8fe1e4... (image file converted to hexadecimal notation)
```

-dWebTrie then creates a dDatabase and the following entries:
```
Index                           Entry
= = = = = = = = = = = = = = = = = = = = = = = = = =
1                                 {
                                     type: dwebtrie,
                                     message: Entry,
                                     key: /index.html,
                                     value: <byte array of file data>
                                     deleted: null,
                                     ...
                                   }

2                                 {
                                     type: dwebtrie,
                                     message: Entry,
                                     key: /img/logo.png,
                                     value: <byte array of file data>,
                                     deleted: null,
                                     ...
                                   }
```

**NOTE:** The first entry in the feed (index 0), as noted in [dWebTrie Schema](#dwebtrie-schema) is a special protocol header entry, which is not shown in the above example in order to keep all pseudo-representations simple.

-dDatabase then encodes both entries in binary notation and stores them in the feed:
```
Index                           Entry
= = = = = = = = = = = = = = = = = = = = = = = = = =
0                                 01011101101010...
1                                 00101001110101110...
2                                 0101101011011001...
```

#### dWeb Network Address
Since a dDrive is simply a dDatabase, it uses the dDatabase's public/private keypair and therefore its dWeb network address.

Remember, a dWeb network address is simply a 32 byte hexadecimal hash and in the case of a dDrive, its a 32 byte hexadecimal hash of its underlying dDatabase's public key.

The following is an example of a dWeb network address:
`40a7f6b6147ae695bcbcff432f684c7bb529lea339c28c1755896cdeb80bd2f9`

#### dDatabase Protocol Headers
You will recall in [dWebTrie Schema](#dwebtrie-schema) that the first entry in its underlying dDatabase, contains a `protocol header`. Protocol headers at `index 0` are used to decipher what the proceeding entries in the dDatabase are related to.

Below are the fields included in a dDatabase's `protocol header`:

| Field No. | Name | Type | Description |
| --- | --- | ---- | --- |
| 1 | Type | Length-prefixed | The type of data in the dDatabase |
| 2 | Content | Length-prefixed | 32-byte public key of content feed (if type is `ddrive`) |

If the `type` is `dwebtrie`, then we know there is a single dDatabase feed and that the overlaying dWebTrie abstraction layer has formatted the data as a key-value store. If the `type` is `ddrive`, then we know there is a separate `content` feed (as explained in the next section [Content and Metadata Feeds](#content-and-metadata-feeds) ), whose 32-byte public key can be found in the `Content` field of the feed's header.

The `Content` field allows two or more feeds to be coupled together, while the overall `protocol header` is used to distinguish the data set type within an underlying dDatabase. This simple header, as you will see later in this paper, is giving way to the creation of many decentralized technologies, outside of just a decentralized web, like the dWeb.

That brings me to dDrive's coupling of dDatabase feeds.

#### Content and Metadata Feeds
Contrary to the pseudo-representation that was shown in the previous section, a dDrive doesn't use a single dDatabase, it uses two coupled feeds to represent files and folders. One feed is for metadata and the other represents files and folders. Put another way, one feed is for file metadata and the other feed is for the data related to files. The `metadata` dDatabase feed contains the names, sizes and other metadata for each file, and is typically sparse, even when the overlaying dDrive contains a large amount of files and folders. The `content` dDatabase feed contains the actual file contents and is of the plain "ddatabase" type, instead of the `dwebtrie` or overlaying `ddrive` type.

When a dDrive is created, dWebTrie is initiated and creates two underlying dDatabase feeds. In the protocol header of the `metadata` feed, the `Type` field is sent to `ddrive` and the `Content` field is set to the 32-byte public key of the `content` feed.

When a file is added to a dDrive, a dWebTrie `Inflated Entry` is created for the file metadata in the `metadata` feed and the actual file data is stored as an arbitrary data blob within the `content` feed. If you recall in the [dWebTrie Schema](#dwebtrie-schema), an `Inflated Entry` contains the `contentLog` field, to point to the location in the `content` dDatabase feed for a given dDrive, where the file contents, related to the `metadata` `Inflated Entry`, are located. Put another way, each `metadata` feed array points to where in the `content` feed the file data is located, so you only need to fetch the contents of files you are interested in.

Here is an updated pseudo-representation of a dDrive with a simple `index.html` file, so you can update your mental model of how a dDrive is actually constructed:

-A blank dDrive is created, where dWebTrie initiates the creation of a blank dDatabase for the `content` feed, and a blank dDatabase feed for the `metadata` feed.

-The following `protocol header` is added as the first entry in the `metadata` feed:
```
Index                            Entry
= = = = = = = = = = = = = = = = = = = = = = = = = = =
0                                  {
                                     Type: ddrive,
                                      Content: <public-key-of-content-dDatabase>,
                                    }
```

-A file called `index.html` is added to the dDrive and the following entries are added to the `content` and `metadata` feeds:
```
Metadata Feed:
--
Index                            Entry
= = = = = = = = = = = = = = = = = = = = = = = = = = =
0                                  { // Protocol Header
                                      Type: ddrive,
                                      Content: <public-key-of-content-database>
                                    }
-- newly added entry:
1                                  { // Metadata Inflated Entry
                                      key: /index.html,
                                      value: metadata-for-file,
                                      deleted: null,
                                      trie: <pointers to other files or folders where the path is created> (none in this case),
                                      contentLog: <index number in content feed, where file data is> (1)
                                    }
```
```
Content Feed
--
Index                            Entry
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
0                                  { // Protocol header
                                      Type: ddatabase
                                    }

1                                  010110... (Binary blob of index.html file content)
```

-In actuality, both dDatabases are truly in binary when it's all said and done:

```
Content Feed:
--
Index                             Entry
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
0                                   010110111...
1                                   1101110001...
```
```
Metadata Feed:
--
Index                             Entry
= = = = = = = = = = = = = = = = = = = = = = = = = = = =
0                                   01011101110...
1                                   10110111011...
```

There are many reasons the `content` feed doesn't use the dWebTrie abstraction layer/format for appending data, one of which is the limited value constraint of the `value` field in a dWebTrie's `InflatedEntry`. Other reasons include the fact that there is no need for pointers via the `trie array`, since related path segments are sorted via the `metadata` feed where a `trie array`, via each `Inflated Entry's` `trie` field, can be found.

It's actually quite simple to build a tree of files and folders via the `metadata` feed by relating `path segments`. After a tree is calculated, thanks to the location of the `content` feed in the protocol header and the `contentLog` field in each `Inflated Entry`, the contents of a file can easily be located.

#### Metadata Value Field Schema
In the previous pseudo-representation of how a dDrive is created, you will notice that in the `Inflated Entry`, within the `Metadata` feed of the `index.html` file, the `value` field is where the metadata is located. This field carries its own schema, as follows:

| Field No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | Mode | uint32 (varint) | Unix permissions (setuid or setgid) |
| 2 | UID | uint32 (varint) | User ID (Unix) |
| 3 | GID | uint32 (varint) | Group ID (Unix) |
| 4 | Size | uint64 (varint) | File size in bytes |
| 5 | Blocks | uint64 (varint) | The number of object blocks |
| 6 | Offset | uint64 (varint) | Similar to Node's FS module |
| 7 | ByteOffset | uint64 (varint) | Similar to Node's FS module |
| 8 | MTIME | uint64 (varint) | Modified time |
| 9 | CTIME | uint64 (varint) | Created time |

This is packaged within a `protocol Buffers` encoded message and used as the value `field` within a dWebTrie-based `InflatedEntry` message, which is also encoded with `Protocol Buffers` and appended as an entry in the `metadata' feed.

#### Version Controlled
As mentioned in [dDatabase](#ddatabase), files transferred over `HTTP` are not versioned, which means the historical state of a file or files is not available. `HTTP` is used to transfer a file's or files' current state from the server it/they exist on, to the client they're being requested from. When it comes to the `DWEB` protocol and its underlying protocols, the underlying data is [immutable](#the-case-for-immutability), which means that any rendition of the underlying data's state can be requested and constructed. In the case of a dDrive, each time a file is added to a dDrive or the metadata/content of a file is modified, entries are made to its underlying dDatabase feeds, where each entry represents an instance of the dDrive's state.

Each modification to a dDrive represents a new version of the dDrive. String names can also be assigned to dDrive versions and these can be stored within the drive itself, creating a straightforward way to switch between semantically meaningful versions. Simply put, a dDrive is built on top of append-only logs where old versions of files are preserved by default. You can get a read-only snapshot of a specific version of a dDrive at any time. Additionally, as mentioned above, you can tag versions with string names, making them more parseable.

Tags are stored inside the dDrive's `hidden trie`, meaning they are not enumerable using dDrive's [standard filesystem methods](#standard-filesystem-methods). They will replicate with all other data in the drive, though.

For more information on version control method's, see dDrive's JavaScript implementation and its official documentation [here](https://github.com/distributedweb/ddrive#version-control).

#### Sparse Downloading
Now that it has been explained how a dDrive's file system is stored and versioned within two coupled dDatabase feeds, it becomes easier to understand how one peer can download a specific version of specific files from a specific dDrive, otherwise referred to as `Sparse Downloading`. Simply put, since all of the layers that overlay a dDatabase feed utilize its underlying [dDatabase Protocol](#ddatabase-protocol) for the request and fulfillment of data between peers, any of these abstraction layers can make a request for a specific index range, for whatever that equates to at a specific abstraction layer. For example, when a specific file or folder is requested at the dDrive layer, it's common for the entire `metadata` feed to be requested from the dDrive's swarm. Once received, the file or folder path is passed to the dWebTrie layer, which searches the `metadata` feed for the matching path. If the current version of the file or folder is wanted, rather than older versions, the `most-recent` `Inflated Entry` that matches the path is chosen. This `Inflated Entry` should contain a `contentLog` pointed to the `index` where the file's data is stored in the `content` feed. From there, a `request` message can be sent to the dDrive's swarm, using an underlying dDatabase Protocol-based duplex stream, where the specific `index` from the `contentLog` can be requested.

For example, if the link `dweb://<dweb-key>/index.html` is requested via a ` DWEB`-ready client, the entire dDrive in this instance is not downloaded; as a matter of fact, only the `index.html` file and any files linked within it are downloaded by the requesting peer.

This is how the process would take place:
-1. A remote peer requests `dweb://<dweb-key>/index.html` via a DWEB-ready client.
-2. The client looks up the dWeb key via dWeb's DHT and a list of peers who are announcing this dDrive (its swarm) are returned.
-3. The client chooses a peer from the returned list and requests to open a dDatabase protocol-based duplex channel on channel 1 with the peer (or even multiple peers).
-4. The client asks for only the `metadata` feed, once the peers accept the connection request, by sending a `request` message on the channel, requesting the entire `metadata` feed's index range.
-5. The peer(s) sends a series of `data` messages back over the duplex channel containing the `metadata` feed.
-6. The client passes the `/index.html` path segment to the dWebTrie abstraction layer, so it can perform a lookup in the `metadata` feed.
 -6. An `InflatedEntry` is found, with a `contentLog` field within the entry, pointing to `index 6` of the `content` feed.
-8. The client locates the `content` feed's public key in the `protocol header` of the `metadata` feed and opens another duplex channel on channel 2, with the `content` feed's public key, with the same peers from step #3 and sends a `request` message for `index 6`.
-9. The `content` feed is sent in a `data` message to the client, containing **ONLY** `index 6`.

It should be noted, that at step #8, one could request the entire `content` feed, which would eliminate future remote requests, as long as both feeds are replicated live.

#### Drive Nesting
dDrive has a built-in "mounting" system, which allows one or more dDrive(s) to be mounted or "nested" within a parent dDrive. This allows Bob, to nest Alice's dDrive full of her published photos within his dDrive full of published photos. What is great about this, is that this enables true peer-to-peer collaboration, since when Alice adds a photo to her dDrive of published photos, they are automatically replicated within Bob's dDrive, since Alice's drive is nested within Bob's.

**NOTE:** It's important to note that Alice's dDrive is a totally separate dDrive from Bob's and can be accessed directly. Bob is simply a peer (seeder) of Alice's dDrive and mounts it within one his own dDrives, so that when a peer downloads Bob's dDrive, they also receive the most recent version of Alice's. In truth, this means that a portion of Bob's dDrive is downloaded from his dDrive's swarm and another portion from the swarm of Alice's dDrive.

For more information on dDrive mounting, please see dDrive's reference JavaScript implementation and its [mounting docs](https://github.com/distributedweb/ddrive#ddrive-mounting).

#### Standard Filesystem Methods
What one will find is that a dDrive implementation, like our JavaScript implementation, truly mirrors the standard filesystem methods of the Node.js `fs` module. Below is a quick explanation of those methods.

##### `createReadStream`
Read a file out of the dDrive, as a stream. Similar to `fs.createReadStream`.

##### `readFile`
Read an entire file into memory. Similar to `fs.readFile`.

##### `createWriteStream`
Write a file as a stream. Similar to `fs.createWriteStream`.

##### `writeFile`
Write a file from a single buffer. Similar to `fs.writeFile`.

##### `unlink`
Unlinks (deletes) a file. Similar to `fs.unlink`.

##### `mkdir`
Creates a directory. Similar to `fs.mkdir`.

##### `rmdir`
Deletes an empty directory. Similar to `fs.rmdir`.

##### `readdir`
Lists a directory. Similar to `fs.readdir`.

##### `stat`
Stat an entry. Similar to `fs.stat`.

##### `lstat`
Stat an entry but do not follow symlinks. Similar to `fs.lstat`.

##### `info`
Get mount information about an entry.

##### `access`
Similar to `fs.access`.

##### `open`
Open a file and get a file descriptor back. Similar to `fs.open`.

##### `read`
Read from a file descriptor into a buffer. Similar to `fs.read`.

##### `write`
Write from a buffer into a file descriptor. Similar to `fs.write`.

##### `symlink`
Create a symlink from a link name to a target name.

##### `mount`
Mounts another dDrive at the specified mountpoint. A mount can be a specific version of a dDrive.

##### `unmount`
Unmount a previously-mounted dDrive.

#####  `createMountStream`
Create a stream containing content/metadata feeds for all mounted dDrives.

##### `getAllMounts`
Returns a `Map` of the content/metadata feeds for all mounted dDrives, keyed by their mountpoints.

##### `close`
Close a file. Similar to `fs.close`.

##### `version`
Returns the current version of the drive.

##### `key`
Returns public key indentifying the drive.

##### `discoveryKey`
Returns a key derived from the public key (the dWeb network address).

##### `writable`
Returns a boolean indicating whether the drive is writable.

##### `peers`
Returns a list of peers currently replicating with a dDrive (via dWeb's DHT).

##### `checkout`
Checkout a read-only copy of the dDrive at an old version.

##### `createTag`
Create a tag that maps to a given version. If a version is not provided, the current version will be used.

##### `getTaggedVersion`
Returns a version, corresponding to a tag.

##### `deleteTag`
Delete a tag. If the tag doesn't exist, this will be a no-op.

##### `getAllTags`
Return a `Map` of all tags.

##### `download`
Download all files, in path of current version. If no path is specified, this will download all files.

For more detailed documentation, please see dDrive's JavaScript implementation [here](https://github.com/distributedweb/dDrive).

#### Live Replication
A dDrive can be live-replicated, by keeping two duplex streams open with online peer(s) of a dDrive's swarm, while sending a constant `request` message to said peers, for the entire index range of both the `content` and `metadata` feeds. This is easily done via the dDrive layer by simply using the [`replicate`](https://github.com/distributedweb/ddrive#replication) method in a dDrive implementation.

Replication can also take place on a per-file or per-path basis, rather than downloading updates for an entire dDrive's underlying files/paths within its filesystem.

##### dDrive Auditing
Since a dDrive is technically two dDatabase feeds, the data is easily  audited and validated as to having derived from the holder of the public-private keypair, and the dweb network address that mathematically derived from the public key.

Also, since a dWebTrie and a dDatabase are both single-writer, it's an easily proven fact that only the creator of a dDrive can write to it, preventing outside forces from, for example, manipulating a website's content. It is also easily provable that data within a dDrive has not been altered, since it's an append-only log. For more information on how data within a dDatabase is validated, please read about dDatabase's [Merkle Trees & FIO Trees](#merkle-tree-and-fio-trees).