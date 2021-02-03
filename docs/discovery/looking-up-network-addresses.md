---
title : Looking Up Network Addresses
---

As we covered in [Announcing a network address](/discovery/announcing-network-addresses), in order to lookup dWeb network addresses, your application will first have to act as DHT node.

You can lookup a dWeb network address programmatically, using the `@dwebswarm/dht` library, by doing the following:

```javascript {}
const dht = require('@dwebswarm/dht')
const crypto = require('crypto')

const node = dht({
  ephemeral: true
})

const dWebNetworkAddress = crypto.randomBytes(32)

node.lookup(dWebNetworkAddress)
  .on('data', console.log)

```

This should return the following:
```json {}
{
  // The DHT node that is returning this data
  node: {host, port },
  // List of peers
  peers: [ { host, port }, ...],
  // List of LAN peers
  localPeers: [ { host, port }, ...]
}
```

:::caution
#### What's next?
Learn how to deploy your website or web app's files in a dDrive using tools like dDrive Daemon and dBrowser [here](/ddrives/using-ddrives).
:::