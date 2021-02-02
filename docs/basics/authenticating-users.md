---
title : Authenticating Users
---

Traditional web applications typically utilize a backend API and a centralized database server for user authentication and the storage of user authentication details. This is the cause of many security issues that centralized applications face on a day-to-day basis, since they're in control of every single user's authentication details and the only wall between a user's most sacred information and the many bad actors out there who would like to get their hands on it.

User authentication on the dWeb works much differently. Since an application's code on the dWeb is open, and it's not possible to use centralized database management systems, dWeb applications must utilize methods like public key cryptography (aka asymmetric cryptography) for user authentication. Many applications on the dWeb utilize the ARISEN blockchain for user authentication, since ARISEN can associate a human-readable username (@jared) with different permission levels (see [ARISEN](/protocols/arisen), each of which are associated with a public key. In this case, @jared is in control of all associated private keys and can authenticate with actions on the backend (via smart contracts) with whichever permission level is required by the contract.

ARISEN and other blockchains typically store a user's public keys on-chain, and never see a user's private key(s) in the authentication process. This is made possible by digital signature algorithms like ECDSA, where a user signs a particular input with a private key, submits to the blockchain, and the blockchain's block producers (or miners) are able to mathematically determine that the signature derived from the private key that matches the user's public key that the blockchain has record of. This is one of the most secure forms of authentication and completely hacker-proof, as long as a user's keys are kept in a vault-like system.

This is the challenging part. Everyday users of the Internet are not familiar with cryptography, nor do they know how to safely store private keys. Even worse, even with key storage software and various blockchain authenticators, users are forced to verify with authenticators every time they execute an action on the backend (imagine having to verify with an authenticator every time you wanted to post to a social network). Simple Internet users will simply never adopt applications that have this sort of user experience. Enter ARISEN's powerful authentication protocols, signature providers and authenticators.

### Authentication Protocols
ARISEN has several authentication protocols that can be utilized to exchange details between a frontend and an authenticator. The various protocols were created to ensure that a user:

- A. Is fully aware of the application they're authenticating with.
- B. Only has to interact with an authenticator for a particular action type once, where all future occurrences are handled in the background automatically (i.e., a user allows the authenticator to sign all future "post" actions from a social network without further input from the user).

:::note
You can learn more about ARISEN's various authentication protocols like AATP and ASR in [Authentication Accounts & Actions](/authentication/authenticating-accounts-and-actions).
:::

### Signature Providers
Signature protocols are responsible for:
- A. Finding out what keys are available for signing.
- B. Requesting and obtaining transaction signatures with a subset of the available keys.

There are a number of different signature providers, for a number of different scenarios. For example, in the case where an authenticator stores keys in a hardware backed secure module such as TitanM, there is a specific signature provider that can obtain a signature from the keys stored in the hardware. The same can be said for a particular platform's keystore, or even specific authenticators.

:::note
For a full list of signature providers, check out the Toolbox and [Universal Authentication Libraries](/toolbox/universal-authentication-libraries).
:::

### Authenticators
Authenticators are applications that implement ARISEN's authentication protocols through the handling of key storage and transaction signing. Applications can integrate with authenticators to simplify the user-authentication process.

:::note
For more on authenticators, see [Using Authenticators](/authentication/using-authentication).
:::

### Universal Authentication Layer
As the dWeb grows, there will be a number of authenticator applications where users store their keys. At the same time, users probably won't switch to a new authenticator, and moving keys to a new authenticator can be complicated and unsecure. This goes without mentioning that application developers would have a blast integrating their application with a constantly growing number of authenticators and their APIs, especially if they want all of the dWeb's users to have the ability to authenticate with their app(s) (i.e., if Bob has his keys in "Authenticator X," he can only sign into apps that work with "Authenticator X"). For this reason, ARISEN's community recently released the "Universal Authentication Layer" (UAL) as a single overlaying API that can communicate with any authenticator that is integrated with it. For example, "Authenticator X" can create a UAL plugin, which can easily be plugged into your application's UAL so that users can authenticate themselves via "Authenticator X" or any other authenticator that's plugged into your application's UAL, from a single frontend interface. In other words, the login, signup and authentication process is the same, regardless of the authenticator being used. The best part is, you can use a single API for authentication, regardless of the number of authenticators plugged into the UAL.

:::note
You can learn more about ARISEN's Universal Authenticator Library [here](https://github.com/arisenio/universal-authenticator-library).
:::
---
:::caution
#### What's next?
Learn more about decentralized backends [here](/basics/replacing-the-backend).
:::
