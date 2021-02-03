---
title : Creating Accounts
---

Considering the `newaccount` action is simply an action within an on-chain contract, this can easily be executed on-chain using ArisenJS and other ARISEN SDKs. For example, after initiating ArisenJS, you could do the following:

:::note
It's important to note that accounts can only be created by already existent accounts, since there are RAM costs associated with storing the new account data on-chain and only an already existent account would have the RIX needed to purchase the RAM. With that said, this is why in the code below, you will see `buyrambytes` and `delegatebw` actions coupled with the `newaccount` action, within the transaction below.
:::

```javascript {}
const Arisen = require('arisenjsv1')

// ARISEN config
config = {
  chainId: null,
  keyProvider: ['PrivateKeys...'],
  httpEndpoint: 'https://greatchains.arisennodes.io',
  broadcast: true,
  verbose: false,
  sign: true
}

// Initiate config
arisen = Arisen(config)

wif = 'PrivateKey'
pubkey = 'PublicKey'

arisen.transaction(tr => {
  tr.newaccount({
    creator: 'youraccount',
    name: 'newaccount',
    owner: pubkey,
    active: pubkey
  })

  tr.buyrambytes({
    payer: 'youraccount',
    receiver: 'newaccount',
    bytes: 8192
  })

  tr.delegatebw({
    from: 'youraccount',
    receiver: 'newaccount',
    stake_net_quantity: '10.0000 RIX',
    stake_cpu_quantity: '10.0000 RIX',
    transfer: 0
  })
})
```

:::note
#### What's next? 
Learn how users can be authenticated and how transactions can be signed via authenticators [here](/authentication/authenticating-accounts-and-actions).
:::