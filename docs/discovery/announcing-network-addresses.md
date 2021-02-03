---
title : Announcing Network Addresses
---

:::note
If you're looking to simply announce a dDrive on dWeb's DHT, this can be done using developer tools such as [dDrive Daemon](/ddrives/using-ddrives) or [dBrowser](https://docs.dbrowser.com). Although, if you're looking to do so programmatically within an application, you're on the right page :).
:::

In order to announce a network address programmatically, your application will first have to act as a [DHT node](/discovery/creating-a-dht-node). Once an application is acting as a node, network addresses can be announced as follows:

```javascript {}
const dht = require('@dwebswarm/dht')
const crypto = require('crypto')

const node = dht({
ephemeral: true
})

const dWebNetworkAddress = crypto.randomBytes(32)

node.announce(dWebNetworkAddress, { port: 12345 }, function (err) {
  if (err) throw err
  
  // you could also perform a lookup to confirm it's announced:
  node.lookup(dWebNetworkAddress)
    .on('data', console.log)
    .on('end', function () {
      node.unannounce(dWebNetworkAddress, { port: 12345 }, function () {
        node.destroy()
      })
    })
})

```
:::note 
For a full explanation over the [`@dwebswarm/dht`](https://github.com/distributedweb/dht/), head on over to the official repository [here](https://github.com/distributedweb/dht)
:::

:::caution
#### What's next?
Learn how to programmatically lookup an announced dWeb network address [here](/discovery/looking-up-network-addresses).
:::