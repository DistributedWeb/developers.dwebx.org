---
title : Creating A Cryptocurrency
---

To create and issue your own cryptocurrency, all you need is ARISECLI that we setup [here](/backend/deploying-a-smart-contract). Let's create your first coin!

### Create A Coin
To create a new cryptocurrency, run the following in your terminal:
```shell {}
arisecli push action arisen.token create '{"issuer":"username", "maximum_supply":"1000000000.0000 SYM"}' -p arisen.token
```

This will create a new coin called "SYM" with the maximum supply of 1 billion SYM.

### Issue Coins Into Circulation
Now you can issue some coins out of the maximum supply to yourself, by running the following:
```shell {}
arisecli push action arisen.token issue '["yourusername", "100.0000 SYM", "memo"]' -p yourusername@active
```

### Send Coins To Someone Else
You can now send some coins to someone else, by running the following:
```shell {}
arisecli push action arisen.token transfer '["yourusername", "receivingaccount", "50.0000 SYM", "memo"}' -p yourusername@active
```

Congratulations, you have created your own cryptocurrency that can be used within your own applications! You can issue coins out of your coin's maximum supply or even design smart contracts that can do this autonomously and programmatically.

:::caution
#### What's next?
Learn how to integrate payments into your websites and applications, [here](/payments/integrating-cryptocurrency-payments).
:::