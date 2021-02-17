---
title : Creating A DHT Node
---

One of the most powerful features of the dWeb, is how network data is distributed amongst its users. Many developers like [Peeps](https://peepsx.com), make an honest effort to ensure that each of their applications, when installed on a user's device, act as a DHT node on the network because it's important to the growth of dWeb's network and further decentralizes the dWeb in the process. Using [@dwebswarm/dht](https://github.com/distributedweb/dht) makes this easy. In order to integrate `@dwebswarm/dht` into your application, do the following:

:::note
The [dWebSwarm DHT](https://github.com/distributedweb/dht) library is one way of interacting with dWeb's DHT, but this can also be done using higher level APIs like [dWebSwarm Discovery](https://github.com/distributedweb/discovery), [dWebSwarm Network](https://github.com/distributedweb/network) and [dWebSwarm](https://github.com/distributedweb/dwebswarm), which are all built on top of `dWebSwarm DHT`.
:::

#### Installing `@dwebswarm/dht`
First you will need to add `@dwebswarm/dht` to your application by running:

```shell {}
npm install @dwebswarm/dht
```

#### Become A DHT Node
Within your application, you can utilize the following code to allow for a user's device to act as a dWeb-based DHT node:

```javascript {}
const dht = require('@dwebswarm/dht')
const crypto = require('crypto')

const node = dht({
   // Must be false, if you intend for node to be a long-term node on the network.
  ephemeral: false
})

```

That's literally it. Now the user's device, is a DHT node on the dWeb network.

:::note
You can actually create your own private dWeb, by launching your own DHT network, using [@dwebswarm/cli](https://github.com/distributedweb/cli). You could then use the "bootstrap" parameter within the DHT options, so that new nodes can connect to the right DHT, rather than dWeb's default DHT nodes. You can learn more about the dWebSwarm DHT API, [here](https://github.com/distributedweb/dht).
:::

:::caution
#### What's next?
Learn how to programmatically announce a dWeb network address on dWeb's DHT, [here](/discovery/announcing-network-addresses).
:::