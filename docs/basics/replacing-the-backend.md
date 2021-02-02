---
title : Replace The Backend
---


Decentralizing the backend of your application is fairly easy and is accomplished through the development of "smart contracts" that are deployed on ARISEN. A smart contract consists of actions, data structures and the database design (how data is stored on-chain) surrounding your contract. Actions within a contract typically require a set of parameters (like a function) and can be executed by any ARISEN user or even the contract itself. Contracts also have the ability to execute actions within remote contracts.

Since a smart contract can package an application's business logic within actions, and is responsible for storing the data that derives from these actions, it is the perfect decentralized alternative to the traditional backend. Especially, since data related to the contract's database can be retrieved from the blockchain at any time. Currently, ARISEN contracts must be written in C++ and can be easily compiled and deployed to ARISEN using [ARISEN CDT](https://github.com/arisenio/arisen.cdt). Frontends can execute specific actions using various SDKs, like [ArisenJS](https://github.com/arisenio/arisenjsv1), [ARISEN Java](https://github.com/arisenio/arisen-java) and [ARISEN Swift](https://github.com/arisenio/arisen-swift) and can query a contract's on-chain database using ARISEN's Open API.

:::note
For more on ARISEN and various smart contract development docs, head over to ARISEN's official documentation [here](https://developers.arisen.network).
:::
:::caution
#### What's next?
Learn about how to host and distribute your files on the dWeb [here](/basics/distributing-files).
:::