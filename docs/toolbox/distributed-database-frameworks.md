---
title : Distributed Database Frameworks
---

All off-chain datasets at their lowest-level exist within a dDatabase, and data is exchanged between peers using the dDatabase Protocol. Although, there are many higher-level abstractions written on top of a dDatabase that make way for distributed single and multi-writer databases, which are all discussed in-depth below.

### [`ddatabase`](https://github.com/distributedweb/ddatabase)
This powerful Node.JS implementation of dDatabase will allow you to do the following:
- Create a new dDatabase feed
- Append a block of data to the feed
- Get a block of data by index
- Get a range of blocks
- Get a block of data at the head of the feed
- Download a range of data (index range)
- Cancel a previous download request
- Get a signature providing the correctness of the block at a given index
- Verify a signature is correct for the data up to a given index
- Retrieve the root hashes for a given index
- Retrieve the total number of downloaded blocks within a range
- Return whether or not a data block is available locally
- Return whether or not a data block range is available locally
- Clear a range of data from the local cache
- Seek to a byte offset
- Find whether the length of a dDatabase feed has changed
- Make the feed stop downloading from other peers
- Make the feed stop uploading to other peers
- Create a writable stream
- Create a replication stream
- Fully close a feed
- Get block-length of feed
- Get byte-length of feed
- Return per-peer and total upload/download counts
- Destroy all stored data and fully close feed
- Audit all data in the feed
- Check if feed is writable
- Check if feed is readable
- Retrieve public key for feed
- Retrieve dWeb network address for feed
- Create custom extensions and send extension-based messages to connected peers

### [`ddatabase-protocol`](https://github.com/distributedweb/ddatabase-protocol)
This Node.JS implementation of the dDatabase Protocol is built into `ddatabase`, but can be used separately to open protocol streams and exchange all of the protocol message types included in the protocol destination. You can also use a simplified version of the protocol by using the [simple-ddatabase-protocol](https://github.com/distributedweb/simple-ddatabase-protocol) Node.JS module.

### [`dwebstore`](https://github.com/distributedweb/dwebstore)
The `dwebstore` Node.JS module is a canonical implementation of the "dwebstore" interface, which exposes a dDatabase factory and a set of associated functions for managing generated dDatabases. Essentially, a `dwebstore` is designed to efficiently store and replicate multiple sets of interlinked dDatabases. This module is used by the `ddrive` module to allow for dDrives to be mounted within other dDrives.

### [`dwebtrie`](https://github.com/distributedweb/dwebtrie)
dWebTrie is a single-writer distributed key-value store, built on top of a dDatabase feed. This Node.JS implementation of `dwebtrie` can be used to do the following:

- Create a new database
- Lookup a key
- Insert a key
- Delete a key
- Insert/delete multiple values at once
- Watch a prefix of the DB and get notified when it changes
- Get public key of database
- Get dWeb network address of database
- Retrieve the current version of the database (incrementing ledger)
- Return a new database instance checked out at a specified version
- Return a dDatabase replication stream for the database
- Return an iterator that iterates the latest value for a specified prefix
- Find a diff between two versions of a database

### [`dappdb`](https://github.com/distributedweb/dappdb)
dAppDB is a multi-writer distributed key-value store, built on top of a dDatabase feed. This Node.JS implementation of `dappdb` can be used to the do the following:

- Create a database
- Get public key of database
- Get dWeb network address of database
- Lookup a key
- Insert a value
- Delete a key
- Insert a batch of values
- Authorize another peer to write to the database
- Check if a key is authorized to write to the database
- Watch the database for changes
- Retrieve a list of results for a given key
- Find a diff between two versions of a database

### [`dwebtrie-multigraph`](https://github.com/distributedweb/dwebtrie-multigraph)
A Node.JS-based directed multigraph built on top of `dwebtrie`. Edges are stored in a dWebTrie using keys in the form `label/from/to`. Currently, the API exposes an iterator that performs a depth-first graph traversal. The `dwebtrie-multigraph` module can be used to:

- Create a new graph
- Create a labeled edge between two points
- Delete an edge
- Batch insert/delete many edges
- Create a depth-first graph iterator

:::caution
#### What's next?
Learn about various authentication-based SDKs that can be used to integrate your application with ARISEN and allow your users to authenticate themselves with various ARISEN-ready authenticators.
:::