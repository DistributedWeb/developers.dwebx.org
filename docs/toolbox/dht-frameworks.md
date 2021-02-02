---
title : DHT Frameworks
---

Interfacing with dWeb's DHT can be accomplished by using the [`@dwebswarm/dht`](https://github.com/distributedweb/dht) Node.JS module. There are also higher-level networking APIs that are discussed [here](/toolbox/dweb-networking-api).

You can use this module to do the following:
- Create a dWeb-based DHT node
- UDP holepunch to other peers
- Lookup dWeb network addresses on the DHT
- Announce a peer under a particular dWeb network address
- Unannounce a peer under a particular dWeb network address
- Destroy a DHT node
- Store an immutable value in the DHT
- Retrieve an immutable value in the DHT
- Fetch all matching immutable values from the DHT
- Generate keypairs for storing mutable values on the DHT
- Utility method for creating a random or hashed salt value
- Utility method for creating a digital signature from a value
- Store a mutable value on the DHT
- Get a mutable value on the DHT

:::caution
#### What's next?
Learn more about dWeb's various networking APIs [here](/toolbox/dweb-networking-api).
:::