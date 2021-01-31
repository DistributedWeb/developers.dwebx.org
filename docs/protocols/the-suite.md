---
title : The dWeb Protocol Suite
---


## DWEB
The previous sections identified the foundational protocols that together, form the DWEB protocol suite. This section will serve as an explanation for how these protocols work together to enable the simple and secure exchange of data between a web of peers, which in turn forms a decentralized web for the peer-to-peer exchange of information.

The dWeb is made possible through the following processes and models which take place across different dWeb protocol and data layers:

-[dWeb Network Addresses](#dweb-network-addresses)
-[Address Registration](#address-registration)
-[Address Announcement](#address-announcement)
-[Address Lookup](#address-lookup)
-[Peer Messaging Structure](#peer-messaging structure)
-[dWeb Data Model](#dweb-data-model)
-[Peer Data Exchange](#peer-data-exchange)

The sub-sections that follow explain how all of the above areas work, including a review of the [dWeb Data Model](#dweb-data-model) (that was explained in the [dDatabase](#ddatabase) section), which together ultimately allow for peers to host and distribute datasets, websites and web applications amongst themselves without a single central point of failure.

**NOTE:** This section covers version 8 of the DWEB protocol suite, which now includes a NOISE-based handshake for protocol-level encryption.

### dWeb Network Addresses
As discussed in [dDatabase](#ddatabase), a dWeb network address is a 32-byte hexadecimal address that can represent a device, distributed dataset (e.g. a distributed key/value database, distributed file system, etc.) or simply a binary data feed (e.g. a plain dDatabase feed).

A dWeb network address is identified by it's protocol identifying prefix: `dweb://40a7f6b6147ae695bcbcff432f684c7bb5291ea339c22c1755896cc`

If a network address represents a distributed file system like a [dDrive](#ddrive), the address may include a suffix that identifies specific files and/or folders within a dDrive, like so:
`dweb://40a7f6b6147ae695bcbcff432f684c7bb5291ea339c22c1755896cc/index.html`

In the case of a dDrive, this suffix could also include its version number:
`/?version=1`; or if the version is tagged, `/?version=live`

The `dweb://` identifier makes dWeb URLs easily identifiable, so that dWeb-capable applications can register protocols with an underlying operating system, which enables `dweb://` links to be programmatically recognizable (e.g., [dBrowser](http://dbrowser.com)).

It's important to note that a dWeb address suffix can be used by abstractions other than a dDrive to represent other data structures (other than files/folders) on behalf of a dWeb-capable application that is ultimately designed to digest a particular data structure via a dWeb network address suffix. For example, a message app could receive new messages using the following format:
`dweb://<key>/{messageID}/{messagePayload}`

### Address Registration
When announcing a dWeb network address on dWeb's DHT, if the address being announced does not exist, an address must be announced on ARISEN prior to it being announced on the DHT. This not only provides a bridge between dWeb's off-chain peer discovery network and on-chain computing infrastructure, but further empowers dWeb's [decentralized domain name system](#ddns) and [decentralized reporting system](#reporting-system).

This is made possible by the `dweb` contract on ARISEN and the `register` action. The `register` action accepts the following parameters:

| Parameter Name | Data Type | Description |
| --- | --- | --- |
| address | name | The dWeb network address |
| structure | name | The data structure type |
| status | uint8 | 0 for live and 1 for blacklisted |

The action does not require the address creator to authenticate with the contract since the contract self-authenticates with the contract creator; in this case, the `@dweb` account on ARISEN auto-authenticates every time an action is executed and pays all RAM, CPU and NET fees.

A dWeb network address can then be blacklisted via a 15/21 vote by governance members, who can then modify the entry by switching the status to `1`.

### Address Announcement
Once an address is registered, it can be announced via dWeb's DHT using the DWDHT protocol. An announcing peer, whether it is the creator of the dWeb network address or a peer joining an already existent address, provides the following announcement parameters to the DHT:
```
{
  key: <dweb-key>,
  ip address: <peer-public-ip>,
  port: <peer-port-number>,
  localAddress: {
    localIP: <peer-local-ip>
  }
}
```

To stay subscribed to a particular dWeb network address, a peer (creating or joining peer), must re-announce themselves every 60 seconds. The DHT server will also cycle its tokens periodically, so a client should remember the token it received last and update it when they receive a new one.

### Address Lookup
When a dWeb client (e.g., a web browser) performs a lookup, all it needs is a dWeb network address. A dWeb client queries dWeb's DHT for the address and the DHT will return the following response for any given dWeb network address:

{
  node: {host, port},
  // List of peers
  peers: [{host, port}, ...],
  // List of LAN peers
  localPeers: [{host, port}, ...]
}

### Peer Messaging Structure
Once a peer has discovered another peer's IP address and port number, it will open a TCP connection to the other peer, which allows peers to exchange data. This peer messaging protocol was briefly described in [dDatabase Protocol](#ddatabase-protocol), and handles a large portion of DWEB's data exchange process. All message structures adhere to the Protocol Buffers data serialization format.

Each half of a peer exchange has the following structure, which repeats until the end of the connection:

| Field | Description |
| --- | --- |
| Length | Number of bytes until the start of the next length field |
| Channel and type | A single number (up to 11 bits long) that encodes two sub-fields |

-The `channel` and `type` subfields are as follows:

| Field | Description |
| --- | --- |
| Channel | Peer can exchange multiple data feeds using the same TCP connection. The channel number is `0` for the first feed, `1` for the second and so on. |
| Type | Number relating to the type of message being sent |

-The following message types can be used in the `type` field:

| Type | Name | Meaning |
| --- | --- | --- |
| 0 | Feed | I want to talk to you about a dWeb address |
| 1 | Handshake | I want to negotiate how we can communicate over TCP |
| 2 | Info | Whether I'm starting or stopping uploading or downloading |
| 3 | Have | I have some data that you said you wanted |
| 4 | Unhave | I no longer have the data I said I had |
| 5 | Want | This is the data I want |
| 6 | Unwant | I no longer want this data |
| 7 | Request | Please send me this data now |
| 8 | Cancel | Cancel this `Request` |
| 9 | Data | Here is the data you requested |
| 10-14 | (unused) |
| 15 | Custom extension message, not a part of the core protocol |

#### Bit Notation
Throughout the underlying dDatabase protocol, multiple fields will be packed into a single number. Looking at this number as a sequence of bits makes the fields within the message far more visible. It is important to note that the most significant bit is always on the left (big endian).

Eight bits make up an entire byte, however this number and many others are `varints` which can be up to 64 bits long. The fields on the right are always a fixed number of bits, but the leftmost field can be as much as 64 bits.

#### Varints
The first two fields are encoded as `variable-length integers` and therefore do not have a fixed size. Each field must be read from the beginning in order to determine the length of the field and where the next field begins.

Varints have the ability to represent small numbers with a few bytes and large numbers by using more bytes. The only disadvantage is the overhead introduced during the process to encode and decode integers.

##### Keepalive
A keepalive message is a BGP-4 Message used to acknowledge an open message, and to periodically confirm that the other peer is still a part of the TCP relationship.

In the case of the dDatabase protocol, it's an empty message containing no channel number, type or body. They are discarded upon being received by the remote. This can also be used by peers looking to live sync a dDatabase feed, which means they would have to keep a TCP connection open inevitably, which in turn would equate to a steady stream of `keepalive` messages. The actual rate is determined by the underlying TCP settings.

#### Body Structure
Within each `Body` field, is a series of field tags and values:

-`Field Tag ` - varint
-The most significant indicates which field within the message this is:
--`1` = dWeb network address
--`2` = nonce
--The least significant bits are the type of the field.

The two types of fields are:
| Varint | The field tag followed by a varint value. Used for simple numeric values & booleans. |
| Length-prefixed | The field tag followed by a varint to say how many bytes the field contains. |

##### Message Pseudo-Representation
A visual representation of DWEB protocol messages is as follows:
```
-Length
-Channel/Type
--Channel
--Message Type
-Message Body
```
As you will see in subsequent sections, the `Message Body` contains different fields and content, dependent on the `Message Type`.

### Peer Connection Initiation
When a peer discovers a remote peer, a TCP connection is opened with the remote peer and the following takes place in order to prepare the connection for the exchange of data between peers:

#### 1. Feed Message Sent To Remote Peer
After opening the TCP connection, the first message sent to the remote peer is of the `Feed` type (0). The `Feed` `Message Body` has two fields:

| Field No. | Name | Type | Description |
| 1 | dWeb network address | Length-prefixed | dWeb network address |
| 2 | Nonce | Length-prefixed | 24-byte random nonce generated for this TCP connection |

This allows the remote peer to know which dWeb network address you're interested in.

#### 2. Peers Exchange Handshake Message
After the `Feed` message is sent, a `Handshake` message is sent on each side of the TCP connection.

The `Handshake` `Message Body` has the following fields:

| Field No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | ID | Length-prefixed | Random ID generated by this peer upon starting; 32 bytes long; used to detect multiple connections to the same peer. |
| 2 | Live | Varint | 0 = end connection when neither peer is downloading; 1 = keep connection open indefinitely. |
| 3 | User data | Length-prefixed | Arbitrary bytes that can be used by higher-level applications for any purpose. |
| 4 | Extensions | Length-prefixed | Name of any extension the peer wants to use. |
| 5 | Acknowledge | Varint | 0 = no need to acknowledge each fragment of data received; 1 = must acknowledge each fragment of data. |

-The `Extensions` field (#4) can appear multiple times, one for each extension. Both peers need to request an extension in their handshake messages for it to become active.

This same structure, using DWEBv8, can be used for a NOISE-based handshake so that all messages are encrypted and MAC'd using NOISE's `XX` pattern. In the process, both peers exchange a keypair for the purpose of stream authentication (message authentication code). This way, both peers can be assured that each is receiving a message from the other, since both will end up generating the same MAC (checksum) from the actual message contents using the exchanged private key. For example, PeerA would encrypt the message using the secret as follows:

`MAC = E(K,M)` (where `K` is the key, `M` is the message and `E` is the encryption function)

The MAC is attached to the end of the received message (as a checksum) and sent to PeerB. PeerB, using the exchanged secret key, can perform `E`, derive a MAC checksum from the received message, and compare to the received MAC checksum. This confirms that the message derived from PeerA.

### dWeb Data Model
Technically, peers can exchange any kind of data. A [dDatabase](#ddatabase) is the first standardized distributed dataset for the dWeb and is used by abstractions like [dDrive](#ddrive) and [dWebTrie](#dwebtrie). Other custom abstractions of a dDatabase feed can be created, but at the end of the day, it's still a dDatabase, which means it's a bunch of entries that each equate to an abstract blob of data.

The dWeb protocol can work with any dDatabase-alternative as long as it contains a list (log or feed) of variable-sized fragments (entries) of bytes. A dDatabase is an immutable, cryptographically secure, append-only log, which means new fragments can be added to the end by dDatabase's author, but existing fragments can't be deleted or modified.

Therefore, the following data model is used in the exchange of data between peers:

-Each fragment (index or entry) in the feed is separated by boundaries so that a feed can be sent over the course of several protocol messages.
-Each fragment has a corresponding hash to verify the integrity of the data.
-There are also parent hashes which verify the integrity of two other hashes. Parent hashes form a tree structure known as a Merkle tree.
-Fragment hashes are even-numbered and parent hashes are odd-numbered.
-Hash trees eliminate the need for downloaders to verify a specific fragment without having to download the entire Merkle tree.
-Each time the dDatabase creator appends data (adds a new fragment), a new root hash is calculated and signed with the creator's private key.
-A remote peer who is downloading an entire feed or a specific fragment can use the creator's public key to verify the signature, which, as a result, verifies the integrity of other fragments and hashes.

#### Hashes And Signatures
The following types of hashes are found within a dDatabase's Merkle tree:
-`Fragment hashes` - Hashes the contents of a single fragment.
-`Parent hashes` - Hash of two fragments, forming a tree structure.
-`Root hashes` - Hash of all other parent hashes, signed by the dDatabase creator using the dDatabase's private key.

### Peer Data Exchange
The peer exchange process is actually quite simple to understand when you view one peer as a downloader and the other as an uploader, who are negotiating what fragments they `Want` and `Have`. In some cases, one peer is downloading and the other is uploading. In other cases, both peers are uploading and downloading at the same time as they both only have a portion of the feed (certain fragments). This is because neither peer, in the process of exchanging that feed, are the creators of the feed or the possessors of the feed. Every connection differs from the next, which is why peers must tell each other what they want and what they have.

#### Identifying Data
Each peer in the data exchange process remembers which fragments the other wants or has. The `Want` message is used by a downloader to inform the other peer of the fragment range (index range) they want to download and, as a result, want the other peer to inform them of whether or not they have it. The `Have` message is used by an uploader to indicate to the downloader that they do indeed have what the downloader seeks and will send if asked to.

As peers download or delete data, the list of fragments that have and want will change. This state is communicated to the other peer using four message types:
-`want`
-`unwant`
-`have`
-`unhave`
(see [Peer Message Structure](#peer-messaging-structure))

Each of these message types consist of the following structure in the their `Message Body`:

| Field No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | Start | Varint | Number of the first fragment you want/unwant/have/unhave. |
| 2 | Length | Varint | 1 = Just the start fragment; 2 = The start fragment and the next one and so on. |

If the `Length` field isn't included, this signals to the other peer that the entire feed is wanted, including new fragments, as they're appended.

##### Bitfield Field
If an uploader has many small, non-contiguous ranges of data, it can take a large amount of `Have` messages to communicate what the uploader actually has with the downloader.

A new `Have` message can be used that represents contiguous and non-contiguous ranges of data quite efficiently, using the following `Message Body` structure:

| Field No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | Start | Varint | ... |
| 2 | Length | Varint | ... |
| 3 | Bitfield | Length-prefixed | A sequence of contiguous and non-contiguous fragment ranges. |

Fragments can be divided into ranges, where each range is either contiguous (all fragments are there or none are there) or non-contiguous (some fragments are present). Each fragment range must be 8 fragments long. Range types, in some cases, alternate but it's possible for contiguous ranges to be included in a series of ranges within feeds where all fragments are present.

###### Range Encoding Structure
These ranges are encoded as follows within the `BitField` field of the `Have` `Message Body`:

| No. | Name | Description |
| 1 | Contiguous | A single varint containing sub-fields that represents how many 8-fragment sections there are and whether all are present. |
| 2 | Non-Contiguous | Varint saying how many 8-fragment sections the bitfield represents, followed by bitfield. |

The first byte of the bitfield represents the first 8-fragment section. The most significant bit of each byte represents the first fragment of each 8-fragment section.

#### Requesting Data
Once an uploader has signaled that they have the data you want, you can send a `Request` message to ask them for it. A `Request` `Message Body` has the following structure:

| Field No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | Index | Varint | Number of the fragment to send back. |
| 2 | Bytes | Varint | If included, ignore the `Index` field and send the fragment containing this byte. |
| 3 | Hash | Varint | 0 = Send fragments and hashes; 1 = Just send fragments, no hashes. |
| 4 | Nodes | Varint | 0 = Send back all hashes to verify this fragment; 1 = Just send fragments, no hashes. |

**NOTE:** A `Request` can only be used to request a single fragment.

##### Cancelling A Request
If a fragment is no longer needed, a `Cancel` message can be sent. The `Cancel` `Message Body` has the following structure:

| Field No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | Index | Varint | Number of a fragment to cancel. |
| 2 | Bytes | Varint | Ignore the `Index` field and cancel the fragment request that contains this byte. |
| 3 | Hash | Varint | Set to the same value as the hash field of the request you want to cancel. |

#### Sending Data
When an uploader receives a `Request`, they can fulfill the `Request` by sending a `Data` message to the downloader. The `Data` `Message Body` has the following structure:

| Field No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | Index | Varint | Fragment number. |
| 2 | Value | Length-prefixed | Contents of fragment. |
| 3 | Nodes | Length-prefixed | This field is repeated for each hash the requestor needs. |

The `Nodes` field uses the following recursive structure:

| Field No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | Index | Varint | Hash number. |
| 2 | Hash | Length-prefixed | 32-byte fragment hash of parent hash. |
| 3 | Size | Varint | Total length of data in fragments that hash covers. |
| 4 | Signature | Length-prefixed | 64-byte ed25519 signature of roothash corresponding to fragment hash. |

### An Example DWEB Communication
-PeerA looks up dWeb network address on the DHT and finds that PeerB is swarming.
-PeerA pulls PeerB's address and port number and initiates a TCP connection.
-PeerA sends a `Feed` message to PeerB as follows:
```
-Length (in bytes)
-Channel/Type:
--Channel: 0
--Type: 0
-Message body:
--dWeb network address (Field1)
--nonce (Field2)
```
-PeerA then sends a `Handshake` message to PeerB as follows:
```
-Length
-Channel/Type:
--Channel: 0
--Type: 1
-Message Body:
--ID: 0156721
--Live: 1 (keep connection open indefinitely for live replication)
--User data: <noise details>
--Extensions: noise
--Acknowledge: 1 (must acknowledge each fragment received)
```
-PeerB then sends back a `Handshake` message to complete the handshake:
```
-Length
-C/T:
--Channel: 0
--Type: 1
-Message Body:
--ID: 0156721
--Live: 1
--User Data: <noise details>
--Extensions: noise
--Acknowledge: 1
```
-PeerA sends PeerB a `Want` message, indicating it wants all fragments:
```
-Length
-C/T:
--Channel: 0
--Type: 5 (Want)
-Message Body:
--Start: 0
```
**NOTE:** The `Length` field isn't included in the `Message Body` to indicate PeerA wants the entire feed.
-PeerB then sends a `Have` message to `PeerA`, indicating they have the data:
```
-Length
-C/T:
--Channel: 0
--Type: 3 (Have)
-Message Body:
--Start: 0
--Length: <feed length>
```
**NOTE:** This indicates that PeerB has the entire feed (fragments 0 and 1).
-PeerA then sends a series of `Request` messages to PeerB for each fragment:
Request for fragment *0*:
```
-Length
-C/T:
--Channel: 0
--Type: 7 (Request)
-Message Body:
--Index: 0
--Nodes: 0 (send back all hashes to verify this fragment)
```
Request for fragment *1*:
```
-Length
-C/T:
--Channel: 0
--Type: 7 (Request)
-Message Body:
--Index: 1
--Nodes: 0
```
-Upon receiving the `Request` for fragment 0, PeerB immediately sends fragment 0 in a `Data` message:
```
-Length
C/T:
--Channel: 0
--Type: 9 (Data)
-Message Body:
--Index: 0
--Value: <contents of index in binary>
--Nodes:
----Index: <hash number of fragment 0>
----Hash: <32 byte hash for fragment>
----Size: <fragment data length>
----Signature: <signature of root hash>
```
-Upon receiving the `Request` for fragment 1, PeerB immediately sends fragment 1 in a `Data` message:
```
-Length
-C/T:
--Channel: 0
--Type: 9
-Message Body:
--Index: 1
--Value: <contents of index 1 in binary>
--Node 1:
----Index: <hash number of fragment 1>
----Hash: <32 byte hash for fragment 1>
----Size: <fragment data length>
----Signature: <signature of root hash>
--Node 2:
----Index: <hash number of parent 1>
----Hash: <32 byte hash for parent 1> (hash of fragment 0 and fragment 1)
----Size: <parent data length>
----Signature: <signature of root hash>
```

This is a giant pseudo-representation, considering all messages over the wire are in binary. The above examples aren't completely scientifically accurate, but should help build a mental model of how DWEB-based communications take place. It should be clear that multiple datasets can be exchanged with the same peer over the same TCP connection by using multiple channels. This is also one of the reasons a `Handshake` message utilizes a unique ID and the initial `Feed` message uses a randomly generated `nonce`.

### Protocol For A New Web & Beyond
While HTTP allows a client to request and receive data from a server, DWEB allows a peer to request and receive data from another peer or a set of peers. While one of the main use-cases for the dWeb is for the exchange of a dDrive that mostly contain websites and web applications, it can also be used to exchange distributed databases or even plain binary data. This means DWEB could be used to power a decentralized domain name system, a peer-to-peer phone system, live video streaming, as well as a multitude of other use-cases.

The most powerful aspect about the dWeb is that the requestor can cryptographically validate what the sender is sending. At the very same time, the requestor can request specific versions of specific fragments, which in the the case of a dDrive, equates to a requestor being able to view a specific version of a website or a web application. Since a dWeb network address is generated and wholly owned by a dataset's author and announced on a DHT that's distributed across potentially thousands or millions of computers globally - where the announced dataset is spread across the peers who consume it - it's safe to say that it would be impossible to take the dWeb offline. And the same goes for the data distributed across it, as long as the data maintains a group of peers in multiple locations.

Even though data exchanged over the dWeb protocol is not natively encrypted, overlaying protocols like [DWCIP](https://github.com/peepsx/dwcip-whitepaper) can be used to handle message encryption. NOISE can be used at the `Handshake` phase as well, which may make encryption seem native. When it's all said and done, websites and web applications are far more secure when distributed over DWEB compared to when they are distributed over HTTP. For hackers, a DDOS attack is useless because of how data is accessed and distributed. This is great news for website owners on the dWeb.

DWEB's [advantages](#advances-and-advantages) are clear when compared to the HTTP protocol, as well as the World Wide Web, for which HTTP happens to be the glue for. But it's DWEB's ability to grow beyond a World Wide Web alternative, in the process liberating many other forms of communication where freedom is under attack, that make DWEB such a viable solution to the attacks on freedom that are becoming rampant on the World Wide Web.