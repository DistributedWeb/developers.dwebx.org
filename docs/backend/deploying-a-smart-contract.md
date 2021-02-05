---
title : Deploying A Smart Contract
---

In order to deploy a contract to ARISEN, you will need to install ARISENCLI and create an ARISEN account.

### Creating An ARISEN Account

- 1. Head over to the [ARISEN Signup Service](https://signup.arisen.network).
- 2. Enter a 12 character username and save your 12-word mnemonic phrase and your owner/active keys in a safe place.

### Installing ARISECLI
To install ARISECLI, run the following in your terminal:

```shell {}
git clone https://github.com/arisenio/arisen.git
cd arisen
./build.sh
sudo ./install.sh
```

### Startup aWallet
Before you can interact with ARISECLI, you will need to startup aWallet and import your account's public keys, so that ARISECLI can sign transactions for you (like when you run the `set` action to deploy a smart contract on ARISEN). To startup `awallet`, run the following in a `screen`:

```
awallet --http-server-address=0.0.0.0:12618
```

:::note
`awallet` has to run in a screen, because it's a daemon that has to remain running.
:::

#### Creating A Default Wallet
Now you need to create a default wallet to import your account's keys into. To do so, run the following:

```shell {}
arisecli wallet create
```

:::caution
This will output a long key-like password that you **must save**. It is required to lock/unlock the wallet. Without this password, imported keys will not be retrievable. Keep this password in a safe place.
:::

#### Importing Your Keys
Now you need to import your keys.

- First, unlock your wallet:
```shell {}
arisecli wallet unlock
```

- This will prompt you for your wallet password.

- Next, import your owner private key:
```shell {}
arisecli wallet import --private-key <owner-private-key-here>
```

- Next, import your active private key:
```shell {}
arisecli wallet import --private-key <active-private-key-here>
```

### Deploy Your Contract
To deploy your contract, you need to run the following:
```shell {}
arisecli set contract <username> CONTRACTS_DIR/hello -p <username>@active
```

:::note
In the above command, you need to replace `<username>` with your ARISEN username and `CONTRACTS_DIR/hello` with the folder for the `hello` contract we previously created. The `hello` contract (cpp/wasm files) should be in its own directory named the same as the contract, which in this case is "hello".
:::

### Testing Your Contract
Now we can test our `hi` action by running the following:
```shell {}
arisecli push action hello hi `["username"]` -p username@active
```

:::note
You should replace "username" with your own.
:::

This should output "Hello, < username>"

Congratulations, you have officially deployed your first contract on ARISEN.

:::caution
#### What's next?
Learn how to execute actions from within your application's frontend, [here](/frontend/executing-actions-from-the-frontend).
:::