---
title : dWeb Networking API
---

There are several higher-level abstractions built on top of `@dwebswarm/dht` that are discussed below:

#### [`@dwebswarm/discovery`](https://github.com/distributedweb/discovery)
The `discovery` module can be used to do the following:
- Look for peers under a dWeb network address
- Start announcing a dWeb network address
- Find a single peer for a particular dWeb network address
- Ping all of dWeb's bootstrap DHT nodes
- UDP holepunch to another peer

#### [`@dwebswarm/network`](https://github.com/distributedweb/network)
The `network` module can be used to create a network instance surrounding specific dWeb network addresses. The network instance can connect to a peer related to the address, and UDP holepunch to the peer if necessary.

#### [`dwebswarm`](https://github.com/distributedweb/dwebswarm)
The `dwebswarm` module is the highest-level API for interacting with dWeb's DHT and can be used to the do the following:
- Create a DHT node
- Join a specific dWeb network address on the DHT
- Leave a specific dWeb network address on the DHT
- Retrieve the status of a dWeb network address on the DHT
- Establish a connection to a given peer
- Ban a peer and make the swarm stop connecting to it
- Make the swarm backoff from reconnecting to a peer
- See all active connections related to a particular dWeb network address

#### Other Network Tools
- [dweb-peersockets](https://github.com/distributedweb/dweb-peersockets) - Used for connecting to peers on dWeb's DHT and exchanging messages
- [dwebstore-swarm-networking](https://github.com/distributedweb/dwebstore-swarm-networking) - Networking module for dWebStore that uses dWebSwarm

:::caution
#### What's next?
Learn about dWeb's various distributed database frameworks [here](/toolbox/distributed-database-frameworks).
:::