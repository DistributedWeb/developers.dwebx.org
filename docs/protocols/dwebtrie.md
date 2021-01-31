---
title : dWebTrie
---

### dWebTrie
dWebTrie is an abstraction layer that utilizes [Hash Array Mapped Tries](https://en.wikipedia.org/wiki/hash_array_mapped_trie) in order to provide a general purpose, distributed key/value store over the [dDatabase Protocol](#ddatabase). dWeb is a single writer key/value store which is able to map key/value data to a matching dDatabase index using a builtin rolling hash array mapped trie.

A dWebTrie utilizes the underlying dDatabase's public/private key pair, as well as its dWeb network address, and is represented by this single dDatabase feed. A [dAppDB](https://github.com/distributedweb/dappdb) is a multiwriter distributed key/value store that can be represented by multiple dDatabase feeds and therefore multiple key pairs, although its dWeb network address is derived from the dAppDB's initial dDatabase feed's public key.

dWebTrie was created as a way of storing an entire file system, with possibly thousands or even millions of files, within a dDatabase, where keys are path-like strings (e.g., /make/the/web/great/again) and values are arbitrary binary blobs. Without the dWebTrie abstraction, a distributed file system like [dDrive](#ddrive) simply wasn't possible, since there would have been too many complexities and bottlenecks if a protocol like dDrive would have used dDatabase directly. Optionally, we could have built a trie-structured key/value API within a dDrive implementation, but that would have been far too much overhead. It made more sense to develop a separate trie-structured key/value API, layered on dDatabase, so that many other protocols and applications could use dWebTrie as an off-chain distributed database management system.

#### Database Semantics
-Keys can be any UTF-8 string (e.g. "maga")
-If a key uses path segments (like a folder or file location) (e.g., /this/folder) path segments must be separated by the forward slash character ( /). Repeated slashes (//) are not allowed.
-Leading and trailing (/) are options (e.g., "/hello" and "hello" are equal).
-A key can be both a path segment and a key at the same time (e.g., /a/b/c and /a/b can both be keys at the same time).
-Values can be any binary blob, including an empty blob (zero bit length).
-Acceptable values can be UTF-8 encoded strings, JSON encoded objects, protobuf messages, or a raw uint64 integer (endianness does not matter).
-Length of value (in bits) is the only form of type or metadata stored about the value.
-Deserialization and validation are left to library and application developers.

#### dWebTrie Representation
Below is a pseudo-representation of a dWebTrie database:
```
Key                    Value
= = = = = = = = = = = = = = = = = = = =
Name                Jared Rice Sr.
Location            Dallas, TX
```

While this database is truly logical, since it is actually just a bunch of binary-based blob entries within a dDatabase feed, using dWebTrie's abstract layer, one could easily execute `get(name)`, which would return `Jared Rice Sr.` This is far simpler than working directly with the dDatabase feed, which would require far more steps and much more programming overhead.

#### Database API
A dWebTrie-based database is created by opening an existing dDatabase feed with dWebTrie content or by simply creating a new dDatabase feed.

The following API calls are part of the dWebTrie standard:

##### `put(key, value)`
Inserts a value of an arbitrary byte size under the specified key. Requires read-write access. Returns an error via callback if there is an issue.

##### `get(key)`
Retrieves the value for a given key.

##### `delete(key)`
Retrieves the value for a given key.

##### `list(prefix)`
Returns a flat (non-nested) list of all keys currently in the database under the given prefix.

##### `batch(batch)`
Insert/delete multiple values atomically.

##### `watch(prefix)`
Watch a prefix of the DB (or key) and get notifications when it changes.

#### Overhead and Scaling
Depending on the size of the database, the metadata overhead can vary.

Consider the case of a two-path-segment key, with an entirely saturated trie and a uint32-sized feed and entry index points:

-`trie:` 4 * 2 * 64 bytes = 512 bytes
-`total:` 512 bytes

In a light-case, with few trie entries and single-byte varint feed and entry index pointers:
-`trie:` 2 * 2 * 4 bytes = 16 bytes
=`total:` 16 bytes

For a database with most keys having `N` path segments, the cost of a `get()` scales with the number of entries `M`, as `O(log(M))` with the best case `1` lookup and the worst case `4 * 32 * N - 128 * N` lookups.

The cost of `put()` or `delete()` is proportional to the cost of `get()`. The cost of `list()` is linear `(O(M))` in the number of matching entries, plus the cost of a single `get()`.

The total metadata overhead for a dWebTrie-based database with `M` entries, scales with the `O(M log(M))`.

#### dWebTrie Schemas
A dWebTrie-based dDatabase feed consists of a sequence of protobuf-encoded message of `Entry` or `InflatedEntry` type. A "protocol header" entry should be the first entry in the feed, using "dWebTrie" as the `type`. dWebTrie itself does not specify the content of the optional header extension field, as higher level protocols are left to handle this portion of the protocol.

When data doesn't fit, due to the limited size constraint, for any given value, there is a second `content` feed associated with the dWebTrie key/value feed. The optional `contentFeed` field described in the schema below is used to identify a dWebTrie key/value feed, that needs a second `content` feed.

The sequence of entries includes an incremental index, where the most-recently appended entry in the feed contains metadata pointers that can be followed to efficiently locate any key in the database, without having to perform a linear scan across the database's entire history, or generate an index data structure that's independent of the database itself. Although it is completely up to the implementation on whether they choose to implement their own index or not.

The protobuf message schemas for `Entry` and `InflatedEntry` are:
```
message Entry {
  message InflatedEntry
  required string key = 1;
  optional bytes value = 2;
  optional bool deleted = 3;
  required bytes trie = 4;
  repeated uint64 clock = 5;
  optional uint64 inflate = 6;
  repeated Feed feeds = 7;
  optional bytes contentFeed  = 8;
}
```

The fields that are common to both message types are:
-`key` - UTF-8 key that this node describes. All slashes are removed before storing in message.
-`value` - Byte array of an arbitrary size.
-`deleted` - Boolean that converts entry into a "dead" entry, if `true`. It is recommended that if `false` to keep this value `undefined`, rather than using `false`. This can also be used to store user-defined metadata related to the deletion.
-`trie` - A structured array of pointers to other `Entry` entries in the dDatabase feed. This is used for navigating the tree of keys.
-`inflate` - A reference to the feed index number of the most recent `InflatedEntry` entry in the feed. **NOTE:** This should not be set on a feed's first `InflatedEntry` entry.
-`contentLog` - For applications that require a parallel `content` dDatabase feed. This field is used to store the 43-byte public key for that feed. It is sufficient to write a single `InflatedEntry` message in the dDatabase feed, with feeds containing a single entry (a pointer to the current feed itself) and `contentLog` optionally set to a pointer to a paired content feed. The `Entry` type can be used for all other messages, with `inflate` pointing back to the single `InflatedEntry` message.

#### Key Path Hashing
Every key path has a fixed-size hash representation that is used by the trie. When all path segments are concatenated, they are combined into what is known as a `path hash array`. Similar in many ways to that of a `hash map data structure`, a `path hash array` can have collisions where one key (string) and another key have the same hash, without suffering any issues because of it. This is because each hash is a reference (pointer) to a linked-list `container` of Entries, which can be linearly iterated over until the sought after value is found.

Each element (segment) in a path equates to 32 values, which also equates to a 64-bit hash. The key `/presidents/trump` has two path segments (presidents and trump) which equates to a 65  element path has array, made up of 32 element hashes and a terminator.

The `SipHash-2-4` hash algorithm is used, along with an 8-byte output and a 16-byte key. The corresponding input is the UTF-8 encoded path string segment, excluding slashes or other separators, as well as any terminators. A 16-byte secret key is required where all zeros is used, for this particular use-case. When an 8-byte outputted hash is converted to an array of 2-bit bytes, the ordering of the hash array is handled byte-by-byte, where for each byte, take the two lowest-value bits as `byte index 0` in the hash array and the next two bits as `byte index 1`, etc. When path hashes are combined into an array of greater length, the left-most path element hash will relation to byte indices `0` to `31`. The terminator, `4`, will have the highest index in the hash array (right-most).

**Note:** dWebTrie derived from a project known as HyperDB and the following examples have been lifted from [DEP-0004[(https://datprotocol.com/deps/0004-hyperdb), which was the original specification/proposal for HyperDB. A special thanks to the incredible work of Mathias Buus, Bryan Newbold and Stephen Whitmore.

-For example, consider the key `/tree/willow`. `tree` has the following hash:
`[0xAC, 0xDC, 0x05, 0x6C, 0x63, 0x9D, 0x87, 0xCA]`

-This converts into the following array:
`[0,3,2,2,0,3,1,3,1,1,0,0,0,3,2,1,3,0,2,1,1,3,1,2,3,1,0,2,2,2,0,3]`

-`willow` has a 64-bit hash:
`[0x72, 0x30, 0x34, 0x39, 0x35, 0xA8, 0x21, 0x44]`

-This converts into the following array:
`[2,0,3,1,0,0,3,0,0,1,3,0,1,0,3,0,1,1,3,0,0,2,2,2,1,0,2,0,0,1,0,1]`

-These two combine into the unified byte array with 65 elements:
`[0,3,2,2,0,3,1,3,1,1,0,0,0,3,2,1,3,0,2,1,1,3,1,2,3,1,0,2,2,2,2,0,3,2,0,3,1,0,0,3,0,0,1,3,0,1,2,3,0,1,1,3,0,0,2,2,2,1,0,2,0,0,1,0,1,4]`

In another example, the key `/a/b/c` converts into a 96-byte hash array, i.e., `32 + 32 + 32 + 1`. (1) in this case the terminator bit (4).

##### Incremental Index Trie
Each individual node stores a prefix trie that can be used to lookup other keys and can also be used to list all keys that are related to a given prefix. The prefix trie is stored in the `trie` field within an `Entry` message, as referenced in [dWebTrie Schema(#dwebtrie-schema).

Simply put, the `trie` is equal to the `path hash array`. As mentioned in the schema, each individual element within a `trie` is referred to as a `container`. Each container that isn't empty, is a pointer to the newest `Entries`, where the path is equal (identical) up to that specific prefix location. This is true, because each `trie` has 4 values at each node, which means there can be a pointer to up to 3 other values at a given element in the trie array. (Containers can be empty, if at that particular node, there are zero `branches`).

**NOTE:** Only non-null elements will be transmitted as stored on disk.

The trie data structure is a sparse array of pointers to other `Entry` entries. Each pointer references a specific feed, which indexes to the same value.

###### Looking Up A Key In A Database
The process for key lookups, is to:
-1. Calculate the `path hash array` for the key you are looking for.
-2. Select the most recent ("latest") `Entry` in the feed.
-3. Compare `path hash arrays` for exactly matching paths.
-4. If they match exactly, then compare keys. If keys match, the lookup was successful.
-5. Check whether the `deleted` flag of the `Entry` schema is set. If so, this entry actually represents the deletion of the `Entry`.
-6. If the path segments (concatenated) match, look for a pointer in the last `trie array index` and iterate from step #3 with the new `Entry`.
-7. If the path segments (concatenated) do not match, find the first index in each `path hash array` where both arrays differ and look up the corresponding element in this `Entry's` trie array.
-8. If the element is empty, or doesn't contain a pointer corresponding to your 2-bit value, then the key does not exist in the dWebTrie.
-9. If the trie element is not empty, then follow that pointer to select the next `Entry`. Recursively repeat this process from step #3, which will allow you to descend the trie in a search where the search will either terminate in your search or find that the key is not defined in the dWebTrie.

###### Writing A Key To A Database
In order to write a key to a dWebTrie database, follow the specified process below:
-1. Calculate the `path hash array` for the key to be stored and start with an empty trie array of the same length; where writing to this trie array will start at the current index of `0`.
-2. Select the most-recent ("latest") `Entry` in the feed.
-3. Compare `path hash arrays` for exactly matching paths.
-4. If they match exactly, then compare keys. If keys match, then you are overwriting the current `Entry` and can copy the `remainder` of its trie up to the current trie index. **NOTE:** When I say "overwriting", the previous `Entry` is not removed, for the simple reason that the dDatabase feed below the dWebTrie is immutable and append-only. A more-recent `Entry` is created with its own schema, which could, for example, set the `deleted` flag to true, which would then flag this `Entry` as deleted for future lookups. This works because in immutable datasets, where the management of state is paramount, we can see the entire lifetime of the data, from the moment it was created to the moment it was deleted. It's also important to note that during the lookup process, by selecting the "most-recent" `Entry`  for a key in the database, we are pulling its most-recent state.
-5. If the path segments (concatenated) match, but not the keys, then you are adding a new key to an existing `hash container`. Copy the trie array and extend it to the full length and add a pointer at the last index of the array of the same hash as the `Entry`.
-6. If the path segments (concatenated) do no match, compare both trie arrays and find the differing portion of the array. Copy all of the elements of the trie array, between the `current index` and the `diff index`, into a new trie array. **NOTE:** It doesn't matter whether the located trie array is empty or not.
-7. In this `Entry's` trie array, look up the corresponding element at the `diff index`. If empty, then the most similar `Entry` has been located.
-8. Create a pointer to this node, to the trie at the `diff index`, and the write process is finished. **NOTE:** All remaining trie elements will be empty and can be removed.
-9. If the `diff index` has a pointer, this means it isn't empty. If a pointer exists, follow that pointer to the next `Entry`. Recursively repeat this process from step #3.

**NOTE:** To delete a key/value, follow the same write procedure above and set `deleted` to `true` in the `Entry`. `Deletion nodes` will persist in the database forever.

##### Trie Encoding
Trie data structures are encoded into a variable length byte string as the `trie` field of an `Entry` message. It's important to reiterate that trie data structures are simply sparse, indexed arrays of pointers to entries.

**NOTE:** The following encoding schema and examples were also lifted from `DEP-0004`; only `buckets` in a dWebTrie are referred to as `containers`.

Consider a trie array with `N` `containers` and `M` non-containers `(O <= M <= N)`. In the encoded trie field, there will be `M` concatenated bytestrings in the following form:

`trie index (varint) | container bitfield * (packed in varint) | pointer sets **`

- * - Bitfield encodes which of the 5 values (4 values if the index is not mod 32) at this node of the trie have pointers.
- ** - Pointer sets each reference an entry at (feed index, entry index), where `feed index` is a varint with an extra "more pointers at this value" low bit, encoded as `feed_index << 1 | more_bit` and where `entry index` is simply a varint.

When dealing with a small/sparse dWebTrie, there will be a small number of non-empty containers; put another way, a small/sparse dWebTrie will have a small `M`. For a very large/dense dWebTrie (millions of key/value pairs), there will be many non-empty containers; put another way, `M` will approach `N` and containers may have up to the full 4 pointer sets.

-Consider an entry with a path hash:
`[1,1,0,0,3,1,2,3,3,1,1,1,2,2,1,1,1,0,2,3,3,0,1,2,1,1,2,3,0,0,2,1,0,2,1,0,1,1,0,1,0,1,3,1,0,0,2,3,0,1,3,2,0,3,2,0,1,0,3,2,0,2,1,1,4]`

-and the `trie`:
`[, ]`

In this case, `N = 64` (or you could count as 2, if you ignore trailing empty entries) and `M = 1`.

There will be a single bytestring fragment (chunk):

-`trie index` varint = 1 (second element in trie array).
-`bitfield` (varint 2) = 0b0010
-There is only `pointer set` for value `1` (the second value).
-There is a single pointer in the `pointer set` which is: `feed = 0 << 1 | 0, index = 1` or `(varint 2, varint 1)`.
-Combined, the `trie bytestring` will be:
`[0x01, 0x02, 0x02, 0x02]`

For a more complex example, consider the same `path hash array` with the `trie array`:
`[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,]`

 If we `db.put ('/a/b', '24')`, we expect to see a single `Entry` of the `InflatedEntry` type at `index1` of the underlying dDatabase feed.

For reference, the first 104 bytes in the path match those of  the `/a/b/c` example from earlier, because it shares two of its 3 path segments. Since this is the second entry, the `entry index` is `1`.

**NOTE:** There is a major different between an `entry index` and an `array index`. An `entry index` is a record (new index) added to the dWebTrie's underlying dDatabase, while a specific index within a trie array, is its position from within the array. To make sure that I kill all confusion, consider the below example:

The example of `/a/b` being `put` into the key-value store, if data was in plain English and not binary, would look something like this pseudo-representation, once inside a dDatabase feed:

```
Index                           Value
= = = = = = = = = = = = = = = = = = = = = = = = = = =
1                                 {
                                     type: dwebtrie,
                                     key: Entry,
                                     value: 24,
                                     deleted: null,
                                     trie: [0x01, 0x02, 0x02, 0x02],
                                     ...
                                   {
```

The placement (index) with a dDatabase and the placement of an element in the above trie array, are clearly apples and oranges and I did not want there to be any confusion.

Now, if we `db.put('/a/c', 'hello')` and expect a second `Entry` of `Entry` type, the `path hash array` for this key (index 2) is:
`[1,2,0,1,2,0,2,2,3,0,1,2,1,3,0,3,0,0,2,1,0,2,0,0,2,0,0,3,2,1,1,2,0,1,1,0,1,2,3,2,2,2,0,0,3,1,2,1,3,3,3,3,3,3,0,3,3,2,3,2,3,0,1,0,4]`

The first 32 characters of this path are common with the first `Entry` (they share a common prefix, `/a`). `trie` is defined, but is mostly sparse. The first 32 elements of common prefix match the first `Entry` and then two additional hash elements ([0,1]) happen to match as well. There is not a `diff index`, until `index 34` of the array (zero-indexed). At this entry, there is a reference pointing to the first `Entry`. An additional 29 trailing null entries have been trimmed in the reduced metadata overhead.

Next, we insert a third node with `db.put('/x/y', 'other')`, and get a third `Entry`, where the `path hash array` is (index 3) is:
`[1,1,0,0,3,1,2,3,3,1,1,1,2,2,1,1,1,0,2,3,3,0,1,2,1,1,2,3,0,0,2,1,0,2,1,0,1,1,0,1,0,1,0,3,1,0,0,2,3,0,1,3,2,0,1,3,2,0,1,0,3,2,0,2,1,1,4]`

Consider the lookup process for `db.get('/a/b')`, which we expect to return `24`, as written in the first `Entry`. First, we calculate the path for the key `a/b`, which will be the same as the first `Entry`. Then we take the "latest" (most-recent) Entry, with entry `index 3`. We compare the `path hash arrays`, starting at the first element, and find the `diff index` at `index 1` of the array `(1 == 1, then 1 != 2)`.

We look at `index 1` in the current `Entry's` trie, and find a pointer to the entry at `index 2` of the underlying dDatabase itself, so we fetch the `Entry` and recurse. Comparing `path hash arrays`, we now get all the way to `index 34` of the array before there is a difference (`diff index`). We again look at the trie, find a pointer to the entry at `index 1` of the underlying dDatabase and fetch the first `Entry` and recurse. The path elements of the entry at `index 1` of the feed (dDatabase feed) match exactly and therefore, we have found the entry we are looking for and it has an existing value, so we return the value, which is `24`.

Lastly, consider a lookup for `db.get('/a/z')`. This key does not exist, so we expect dWebTrie to return with `key not found`. We calculate the `hash path array` for this key:
`[1,2,0,1,2,0,2,2,3,0,1,2,1,3,0,3,0,0,2,1,0,2,0,0,2,0,0,36,2,1,1,2,1,2,3,0,1,0,1,1,1,1,1,2,1,1,1,0,1,0,3,3,2,0,3,3,1,1,0,23,1,0,1,1,2,4]`

Similar to the first lookup, we start with the `entry index` 3, and follow the pointer to `entry index` 2. This time, when we compare `path hash arrays`, the first `diff index` is at `array index` 32. There is not a trie entry at this index, which tells us that the key does not exist in the database.

###### Listing A Prefix
Continuing on with the current state of the dDatabase below dWebTrie abstraction layer, we call `db.list('/a')`, to list all keys with the prefix `/a`.

We generate a `path hash array` for the key `/a` without the terminating symbol (4):
`[1,2,0,1,2,0,2,2,3,0,1,2,1,3,0,3,0,0,2,1,0,2,0,0,2,0,0,3,2,1,1,2]`

Using the same process as the `get()` lookup, we find the first `Entry` that entirely matches the prefix, which is `entry index` 2. If we had failed to locate any `Entry` with a complete prefix match, then we would return an empty list of matching keys. If we start with the first prefix-match node, we save that key as a match (unless `deleted` is `true` in the `Entry`). Then, select all trie pointers with a higher index than the length of the prefix and recursively inspect all pointer-to `Entries` and the `Entries` they point to and so on, until a complete list tree is built.

#### The Baseline Foundation For A Distributed File System
For a server-less web like the dWeb to work, it would have to find a way to not only transfer data between peers, but to transfer entire files and therefore, entire file systems between peers, just as servers do when teamed with the HTTP protocol on a server-to-client basis. Doing this on a peer-to-peer basis, as the dWeb has accomplished, not only requires a protocol for exchanging indexed abstract data blobs between peers (dDatabase), but another protocol (dWebTrie) layered above this for creating a file system-like logical and persistent database structure, which utilizes a key-value format, so that file-paths (keys) can be appended to a blob, with file data (values) and efficiently traversed by receiving peers performing specific lookups.

This way, an entire file system can be stored within a single file (a single dDatabase feed) and any peer in the world who is able to locate the feed via dWeb's DHT, can then communicate with the peers within the underlying dDatabase's swarm, request the dDatabase and subsequently download the dDatabase to their machine and easily consume the data via higher-level abstractions (like dWebTrie, or even higher levels like dDrive's actual file system layer).

dWebTrie was designed to store the data that derives from an entire file system within a dDatabase and allow higher-level abstractions like [dDrive](#ddrive) to consume that data and reproduce the entire file system on a remote peer's device. dWebTrie can traverse millions of records within a dDatabase and relate specific path segments via `list()`, without any bottlenecks. This makes dWebTrie the perfect file system database for a distributed file system, considering it is built on top of a distributed, append-only data feed that can be exchanged between peers in real-time. I can't make the rationale for dWebTrie as a file system for distributed file systems any clearer, other than to say that our current dWebTrie implementation scales with `O(N log(N))`.