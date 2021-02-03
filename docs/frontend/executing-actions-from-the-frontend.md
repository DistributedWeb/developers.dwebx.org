---
title : Executing Actions From The Frontend
---

Executing actions from your backend, will require you to utilize one of ARISEN's SDKs. For this example, we're going to use [ArisenJS](https://github.com/arisenio/arisenjsv1).

#### Installing ArisenJS
To add ArisenJS to your project, simply install it, as follows:

```shell {}
npm install arisenjsv1 --save
```

#### Instantiate ArisenJs
Now you need to create the configuration ArisenJS will work off of, which means connecting ArisenJS to a particular ARISEN network, an ARISEN-based HTTP endpoint to send requests to, as well as they private keys being used for transactions. In the case where you're using an authenticator, keys will be provided by the authenticator and obviously ArisenJS would not be used for signing, although in the below example, we act as if the keys are provided to the config locally and ArisenJS in this case would be used for signing, since it has access to the keys.

:::note
dWeb-based applications should never hardcode keys into their application code, as shown in the example below. Instead, they should use signature providers, to interface with platform-based keystores, in order to obtain signatures for transactions. There are many signature providers [here](/toolbox/universal-authentication-libraries), which are pluggable into SDKs like ArisenJS. The methods below are simply used to showcase how ArisenJS works and how actions can be executed from within your application.
:::

```javascript {}
Arisen = require('arisenjsv1')

config = {
  chainId: null, // chainID of the ARISEN-based network
  keyProvider: ['PrivateKeys...'], //WIF string or array of keys
  httpEndpoint: 'https://greatchains.arisennodes.io',
  expireInSeconds, 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}

arisen = Arisen(config)
```

#### Executing An Action
You can execute an action, like so:

```javascript {}
arisen.transaction(
  {
    actions: [
      {
        account: 'arisen.token', // name of contract
        name: 'transfer', // name of action
        authorization: [{
          actor: 'executinguser',
          permission: 'active',
        }],
        data: { // parameters required by the action
          from: 'executinguser',
          to: 'person-you-are-sending-coins-to',
          quantity: '7.0000 RIX',
          memo: 'MAGA 2024'
        }
      }
    ]
   }
  // options -- example: {broadcast: false}
)
```


#### Named Action Functions
More concise functions are provided for applications that may use actions more frequently. This avoids having lots of JSON in the code. A few examples of this are below:

```javascript {}
// Run with no arguments to print usage
arisen.transfer()

// Callback is last, when omitted a promise is returned
arisen.transfer('inita', 'initb', '1.0000 RIX', '', (error, result) => {})
arisen.transfer('inita', 'initb', '1.1000 RIX', '') // @returns {Promise}

// Positional parameters
arisen.transfer('inita', 'initb', '1.2000 RIX', '')

// Named parameters
arisen.transfer({from: 'inita', to: 'initb', quantity: '1.3000 RIX', memo: ''})

// Options Appear After Parameters
options = { broadcast: true, sign: true }

// `false` is a shortcut for {broadcast:false}
arisen.transfer('inita', 'initb', '1.4000 RIX', '', false)
```


:::note
For a full description of all of ArisenJS's features and APIs, please refer to it's [official documentation](https://github.com/arisenio/arisenjsv1).
:::

:::caution
#### What's next?
Learn how to query the on-chain database related to your contract, using ARISEN's RPC-based API, [here](/frontend/querying-the-on-chain-db).
:::