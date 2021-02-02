---
title : Decentralized Data
---

Conceptually, data on the dWeb is discovered, requested and exchanged differently than data on the World Wide Web, simply because it is hosted across peers on the network, rather than on centralized servers. It's an important difference developers must come to understand, before they'll ever be able to build dWeb-powered applications. Simply put, data on the dWeb either exists on-chain (on the blockchain) or off-chain (hosted within a dDatabase amongst a swarm of peers). When designing your application, it's important to understand which data belongs on-chain and which data belongs off-chain. While in some cases design decisions may be based around whether or not data should be publicly available on a blockchain, in other cases, an application simply may load faster when certain data is located off-chain and other data is located via a blockchain. These are design decisions you will ultimately have to make during development, but in most cases, there are several important factors to consider for both on-chain and off-chain data:

#### On-Chain Data
- Data stored on-chain is publicly available and will always be discoverable on the blockchain itself. This means that the data can be found by anyone with a computer, using a [blockchain explorer](https://data.arisen.network) or other similar methods. As an example, a user may not want their home address stored on a blockchain. In some cases, data on a blockchain can be encrypted so that only the application that the data derived from can digest it.
- Blockchains are **NOT** meant to store large data sets and since blockchains require users to pay for storing data in the blockchain's memory, storing large data sets can become very costly. In the case of ARISEN, developers of a smart contract would have to pay the RAM costs for all of the data that derives from the contract, if they choose to be the payers for RAM costs. On the other hand, an application can require that their users pay for the storage of their own data on-chain, but this complicates the user experience and introduces users to concepts that are foreign to them (RAM costs on a blockchain and requires a user to have access to the blockchain's native currency, etc.).

:::note
For more information on how data is stored via ARISEN, ARISEN has its own exhaustive documentation, as well as smart contract tutorials, which can be found [here](https://developers.arisen.network).
:::

#### Off-Chain Data
- While data stored off-chain is publicly available, it can have a short lifetime. Data shared off-chain has to have at least one peer who is publicly announcing the data and that peer has to be willing to exchange the data. Unlike a blockchain, where data is always available via its ledger, off-chain data isn't located in a single location, which allows for it to operate in the opposite fashion. One could argue that data sets located on a blockchain are held within one gigantic swarm, while data sets on the dWeb each have their own individual swarms. In other words, one swarm, has no idea what another swarm on the network is sharing, until of course they inquire with the other swarm and download the data the remote swarm is sharing amongst its peers. In a way, each swarm is its own P2P network. 
- As mentioned earlier in the `protocols` section of this documentation,  a dWeb network address doesn't have to represent a dDatabase. In fact, it can represent a peer or a group of peers. For example, a peer could derive a dWeb network address from their actual username (using their username as a seed) and announce themselves on dWeb's DHT. Another peer who wants to speak to this peer directly, can find them on the DHT by deriving the same network address from the user's username. Since the other user is announcing itself under the network address, the inquiring peer can easily find their connection details via the DHT, connect and begin the process of exchanging private messages between each other using the dDatabase protocol. All messages are encrypted, where only the peers involved in the communication can actually digest what is being exchanged. 
- There is no limit or costs related to data being distributed off-chain, which means you can distribute as much data as you'd like. A [dDrive](/protocols/ddrive) could hold a million or more files, easily and peers can exchange a dDrive of this size quite efficiently. 

:::note
For more information on off-chain data, and how data is exchanged between peers, please read about [dDatabase Feeds](/protocols/ddatabase) and [dDatabase Protocol](/protocols/the-suite).
:::

### The Social Network Example
The best way to showcase how data can be distributed is by using an example. In this case, we can use a social network to showcase how post data is stored both on-chain and off-chain.

#### Post Data
**A post has the following data:**
- Post ID
- Post timestamp
- Post data
- Post media (photos, videos or audio)
- Post interactions (likes, retweets, etc.)

**A few important takeaways:**
- A post's ID can be easily generated by the frontend or generated by a smart contract and stored on-chain. It is relatively small in size.
- The timestamp is relatively small and can be generated by a smart contract and stored on-chain.
- Post data can be limited in size by the frontend or by the smart contract, and can therefore be stored on-chain.
- Post media can be very large and is not suited for storage on-chain. The frontend is capable of placing the media related to a post within a dDrive and announcing the dDrive via dWeb's DHT. On the other hand, the dWeb network address related to the dDrive can be stored alongside the post itself on-chain. 
- Post interactions can be stored in a separate table on-chain, in relation to a Post ID. The data related to interactions is relatively small (interacting user and interaction type). The frontend should be capable of querying all interactions and counting the number of interactions by type. 

This way, when the frontend queries ARISEN for post-related data (in relation to the social network's smart contract), it can perform a lookup by the post's ID and get all of the data it needs to display post-related data on the frontend. In the case of the post media, it is able to retrieve the dDrive's network address stored on-chain and download the data related to it, off-chain. While this example is a small one, it should help you grasp the difference between on-chain and off-chain data. 

:::note
In other cases, dWeb's off-chain protocols can be used as communication mediums (for messaging and voice-based communications), which is beyond the scope of this documentation.
:::