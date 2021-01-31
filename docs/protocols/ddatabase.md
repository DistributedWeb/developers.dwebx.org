---
title : dDatabase
---

### dDatabase
A dDatabase is a distributed append-only log, also referred to as a distributed and immutable data feed, which can be exchanged between peers, using the [dDatabase Protocol](#ddatabaseprotocol) and validated via functions available in a dDatabase implementation.

At a very basic level, the dWeb is made up of dDatabase feeds, but it's important to note that a dWeb network address doesn't have to represent just a dataset, it can represent an entity like a peer or a device. Although, as the dWeb stands today, most of what you see distributed across it are dDatabases.

Below is a pseudo-representation of what a dDatabase would look like:
```
Index                 Entry
= = = = = = = = = = = = = = = = = = =
0                       Hello
1                       World
```

As you will see later in this paper with the [dDrive](#ddrive) Protocol, a distributed file system can be created using a dDatabase, by converting the content and metadata of a file system's files into a particular encoding format, such as binary, and storing in a dDatabase entry like so:
```
Index                 Entry
0                       {content:010110011110...}, {metadata:1110100101...}
1                       {content:11101001111001...}, metadata:0100110000...}
```

In other words, a dDatabase can easily be used to distribute an entire file system between peers, or any dataset for that matter. This section is intended to breakdown how dDatabases work, how data is determined to have the utmost integrity, and how data is exchanged between peers using the dDatabase Protocol.

A dDatabase, represented by a generated dWeb network address, can easily be announced and discovered via dWeb's DHT, where other peers can download the dDatabase from peers in the dDatabase's swarm who have download the data and subsequently announced their joining of the swarm itself. Put another way, a dDrive that contains a website can announce its dWeb network address on the dWeb DHT and peers can join the dDrive's swarm and thereby increase the number of peers the website can be downloaded (replicated) from. This is just an example, as a dDatabase can contain an endless amount of dataset types, such as an encrypted conversation or an encrypted voice call.

#### Distributed, Immutable Data Feed
dDatabase is a secure, distributed and append-only (immutable) feed that is designed for distributing large datasets and streams of real time data between peers of the dWeb.

#### Value Encoding
The value of an append entry to a dDatabase can be encoded into the following formats:

-`binary` (Default)
-`json`
-`utf-8`

#### Data Integrity
It is important that those who download a dDatabase can verify that it actually derived from its proclaimed author. This is made possible thanks to dDatabase's use of public key cryptography, which a dDatabase's dWeb network address is derived from, alongside Merkle trees and FIO trees, in order to verify a dDatabase's root hash signature(s). This insures that the data itself derived from the author of the dDatabase and the original announcer of the dWeb network address.

##### Merkle Trees and FIO Trees
A dDatabase uses a custom encoding method when laying out dDatabase-based update logs into a Merkle tree. This particular encoding method positions hashes into a scheme known as "binary in-order interval numbering," or just "bin" numbering for short. This is a deterministic method of positioning leaf nodes in a Merkle Tree.

A Merkle Tree with seven leaf nodes will always be laid out like this:
```
0L
      1L
2L
            3L
4L
      5L
6L
```

From a computer science perspective, dDatabases are binary append-only streams, the contents of which are cryptographically hashed and signed. Therefore, any dDatabase can be verified by anyone with access to the public key of the creator. Over the HTTP protocol, datasets are shared every day, although there is no built-in support for version control or the content-addressing of specific data. dDatabase is the solution to this, allowing multiple un-trusted devices to act as a single virtual host. For the dWeb to work, it requires a data structure that authenticates the content's integrity and one that keeps a historical log of the revisions - and dDatabase feeds certainly provide that.

dDatabases are identified internally by signed Merkle trees, are identified publicly over the dWeb by a public key, and are discovered over dWeb's DHT by a dWeb network address, which in turn derives from a dDatabase's public key. A dDatabase's public key is used to verify the signature that relates to the received data. A dDatabase's internal Merkle tree is output as a "Flat In-Order Tree" or "FIO Tree."

FIO trees, per PP5P RFC 7574, are defined as "bin numbers." These FIO trees allow for numerical-based identification of each leaf node within a binary-based Merkle tree and therefore create a simplistic way of representing a binary tree as a list. These properties of FIO trees are used in the simplification of "wire protocols" that of which utilize Merkle tree structures within distributed applications.

Below is an example FIO tree, that is sized at 4 blocks of data:
```
0L
1P
2L
3P
4L
5P
6L
```

In the above FIO tree example, even numbers (0, 2, 4, 6) represent leaf nodes on the tree and odd numbers represent parent-nodes that each contain two children.

Using binary notation, we can count the total number of "trailing 1s" to calculate the depth of the tree's nodes. For example, the following numbers below are converted to binary:
```
5 = 101
3 = 011
4 = 100
```

The number 5 has one trailing 1, the number 3 has two trailing 1s and the number 4 has zero trailing 1s. In the FIO example, 1 is the parent node of (0, 2), 5 is the parent node of (4, 6) and 3 is the parent node of (1, 5). The FIO tree would only have a single root if the leaf node count is a power of 2, otherwise a FIO tree will always have more than one root.

Below is another FIO tree (pseudo-representation) with a total of 6 leaf nodes:
```
0
1
2
3
4
5
6
7
8
9
10
```

In the above example, the roots are 3 and 9.

A Merkle tree, named after cryptographer and mathematician Ralph Merkle, is best described as a tree of binary-based data, where every "leaf" (an even-numbered tree node that has no children) is a hash of a data block and every "parent" (an odd-numbered tree node that has two children) is the hash of both of its children. dDatabases are feeds represented by Merkle trees that are ultimately encoded with "bin numbers."

For example, a dDatabase of 4 values would always map to the 0, 2, 4 and 6 leaf nodes. Below is a pseudo-representation:
```
fragment0 -> 0
fragment1 -> 2
fragment2 -> 4
fragment3 -> 6
```

When converting to FIO tree-style notation, a Merkle tree spanning these data blocks looks like:
```
0 = hash(0 + 2)
2 = hash(fragment1)
3 = hash(1 + 5)
4 = hash(fragment2)
5 = hash(4 + 6)
6 = hash(fragment3)
```

The even and odd nodes store different types of information:
-`Even Numbers` - List of data hashes [f0, f1, f2, ...]
-`Odd Numbers` - List of Merkle hashes (hashes of child nodes) [h0, h1, h2, ...]

The root node within a Merkle tree hashes the entire dataset. In the example of 4 fragments, node #3 hashes the entire dataset and node #3 is used to verify the rest of the dataset. Although the root node will change every time data is added to a dDatabase.

```
0
1
2
3 (root node)
4
5
6
7
8
9 (root node)
10
```

The Merkle tree's nodes are calculated as follows:
```
0 = hash(fragment0)
1 = hash(0 + 2)
2 = hash(fragment1)
3 = hash(1 + 5)
4 = hash(fragment2)
5 = hash(4 + 6)
6 = hash(fragment6)
7 = hash (6 + 8)
8 = hash(fragment4)
9 = hash(8 + 10)
10 = hash(fragment5)
```

When there are multiple root hashes, it is convenient to capture the entire state of a dDatabase as a `fixed-size hash` by hashing all of the root hashes into one single hash, where in the example above:

`root = hash(9 + 3)`
or
`tr = h(r1 + r2)`
(tr = top root; hash = hash function; r1 = root hash 1; r2 = root hash 2)

##### Root Hash Signatures
Merkle trees are used by dDatabases to create a way of indentifying the content of a dataset through hashes. The concept is simple, if the underlying content of a dDatabases changes, the hash changes. For example, a dDatabase acts as a list that calls the `append()` mutation when an entry is added to the database feed, thereby adding a new leaf to the tree, which ultimately generates a new root hash. When a dDatabase is created, a public/private keypair is generated. The public key is used as a public identifier for data validation, whereas the private key is used to sign the root hash every time a new one is generated. This digital signature is always distributed with the root hash to verify its integrity.

##### Data Validation
Data which is received that belongs to a dDatabase goes through the following process:
-1. The root hash's signature is verified.
-2. The received data is hashed with `ancestor hashes` in order to reproduce the `root hash`.
-3. If the root hash that was calculated is an exact match of the original root hash that was received, the data has been verified.

In an example of a dDatabase containing 4 values, our tree of hashes would look like this:
```
0
1
2
3 (root hash)
4
5
6
```

If we want to verify the data for 0 (fragment0), we first read (2), which is the sibling hash, then (5), which is the uncle hash and then (3), which is the signed root hash.

```
0 = hash(fragment0)
2 = (hash received)
1 = hash(0 + 2)
5 = (hash received)
3 = hash(1 + 5)
```

If what we calculate for 3 is equal to the signed root hash we received for 3, then fragment0 is valid.

It's important to note that all new signatures very the entire dDatabase since the signature spans all data in the Merkle tree. A dDatabase is considered corrupt if a signed mutation results in a conflict against previously verified trees. When a dDatabase is considered corrupt, the dDatabase protocol is designed to stop distribution.

##### Cryptography Specification
-The hash function uses BLAKE 2B-256 encryption, while signatures are ed25519 with the SHA-512 hash function.
-Hash function inputs are prefixed with different "constants" based on the type of data being hashed. The constants include:
--0x00 -Leaf
--0x01 -Parent
--0x02 -Root

This protects against a "second preimage attack."
-Hashes, a lot of the time, will include the sizes and indexes of their content so that the structure of a tree can be described along with the tree's data.

#### dDatabase Data Structure
Data within a dDatabase is stored as `blocks`, which are identified by an `index`. Each `block` is signed by its creator, so that an entire dDatabase feed can be audited for whether or not all currently stored data matches the hashes in the Merkle tree. Put another away, all data blocks must match the hashes contained within the dDatabase Merkle tree, explained previously.

This data structure ensures that peers can download a specific block range, rather than the entire block base of the dDatabase itself. The `index` is an auto-incrementing number that is zero-based.

A pseudo-representation of a dDatabase feed uses binary encoding:
```
Index          Entry
==================================
0                0111010010011...
1                1011000110000...
```

As data is appended to the feed, a new index is created. Those who are replicating the feed would receive the new index in real-time.

#### dDatabase Protocol
Before diving into the dDatabase Protocol, it is important to reiterate that a dDatabase is an append-only data feed, where the data within a data feed is an abstract "blob" of data.

**dDatabase feeds can:**
- Be distributed partially between peers.
- Be distributed fully between peers.
- Be distributed to/received by multiple peers at once.

The dDatabase Protocol is a process by which two or more peers exchange a dDatabase over binary duplex streams. Remote peers are able to identify with seeders of a dDatabase whether they are looking for specific portions of a dDatabase (partial) or the entire dDatabase.

Using various message types, peers are able to ask a specific peer, for a specific portion of the feed, whereas the feed distributor(s) can signal whether they have that data and can subsequently fulfill the data request. The protocol uses a sender/handler lifecycle for message exchange and message handling.

Binary duplex streams can be encrypted, use a public/private keypair for stream authentication, and utilizes a NOISE-based stream handshake by default.

This section will cover all of these aspects, including dDatabase's handshake phase and message exchange phase. 

##### Handshake Phase
A dDatabase protocol duplex stream can use an optional NOISE-based handshake. For the handshake, NOISE uses the `XX` pattern. Each NOISE message is sent with varint framing. After the handshake is finalized between peers, a message exchange phase can begin.

The handshake phase allows two or more peers to authenticate each other and to securely negotiate an encryption and MAC algorithm, along with cryptographic keys to be used to protect the data sent between them. After the initial handshake transport, encryption is enabled to ensure a stream is private.

As an added plus, each NOISE session is unique and is identified by a unique `handshake hash` in order to enable channel binding. 

##### Message Phase
The NOISE-based message exchange phase uses a basic varint length prefixed format to send messages over the wire.

All messages contain a header indicating the type and the `feedID` of the dDatabase feed, and a protobuf-encoded payload:

`message = header + payload`

A header is a varint that looks like this:
`header = feedID << 4 | numeric-type`

The `feedID` is just an incrementing number for every feed shared and the `numeric-type` corresponds to which protobuf schema should be used to decode the payload.

The message is then wrapped in another varint containing the length of the message: 
`wire = length(message) + message + length(message2) + message2 + ...`

A good example of how the protocol functions  can be found in [Data Replication](#data-replication) and the messaging phase is expanded upon in [DWEB](#dweb).

###### Message Types
There are several message types that can be sent during the message phase, which can be used for introduction, handshakes, data Q&As, data requests and data fulfillment. Each one of those message types are explained in-depth below:

- `feed` (0) - The `feed` type acts as an introduction, where one peer lets another peer know that they'd like to speak about a particular dDatabase feed (a particular dWeb network address).
- `handshake` (1) - Allows two peers to negotiate connection parameters 
- `info` (2) - Indicate to another peer whether you're starting or stopping, uploading or downloading.
- `have` (3) - Indicate to a peer, in response to their `want` message, that you have the data they're requesting.
- `unhave` (4) - Indicate to another peer that you no longer have the data that you said you had in a previous `have` message.
- `want` (5) - Indicate to a peer, that you want a specific set of data (specific dDatabases indexes).
- `unwant` (6) - Inform a peer that you no longer want the data you requested in a previous `want` message.
- `request` (7) - Ask a peer for the data they said they had in a `have` message they previously sent. Requests can only be sent for one dDatabase index at a time. 
- `data` (8) - Send the data that a peer is requesting via a `request` message.

###### Protocol Buffers
Messages contain specific fields, depending on the message type, all of which are serialized using Protocol Buffers. To learn more about dDatabase Protocol's Protocol Buffers schema, you can read more about the specific fields, message structures, and serialization schemas for each message type [DWEB](#dweb) or you can simply review the actual `schema.proto` configuration [here](https://github.com/distributedweb/ddatabase-protocol/blob/partriot1/schema.proto).

#### Exchanging Data 
The easiest way to describe how dDatabase replication works between two peers, is by using a pseudo-code example. Consider the following dDatabase with 6 entries:

```
Index          Entry
====================
0                 We're
1                 Making
2                 The
3                 Web
4                 Great
5                 Again
```

The dDatabase's Merkle tree would look something like:
```
0L                  - hash(We're)
       1L           - hash(0L+2L)
2L                  - hash(Making)
            3L      - hash(1L+5L)
4L                  - hash(The)
       5L           - hash(4L+6L)
6L                  - hash(Web)
8L                  - hash(Great)
       9L           - hash(8L+10L)
10L                - hash(Again)
```

If you recall in previous sections, the root hashes of the Merkle tree, which are `3L` and `9L` are used to create a `combined root hash`. The has must also be signed by the dDatabase creator's private key. The Merkle tree above is a tree of hashes that derive from the dDatabase entries (0-5). This is important in the exchange process described subsequently, since the Merkle tree allows the receiving peer to verify the integrity of the data they're receiving.

Before a dDatabase can be exchange publicly with other peers, it must first be announced on dWeb's DHT. This means a dDatabase's public key must be hashed into a dWeb network address beforehand. In the example below, Bob is able to publish the dDatabase described in this section, so that Alice can download it:

- 1. Bob announces the dDatabase's dWeb network address on dWeb's DHT.
- 2. Bob broadcasts the dDatabase over his local connection and port 5000.
- 3. Alice finds out about Bob's dDatabase, as well as its address and performs a lookup on dWeb's DHT for the address.
- 4. The lookup returns Bob's IP address and port 5000.
- 5. Alice opens up a TCP connection with Bob and sends a `feed` message.
- 6. Alice then sends a `handshake` message, to which Bob sends a `handshake` message back to confirm the connection parameters (encryption, etc).
- 7. Alice sends a `want` message indicating that she wants the entire feed.
- 8. Bob sends a `have` message back, indicating that he has 0L through 10L.
- 9. Alice sends a `request` message for each leaf Bob has.
- 10. Bob sends back 10 `data` messages, one for each leaf.
- 11. Alice can validate the integrity of the 1st (0L) and 3rd (2L) `data` messages received by hashing both and comparing it to the hash in the 2nd message received (1L). The hash for `4L` and `6L` can be taken and compared to `5L`. Then the hash for `8L` and `10L` can be taken and compared to `9L`. Afterwards, Alice can take the hash of `1L`, `5L` and `9L` and compare to `3L` (the root node). Lastly, the digital signature sent by Bob can be used to verify that it derived from the dDatabase's public key.

- Once Alice has the data from Bob, she can keep the channel open and continually request Bob's entire feed, so that she will know the moment another entry has been made to Bob's dDatabase and can immediately request it. At the very same time, Alice can announce Bob's dDatabase to dWeb's DHT and add herself to the swarm. Now other peers who discover Bob's dDatabase can download from Alice, Bob or both simultaneously.