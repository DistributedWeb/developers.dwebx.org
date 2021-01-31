---
title : ARISEN
---

### ARISEN
ARISEN is a suite of blockchain protocols, powered via smart contracts, that also acts as a development framework for dWeb-based applications, by providing a distributed virtual machine (global computer), a smart contract engine, a universal authentication layer, decentralized network consensus, decentralized payments, a decentralized domain name system and a decentralized reporting system.

#### On-Chain Vs. Off-Chain Protocols
While dWeb's DHT (DWDHT), dDatabase (DDB), dWebTrie (DWT) and dDrive (DDRIVE) form dWeb's "off-chain" protocol suite, ARISEN forms the dWeb's "on-chain" protocol suite. It's important to explain the difference between `off-chain` protocols and `on-chain` protocols, other than what is obvious. While blockchain technology is great for many use-cases, as are peer-to-peer networks like the one formed by dWeb's `off-chain` protocol suite, both of these have obvious deficiencies and crystal-clear bottlenecks when either is used independently in the formation of a decentralized web. Although, when both are combined, a decentralized web, with its own distributed and decentralized application development suite, is brought to life. Here were some of the issues we were able to solve through the combination of ARISEN and dWeb's `off-chain protocols`:

-1. Since an application and its files that are distributed to users via a dDrive are completely open source, a distributed database of some sort would have to be distributed in the dDrive so that users of the web application and their actions within the app could be written to this nested database. (**NOTE:** this database would be located within a separate dDrive, which would be nested with the app's dDrive. The database would have to be a multi-writer distributed database, like [dAppDB](https://github.com/distributedweb/dappdb), that allows multiple users to write to the database, since a dAppDB is made up of a constantly growing web of dDatabases, each of which is written to by a unique user (more on this in [Multi-Writer Databases](#multi-writer-databases)). This requires the initial creator of the dAppDB to constantly authorize new keys and therefore introduces a slight bit of centralization, since the dDrive creator would have to approve the authorization from their end; a change that would update the state of the nested dDrive, which would replicate to all of the app's users in real-time as well. This creates an issue where an app's creator could decide which users can use their application, through their ability to choose who they authorize to write to the app's database.

As you will see in subsequent issues within this section, ARISEN easily provides a decentralized, on-chain data persistence layer for applications which CAN allow for the use of off-chain distributed databases, that which the application itself would be unable to control.

-2. Applications have users and need a decentralized user management system of some sort, where users are in control of their authentication details. Centralized applications store user credentials within a centralized database, typically have their own integrated user and user permissions system and therefore control who can and who cannot use their applications. In the world of decentralized applications, a user management system cannot be managed by the app developer, even if it's open and based around public key cryptography, due to the fact an application could still manage to choose who can and cannot use their application. dDrives are controlled by their creator, while a blockchain provides a decentralized and trusted third party for user authentication. A blockchain protocol suite like ARISEN, that has an onboard smart contract engine, allows an application developer to isolate actions that require user input and therefore user authentication within a smart contract that's stored on ARISEN's blockchain. Actions within a smart contract (i.e., creating a post on a social network) can be executed from the dDrive's application files (outside of the blockchain), where the action is initiated by a blockchain-based account, signed with the private key of the account and broadcasted to the blockchain, where it can be validated by trusted (in the case of ARISEN, elected) members of the blockchain network. Where, if verified, the data that derives from the action is stored in a database that is related to the smart contract on ARISEN. This clearly solves the database issue faced in #1, where multiple users can write to an application's database without the application developer preventing certain users from doing so, since the application developer is not in control of the blockchain, like he is in control of the app's dDrive. The on-chain database could be used to point to off-chain distributed databases that only users are in control of for data storage. This also insures that an application doesn't have to rely solely on a blockchain, instead using it as a pointer to off-chain databases. Beyond ARISEN providing a user management system, it provides `human-readable` usernames and an access-control system (permission system), which applications can easily be designed around.

-3. The dWeb, for it to be used by non-technical users, needs a decentralized domain name system (dDNS), since 64-character hexadecimal addresses are too difficult, if not impossible, to memorize. Centralized domain names would not work for several reasons, one being that the standard DNS system is not designed to work with dWeb addresses and two, as I noted in the [Preface](#preface) of this paper, centralized domains can be seized by tyrannical entities. dWeb's off-chain protocols like DWDHT could be used for a domain name system, but I have determined that actions of domains, like the actions of accounts, need to be cryptographically validated. Also, with DHT, someone would have to control the "issuance" of dTLDs. ARISEN allows for the creation of premium accounts that can be won via auction, which can be used to create a sub-account that contains a period (.). For example, the account "dcom" can be won, and used to create a subaccount like "website.dcom", which resembles a domain and has its own permission-levels and associated keypairs, since it can authenticate with ARISEN (like any other account). The won name clearly acts as a dTLD and auctions clearly decentralize the issuance. A smart contract can then be developed for creating dDNS records for a domain, where the domain itself has to sign for the creation of a record. For example, this contract would have an `add` action that accepts the following parameters:
-`domain` (account used for validation)
-`record_name`
-`ttl`
-`class`
-`type`
-`rdata` (dWeb Network Address)

Like I mentioned in #2, each action would require an account (in this case a domain) to sign for the action. Once signed and validated, the above record would be stored in a database on ARISEN, logically associated with the contract and the domains as well, so that record lookups via ARISEN's API can be unique to a domain - more on this in [On-Chain Data Persistance](#on-chain-data-persistance).

-4. Then comes the issue of payments. Since applications on the dWeb are distributed openly within a dDrive, integrating centralized forms of payment simply isn't possible, since the integration with these types of systems would reveal API keys (secret keys) used to integrate and authenticate with these services (e.g., PayPal). This forces applications to utilize decentralized forms of payments via networks like ARISEN (RIX), Bitcoin (BTC), EOS (EOS) and others. Obviously, the dWeb is blockchain agnostic when it comes to application development, but the dWeb protocol, as explained in (DWEB)(#dweb), bridges both the off-chain and on-chain protocols discussed in this paper, for reasons discussed later. While off-chain currencies like CloudCoin could certainly be integrated, there are still questions regarding the centralization of the DNS servers CloudCoin uses as a way of validating the authenticity of CloudCoins; although, this doesn't create an issue where the apps developers or an outside entity can seize CloudCoins. Technically, anyone could launch their own validation system and, since CloudCoin is distributed within image files, there is no ledger or transaction history, introducing anonymity, which might be avoided by some developers.

While a similar system like CloudCoin could be developed using dWeb's DHT, we have not embarked on such a project but we certainly will in the future.

-5. The downsides of a decentralized web with no checks in place would allow for the illegal distribution of narcotics and child pornography. I will certainly mention terrorist activity, but I won't over-emphasize since it is consistently over-exaggerated by various government entities to circumvent the Bill of Rights and discourage the use of certain privacy-enabling technologies. If the dWeb only consisted of off-chain protocols, the dWeb would act as a Torrent network for websites and web applications and would certainly be a free-for-all for criminals. Again, ARISEN's blockchain protocol became the solution to this issue, through its builtin election/voting system and 21-member elected governance, which has the power through a 15/21 majority vote to reverse transactions (actions). Since dWeb network addresses are registered on ARISEN (see [DWEB Protocol](#DWEB) and domains, as well as dDNS records are controlled and stored on ARISEN (see [dDNS](#ddns)), the governance could halt the activity taking place on specific dWeb network addresses and domains, further protecting the network and dWeb's users from illegal and nefarious activity.

It became important, in our eyes, to create a reporting system using an ARISEN smart contract and integrate it with other contracts, like `dweb` and `arisen.wrap`, so that community members could report illegal activity and vote on its submissions to the governance for a `removal vote`. This gave way to the creation of dWeb's ratified [Constitution](#dweb-constitution), which governance members must abide by in the removal of illegal content. The Constitution protects free speech and many other human rights.

dWeb's off-chain protocols are incapable of providing this sort of solution, since it requires all of the solutions explained in #1 through #4.

It was essential that I started off the ARISEN section explaining why a blockchain protocol suite was needed, along with the differences between `on-chain protocols` and `off-chain protocols`. `On-chain protocols` provide a decentralized and trusted network that help bring to life the necessary facilities needed to allow for the development of web applications that provide end-to-end decentralization for their users, while also placing checks on the content that is distributed between peers via `off-chain protocols`. This bridge between both protocol types is what forms what we call the `dWeb`, hence the reason why we named the protocol that bridges the `off-chain` and `on-chain` networks the [DWEB Protocol](#dweb).

The sub-sections that follow explain the ins-and-outs of ARISEN and its underlying protocols, algorithms and features.

**NOTE:** If it is your view that #1 through #5 introduced too much too quickly, it is my view that many developers discourage the inclusion of blockchain in to many projects. I felt like it was appropriate to explain first, why the dWeb combined both  `on-chain` and `off-chain` protocols and second, why `off-chain` protocols were incapable of accomplishing what `on-chain` protocols can with exceptional simplicity and efficiency. If any of the previous section confused you, due to a lack of understanding of a `singleton computer` like ARISEN, all of what was explained in these sections is thoroughly detailed in subsequent sections.

#### The Global Computer
ARISEN can be described as a global computer, in other words, it's much more than just a blockchain. You can think of a blockchain as a bunch of protocols that form decentralized information exchange platforms. From a computer science perspective, ARISEN is a deterministic but practically unbounded state machine, consisting of a globally accessible singleton state, along with a globally distributed virtual machine (see [RSN VM](#rsn-vm)) which is designed to programmatically apply changes to ARISEN's overall state.

From a practical perspective, you could think of ARISEN as a massive, multiwriter dDatabase that forms a ledger that is written to by a trusted and elected network of computers that have the capability of executing application code which is ultimately stored within the ledger itself and subsequently used to update the ledger (the ARISEN state). This ledger is referred to as a "blockchain" in scientific terminology and is used to synchronize and store the system's state changes. A cryptocurrency known as RISE (RIX) is used to meter and charge for the cost of storing computed data on the ledger, to insure that ARISEN's global computer resources cannot be abused by bad actors.

#### Turing Completeness
The term "Turing Completeness" refers to the father of computer science, Alan Turing. When working with ARISEN, you will be lucky if you don't stumble across the terms "Turing Completeness" or "Turing Complete." In 1936, Turing created a mathematical model of a state machine that manipulated symbols by reading and writing them on sequential memory (meant to resemble an infinite-length paper tape). With this construct, Turing would then release a mathematical foundation to answer questions about universal computability; meaning, all problems are solvable. Turing ultimately proved that there are classes of problems that are incomputable.

In this model, Turing specifically provided the "halting problem," whether it was possible, given an arbitrary program and its inputs, to determine whether the program will ever stop running. Turing further defined a system to be "Turing Complete" if it can be used to simulate any Turing Machine. Such a system is called a "Universal Turing Machine" (UTM). ARISEN's ability to execute a stored program (smart contract) in a state machine (ARISEN's global computer), while reading and writing data to memory (ledger), makes it a Turing Complete system and therefore a UTM. ARISEN can compute algorithms that can be computed by an Turing Machine, given the limitations of finite memory.

Turing proved that you cannot predict whether a program will terminate by simulating it on a computer. In other words, we cannot predict what the true outcome of a program will be without running it. Turing Complete systems can run in infinite loops or in simpler terms, without a termination point. They say it's trivial to develop a program that runs in a loop that never ends (which I disagree with), but intended never-ending loops can arise without warning, due to the complex interactions between the starting conditions and the code. ARISEN cannot predict if a smart contract will terminate or how long it will run without actually running it. This means that smart contracts can be designed to purposely run forever, after a node attempts to validate them, so that they consume all of ARISEN's available network resources.

To attack this issue, `Singleton Computers` (such as Ethereum) introduced the `gas` metering mechanism, whereas the ARISEN network uses the `NET`, `CPU` and `RAM` metering mechanisms, discussed further in [Distributing Computing Resources](#distributed-computing-resources). ARISEN can account for every instruction (computation, data access). In order to execute contract-based transactions on the network, a user is required to have `NET`, `CPU` and `RAM` resources, so that infinitely-looping contracts can eventually be halted. `NET`, `CPU` and `RAM` can be acquired through the `staking` of RIX on the network.

#### Smart Contract Engine
When it is said that ARISEN is also a smart contract engine, it must be pointed out that much of ARISEN, like any other computer - distributed or not - gains its functionality from an underlying set of programs that are stored within it. I like to say that Bitcoin is also a distributed computer like ARISEN, but Bitcoin is limited to a single program that centers around the minting and validated transacting of Bitcoins. The entire state of the Bitcoin computer contains a current historical record of every transaction that has ever occurred from the moment it was started. ARISEN is capable of running an infinite number of programs (smart contracts) which can be compiled and published into ARISEN's memory (ledger). All of the functionality of Bitcoin (minting and validated transacting) of Bitcoins, is combined into a single program on ARISEN known as `arisen.token`, the only difference being that `arisen.token` allows the minting and issuance of an infinite number of currency types, while Bitcoin is limited to a single currency type.

Aside from the minting and validation of various token-types, it is important to note that all of ARISEN's core system features store all smart contracts that were used to boot up ARISEN and maintain its complex methods of constant operation. In the sub-sections that follow, I will explain the purpose of each of these core programs.

##### `arisen.bios`
-The `arisen.bios` contract is a minimalistic system contract that simply supplies the actions that are absolutely critical in the bootstrapping of an ARISEN-based blockchain.
-Introduces the data structure of ARISEN's [Block Header](#block-header), weighted permissions, weighted keys, blockchain authorities and the ABI (application binary interface) hash structure.
-Enables the following actions:
--Account creation using [Human-Readable Names](#human-readable-names).
--Update permissions and associated keys for a specific account.
--Delete account permissions.
--Assign specific actions from a specified contract to a specific account permission.
--Publish a smart contract on the ledger.
--Sets the ABI for a contract, identified by account name.
--Cancel a deferred transaction.
--Send error notification when an error occurs while executing a deferred transaction.
--Set privileged status for an account.
--Set resource limits of an account (RAM, NET and CPU).
--Set a new list of active block producers, by proposing a schedule change.
--Set blockchain's parameters.
--Check if an account has authorization to access a current action.
--Activate a protocol feature.
--Assert whether a protocol feature was activated.

##### `arisen.system`
-This contract defines the structure and actions needed for an ARISEN-based blockchain's core functionality. Some of the BIOS functionality can be found here, since the system contract largely takes over for the BIOS contract, after the chain has been bootstrapped.
-Introduces the constants for blocks per day, minimum amount of RAM to activate block production, annual rate of inflation (for native currency), the inflation pay factor, producer pay (percentage of inflation) and the time delay for refunds.
-Introduces the data structure for name bids, bid refunds, bids, global blockchain parameters, product details, voter info, delegated bandwidth and refund request.
-Enables the following actions:
--Init actions for initializing the system contract for a specific version and a symbol.
--`On Block` action for paying producers and calculating the missed blocks of other producers.
--Set RAM limits for an account.
--Set NET limits for an account.
--Set CPU limits for an account.
--Activate a protocol feature.
--Delegate bandwidth (NET) or CPU.
--Undelegate bandwidth.
--Buy RAM.
--Sell RAM.
--Refund pending, unstaked RIX after delegation period.
--Register block producer.
--Unregister block producer.
--Set RAM supply.
--Set RAM rate.
--Vote for a block producer.
--Register voting proxy.
--Set blockchain parameters.
--Claim block production rewards.
--Set privilege status for an account.
--Create name bid (auction).
--Bid name refund.

##### `arisen.token`
-The `arisen.token` contract defines the structure and actions that allow users to create, issue and manage cryptocurrencies on ARISEN-based blockchains.
-Introduces the data structure for account balances and currency statistics.
-Enables the following actions:
--Create a cryptocurrency.
--Issue a specific amount of coins.
--Transfer a cryptocurrency from one account to another.
--Get supply of a cryptocurrency.
--Get the balance of an account (for a specified cryptocurrency).

##### `arisen.wrap`
-Allows elected block producers to change an account (and domain's) keys, modify a contract, an account's owner and reverse any transaction, through the execution of an action that bypasses regular authorization checks. This can only be successfully executed by a majority (15/21) of the 21 elected block producers.

#### The Blockchain
It is the programs, aka smart contracts, that when executed, output data which is packaged into transactions, subsequently packaged into blocks and ultimately validated by nodes that are controlled by the network's elected block producers. This section will attempt to explain ARISEN's built-in blockchain from block headers and block production, to the consensus algorithms used to validate blocks, while still meeting ARISEN's rigorous performance requirements.

##### An Example Smart Contract

```c++
#include <arisen/arisen.hpp>

using namespace arisen;

class [[arisen::contract]] hello : public contract {
  public:
    using contract::contract;

    [[arisen::action]]
    void hi(name user) {
      require_auth(user);
      print("Hello, ", name{user});
    }
};
```

The execution of the above `hi` action is quite simple to understand. One would simply provide the `hi` action with a `user` of the `name` type (an ARISEN account). As long as the `user` can sign the action with a key that matches one of the public keys associated with their stored account on ARISEN, this action will output "hi, name" with the name of the executing user, will generate a transaction, and will eventually be validated within a block. As discussed in the previous section, ARISEN's core functionality is handled most by the `arisen.bios` and `arisen.system` contracts. As the computer runs, regardless of whether users are interacting with it or not, blocks are being produced by ARISEN's 21 block producers, every half second, in an attempt to capture the blockchain's state on a per half second basis.

What is not shown in the smart contract is how data is saved to ARISEN using contract-supplied data structure(s). Contracts can supply specific data structures and can initiate the creation of a database on ARISEN where the data that derives from the execution of an action is ultimately stored. For example, when executing the `newacct` action within the `arisen.system` contract, a valid account name and two public keys are submitted, and if accepted as valid, are stored in the `accounts` table. Other actions within other contracts can now lookup users via the `accounts` table and validate the digital signature accompanying the execution of actions, to see if it derived from the user executing the action.

Simply put, everything that happens on ARISEN, whether it's the creation of an account, a vote for a block producer, or even the uploading/activation of a new smart contract, are actions that are handled by various smart contracts that are stored within ARISEN's low-level block-based database structure according to their own data structure and logical database names. As confusing as that may sound, a smart contract does indeed enable the uploading and activation of other smart contracts that can be created by anyone on the network to such an extent the capabilities of the ARISEN computer itself. Just like an account or a vote for a block producer, newly published contracts have their own data structure and are stored in their own database as well.

Before any action or its outputted data can be stored in their specified formats, the data must be validated as having derived from the specified user, and is then packaged in a transaction and transmitted by the executing user to the network. A block producer then confirms this data, places it in a block and then cryptographically verifies the legitimacy of the block. Once a block has been validated, it is then stored in the blockchain. For ARISEN, the blockchain represents a gigantic database of transactions but if you dive a little deeper, each of these transactions represents a data entry that derived from a contract formatted in a specific data structure, each of which are intended to be organized in a sub-database with other entry types. This creates what amounts to a massive distributed database management system, with an infinite number of possible data collections, all of which derive their data from the executions of programs which are stored in that very same system.

Actions, in most instances, depend on data that derived from a past execution of the same action or a different action. Take the `hi` action for example. The `hi` action requires the `user` parameter, which is an account. Accounts only exist on ARISEN, because they can be created via the `newacct` actions in the `arisen.system` contract. When created, they use the `accounts` structure and are stored in the `accounts` database. The `hi` action uses another action from the `arisen.system` contract called `require_auth()`, which performs a lookup on the `accounts` table and authenticates a given user. All rocket science aside, one could make the argument that ARISEN is a dumb robot and only knows what a given action (or actions) allows it to know. Every single action builds upon the data that derives from other actions. As developers add programs to ARISEN, there are more actions and more data to manipulate. Like a [dDatabse](#ddatabase)), all of this data is immutable, unless of course a block producer majority chooses to remove specific portions of it.

##### The Block Header
The blockchain is a synchronized collection of blocks, each of which consist of a collection of transactions, with each transaction consisting of a collection of actions, from the period of time a block was produced. Each block has the following header:

| Field No. | Type | Description |
| --- | --- | --- |
| timestamp | uint32_t | Block timestamp of when block was produced |
| producer | name | Name of producer who validated block |
| confirmed | uint16_t | The amount of block confirmations |
| previous | checksum256 | Link to the previous block |
| transaction_mroot | checksum 256 | Link to the transaction's Merkle root |
| action_mroot | checksum 256 | Link to the action's Merkle root |
| scheduled_version | uint32_t | A schedule version |
| new_producers | producer_schedule | Producer's schedule |

Like any other blockchain, the block header allows one block to be linked to another, whereas within the block, a Merkle Tree is created of all transactions, another is created of all actions, and the block pointer (block hash) is a hash of the block header. Like with a dDatabase, the Merkle Tree hash and transactions within an ARISEN-based block efficiently summarize and verify the integrity of the transactions and actions that derive them. The `new_producers` field sets the elected producers and their schedule for the next block. Since ARISEN's election is conducted on a per-minute basis, and blocks are produced every 0.5 second, the producer roll and the producer schedule can change often. The ARISEN software, and therefore the producers themselves, follow the producer schedule on the previous block for the current block. In any blockchain, synchronization and scheduling is key, which brings me to consensus.

##### Consensus
ARISEN is based around the Delegated Proof of Stake (DPOS) algorithm, which dictates who is allowed to validate blocks on the network and who receives the delegated authority to make governance-based decisions on behalf of the network. DPOS, when compared to other consensus algorithms, is by far the best choice when it comes to meeting the performance requirements of a completely decentralized web.

A few facts about ARISEN'S rendition of the DPOS algorithm:
-Those who hold RIX coins may elect "block producers" (governance members) through a "continuous approval voting system."
-Any member (account) on ARISEN can become a "block producer" candidate and can gain the vested power of a governance member, as long as they're in the top 21 candidates.
-ARISEN's blockchain produces blocks every 0.5 second and only one block producer has the authority to produce a single block.
-If a particular block is not produced at a scheduled time, then the block for that time slot is skipped.
-When one or more blocks are skipped, there is a 0.5 second or more gap in the blockchain.
-Blocks on ARISEN are produced in rounds of 126 (6 blocks each, multiplied by 21 block producers).
-21 block producers are chosen through the votes casted by members of the network at the start of each round.
-The 21 selected block producers are then scheduled to verify blocks within that specific round, in an order agreed to by 15 of the 21 block producers.
-If a particular block producer "misses" a block, or has not produced a block within the previous 24 hour period, they are removed from the governance and must inform the blockchain that they're ready to be a candidate once again. The performance and reliability of the blockchain depends on perfected network operations, where only provably reliable blocker producers are in position to keep the network running properly.
-Block producers do not compete for blocks, rather they work collectively to validate a round of blocks. Typically, this keeps the blockchain from experiencing forks.
-If the blockchain does experience a fork, the algorithm automatically switches to the "longest chain." In other words, the longest chain relates to the chain with the most blocks, which means it has produced the most blocks, which also means it has a higher percentage of block producers who prefer that particular chain and have ultimately reached consensus around it. This works because a fork of ARISEN with more block producers will be longer than other forks and will grow in length much faster, due to it missing fewer blocks.
-Block producers caught producing blocks on two forks at the same time will likely be voted out, which can be backed by cryptographic evidence as well.

###### Byzantine Fault Tolerance (BFT)
BFT stands for Byzantine Fault Tolerance, which prevents a block producer from signing two blocks with the same timestamp or the same block height. With BFT, once 15 block producers have signed a block, that block is deemed irreversible. Any block producer under this model could in fact produce two blocks with the same timestamp or block height, but will create cryptographic evidence of their "treason." By using BFT, an irreversible consensus is typically reached within 1 second.

###### Transaction Confirmation
DPOS blockchains like ARISEN, typically have 100% block producer participation. Within a quarter of a second, transactions are considered confirmed 99.99% of the time. All EOS.IO-based blockchains like ARISEN, have the added luxury of utilizing an aBFT (asynchronous Byzantine Fault Tolerance) for faster achievement of irreversibility. The aBFT algorithm provides 100% irreversibility within a single second.

###### Transaction as Proof of Stake (TaPOS)
ARISEN requires every transaction to include part of the hash of a recent block header. This hash serves two purposes:
-1. Prevents a replay of a transaction on forks that do not include the reference block.
-2. Signals the network that a particular user and their stake are on a specific fork.

Over time, all users end up directly confirming the blockchain which makes it difficult to forge counterfeit chains, as the counterfeit chains would not be able to migrate transactions from the legitimate chain.

#### Accounts, Authentication and User Permissions
In previous sections, I explained how ARISEN's account and user management systems were formed via the actions and data structures within the `arisen.system` contract. Without accounts, no other action within ARISEN contracts, including those within the system contract, would function since they all require account-based authentication. With that in mind, accounts and ARISEN's authentication protocols are single-handedly the most important feature because without them, nothing you're reading in this paper would be possible.

A few facts about accounts:
-Accounts on ARISEN, unlike many other blockchains, are unique "human-readable names" that must be 12 characters in length.
-Users choose their username when creating an account.
-A new account can only be created by an existing account, due to the fact that any action-generated data stored on ARISEN requires a certain amount of RAM to be staked by the user initiating the action. RAM is like disk storage on ARISEN and is needed to write to the blockchain's memory database for any action that results in stored data in memory, including the create account (newacct) action.
-This gives way to account creation services that charge a service fee, or ones that simply sponsor account creation, like [PeepsID](https://signup.peepsid.com).

When it comes to decentralized applications, application developers will pay a small cost for account creation to signup new users but the cost is nominal when compared to the costs needed to acquire new users via advertising or free services, etc. The greatest feature in relation to this model is that once a user has created an account on an ARISEN-integrated dApp, that same account can be used to log in to other ARISEN-integrated dApps. This means that only one app covers the cost and therefore application developers don't have to pay for the creation of every account of their users.

Names less than 12 characters are considered premium names and must be won at auction.

A few facts about premium names:
-Can be any number of characters (a-z, A-Z, 0-5).
-Must be won at auction. Any user can start an auction for a name and must be the highest bidder after 72 hours.
-Once won, other accounts can be created as sub accounts of the premium name, which must include a period (.). For example: `jared.rice`, in this case `rice` is the premium name.

##### Public Key Cryptography & ECDSA
While cryptography has been around for ages and public key cryptography since the 1960s, its use in blockchains has revolutionized how users are able to authenticate with blockchain-integrated web apps. The blockchain acts as a `Public Key Authority`, where any account's public key can be openly found on the blockchain itself, by anyone in the general public. This way, a user can `sign` anything (e.g., an action transaction) and the blockchain (or anyone for that matter) using `Elliptical Curve Digital Signature Algorithm` (ECDSA) can decipher that the owner of the private key, related to to the public key, was the creator of the digital signature.

ARISEN accounts, when created, require two permission levels, both of which have unique public keys associated with them. These permission levels are known as `owner` and `active`. Actions within ARISEN contracts each require the executing user to authenticate themselves using a specific permission level; in other words, the action must be signed with the private key that was used to derive the public key associated with the permission level selected for action-based authentication.

A few facts about ARISEN keypairs:
-Public keys start with the `RSN` prefix.
-Private keys are seeded with 128 random bits.
-Private keys start with the number `5`.

##### Role-Based Permissions Management
ARISEN uses a "role-based permissions management" system to determine if account-based actions are authorized. ARISEN's software provides a "declarative permissions management system" that gives accounts high-level control over who can do what and when. It is critical that authentication and permission management be standardized and separated from the business logic of an application, which enables the development of tools that manage permissions, generally, while also giving way to a significant boost in performance. An account can be controlled by multiple other accounts at once. Each one of these "controlling accounts" can have different weighted permissions, so that accounts have "multi-user control."

Every account can be controlled by any weighted combination of other accounts and private keys. This ultimately forms a hierarchical authority structure that reflects how permissions are organized and makes multi-user control easier than ever. Multi-user control is the single biggest contributor to security and when used properly, can greatly reduce the risk of theft due to hacking. ARISEN allows accounts to decide which keys and other accounts are allowed to send a particular action type to another account. For example, it's possible to have one key for a user's social media account and another for access to a ride sharing account. You could also give one account the ability to act on behalf of another account, without assigning a single key.

##### Vanity Permission Levels
ARISEN accounts are capable of creating "vanity permissions levels" whose origins are that of higher-level vanity permissions. Each vanity permission, or VPL, must define an "authority." Authorities on ARISEN are essentially "multi-signature threshold checks" that are comprised of keys and/or VPLs of other ARISEN accounts. For example, as ARISEN account could have a VPL known as "friend" that could be correlated to a specific "Action" on the account, and could be mutually controlled by any of the account's friends. The Steem blockchain (home of the Steemit social network) has three hard-coded VPLs known as `owner`, `active` and `posting`, where the `active` VPL can do anything but change the `owner` permission's key, which is the most powerful authority on the account and the `posting` permission can only perform social actions like voting and posting. ARISEN allows accounts to create their own custom-named (vanity) permission levels, by allowing account holders to define their own hierarchy of permissions, as well as a customized group of actions.

##### Permission Mapping
With ARISEN, each account is able to outline a specific "mapping" between a contract/action or contract of any other ARISEN account and their own VPL. A user, using a social media app, could "Map" his/her social media app to the "friend" VPL. This would allow his/her friends to post on behalf of this user to his/her social media page. While the friend's post still appears as the account holder, they would still be identified by their keys that were used to sign the "Action," therefore you could easily identify users who are abusing their permissions.

##### Evaluating Permission Levels
If a VPL is used, which doesn't exist, the "active" DPL is automatically used to authorize an "Action." Once a mapping is determined, the signing authority is validated using the threshold multi-signature process as well as the authority associated with the VPL. If this is unsuccessful, it traverses up to the `active` DPL and ultimately the `owner` permission.

##### Parallel Evaluation of Permissions
The process behind the permission evaluation process is immutable, where transactions based around the change of permissions are not completed until the end of a block, so that all key/permission evaluations for every transaction can be completed in parallel. The quick validation of permissions is possible without costly contract executions that would ultimately be rolled back, and transaction permissions can be evaluated as pending transactions are received so they don't need to be re-evaluated when they're confirmed. Parallelizing the permissions process, while making it "read-only," dramatically increased performance on the network, because of the significant percentage of computation that is required to validate permission-based actions. To add to this, when "replaying" the blockchain from a log of actions, the permissions do not need to be reevaluated. This also significantly lowers the computational load brought by the replaying of a constantly growing blockchain.

##### Stolen Key Recovery
ARISEN allows users to restore control of their account when their keys are stolen. An account owner can use the stolen `owner` key along with approval of a designated `account recovery partner`. It is important to note, that the account recovery partner cannot reset control of the account without the help of the user that possesses the `owner` key for the stolen account. Even if a hacker went through this process, it would be pointless due to the fact they they already control the account; although, even if the hacker did go through this process, the `account recovery partner` would probably demand some sort of multi-factor authentication; that is, if the account recovery partner is a dApp itself. A recovery partner has no authority over day-to-day transactions; rather, the recovery partner is only a "party" to the recovery process. This will ultimately reduce legal liabilities, costs, and lost currency that would otherwise be unrecoverable on blockchains that lack this feature.

#### Universal Authentication Layer & Transport
While public key cryptography is by far one of the most secure forms of authentication in the world, the process of securely managing one's private keys can be cumbersome and can introduce many security risks. As was mentioned in [Role-Based Permission Management](##role-based-permission-management), ARISEN gives way to the development of tools for the management of accounts and permissions, and if developed correctly, can greatly simplify the management of private keys and greatly reduce, if not eliminate, the security threats surrounding the management of private keys. Although, this is only half the problem.

dWeb-based apps that are integrated with ARISEN would require their users to copy and paste a 64-character private key when logging in, and each and every time they execute a specific action within an application (e.g., the `post` action within a social networking app). Just so one can build a mental model surrounding how this process works on the dWeb, try to follow the following description:

-1. A developer writes a simple application that allows someone to post a message to the page. The app itself is written in JavaScript and HTML and utilizes ARISEN's [JavaScript Library](https://github.com/arisenio/arisenjsv1) for executing contract-based actions via ARISEN's API.

-2. The developer writes a simple smart contract called "postit" with a `post` action, that requires an ARISEN account to authenticate using their `active` permission when submitting the action's `message` parameters. The developer deploys the "postit" contract to ARISEN and publishes his app files in a dDrive and announces on the dWeb.

-3. There is a "Post" button in the application, that when clicked brings up a popup that asks for the account username, the `active` private key and the message being posted. When the "send" button is pushed, the app then packages the `post` action with the entered message, along with a digital signature created with the entered private key, and transmits this action to ARISEN so that the `post` action can be executed.

-4. Once executed and validated, it is stored on ARISEN, where the app can now retrieve this data and display on the page.

This is a horrible user experience, even though the user was using a secure account/permission management software, the eventual exposing of the private key in the browser eliminated all of the security advantages provided by the key management software in the first place. This problem was solved by authentication apps like MetaMask and Scatter, which apps can use to communicate with the Ethereum and EOS blockchains. Using MetaMask and Scatter, the process goes like this:

-1. Instead of a "Post" button, there is a "Login" button. Bob clicks the "Login" button and the MetaMask app comes up, where Bob is asked to choose an account (and permission level) and enter a password.

-2. Bob is brought back to the app where he now see a "Post" button.

-3. Bob clicks "Post" and a popup appears with only a "Message" box.

-4. Bob enters the message and clicks "Send."

-5. The app then packages the `post` action with the entered message and the "logged-in" user via step 1 (note: there isn't an actual session, the app simply remembers which account/permission was chosen), along with the corresponding permission to MetaMask.

-6. The MetaMask app pops up, showing the packaged action and which user/permission is packaged with the action as the executor.

7. Once Bob clicks "Execute," Bob enters a password (for MetaMask) and MetaMask signs the action with the private key matching Bob's chosen account/permission level and the transaction is sent to ARISEN for confirmation and eventual inclusion into a future block.

**NOTE:** Authenticators like MetaMask use a password to encrypt the private keys it stores, so that when a user wishes to sign an action, or complete a transaction for that matter, the private key is decrypted with the entered password, used to sign the transaction and MetaMask subsequently removes the decrypted key from the temporary memory or off-line storage. The password is never saved.

This definitely made the process far more secure since Bob's private key was never revealed, but the user experience went from 4 very unsecure steps to 7 very secure steps and requires way too many back and forth interactions with the authenticator application (MetaMask). It was a major reason for the creation of ARISEN's Authentication Transport Protocol and what we refer to as the "Universal Authentication Layer."

##### Simplifying Authentication & Authenticators
As was seen in the previous section, there are many authenticator apps, each of which use their own protocol for transporting action data between apps and the authenticator itself. A simplified transport protocol would eliminate many steps in the authentication process, while also making the authentication process with decentralized applications even simpler than the authentication process with centralized web applications. The authenticator discussed in the previous section was for other blockchains, but hopefully helped expose the issues most decentralized applications face when it comes to user experience. The following sub-sections will discuss how various ARISEN protocols, tools and features have helped simplify the authentication process for dWeb-based applications.

###### Human-Readable Names
Unlike most blockchains that use 64-character (or more) hexadecimal addresses for "account addresses," ARISEN associates a username that is `human-readable` with a set of permissions, each of which is associated with a unique public key.

The use of `human-readable` usernames - rather than computer-generated hexadecimal or byte-formatted addresses - means that we're able to further simplify the authentication onboarding, and app-to-authenticator / authenticator-to-app request and response transport lifecycle, and the overall authentication transport process.

###### Universal Authentication Layer
The goal of ARISEN's `Universal Authentication Layer` is to bring to life a universal means for authenticating users, by standardizing the transport between dWeb-based applications and ARISEN-integrated authenticators via a universal bridge, which makes the authentication process between authenticators seem identical, regardless of how the underlying authenticator is designed. Put another way, it provides a UI layer for giving users a consistent UI/UX flow, independent of the authenticator they are using or the website they're on.

The Universal Authentication Layer brings to life support for Biometric Hardware Secured Keys (e.g., Apple Secure Enclave), and a way for insuring a user is completely aware of the app they're using, as well as the related smart contract they're executing an action within.

The Universal Authentication Layer involves the following components:
-[Chain Manifest Specification](#chain-manifest-specification)
-[Ricardian Specification](#ricardian-specification)
-[Authentication Transport Protocol](#authentication-transport-protocol)
-[Universal Authentication Library](#universal-authentication-library)

###### Chain Manifest Specification
An `off-chain manifest`, or manifests, is metadata about an application that is displayed in the root of a [dDrive](#ddrive). The location of these files, along with their checkout hash, is referenced in the smart contract that is utilized by the app in what is referred to as an `on-chain manifest`.

Both `off-chain manifest` files are contained in the `chain_manifests.json` and `app-metadata.json` files within the root of a dDrive. The `app-metadata.json` file contains the following fields:

-`spec_version` - The specification version of the `chain manifest`.
-`name` - The full name of the application. This will be user-facing in app listings, history, etc.
-`shortname` - A shorter name for the application.
-`scope` - An absolute path relative to the application's root. (`/` or `/app`, but not `../`).
- `apphome` - Tells the browser where your application should start when it is launched. This must fall within the `scope`.
-`icon` - An HTTPS url, DWEB url or absolute path relative to the application's root, followed by a SHA-256 checksum hash. May be displayed in app listings, history, favorites, etc. (.e.g, `dweb://dsocial.dcom/icon.png#SHA256HASH` or `/icon.png#SHA256HASH`, but not `../icon.png#SHA256HASH`).
-`appIdentifiers` (optional) - For native applications, an array of whitelisted app identifiers (e.g., bundled identifiers for iOS apps or package names for Android apps).
-`description` (optional) - A paragraph about your application. May be displayed in app listings, etc.
-`sslfingerprint` (optional) - Your app domain's SSL SHA-256 fingerprint as a hex string. If present, the user agent may check that the SSL fingerprint of the domain submitting the transaction matches that in the provided manifest.
-`chains` - An array containing the `chainID`, `chainName` and `icon` for any ARISEN chain for which your application's smart contract is located on and therefore, where your application plans to require signing. User agents (like an authenticator) will use this for presenting a friendly chain name and icon to the user when prompted for signing.

An `on-chain manifest` must then be registered using the [arisen.assert::add.manifest](https://github.com/ARISENIO/arisen.assert) action on every ARISEN chain where smart contracts for an app exist and on which an app will transact. Furthermore, an array of `chain manifests` must be declared in a publicly available JSON file at the root of the application's `declaredDomain` See [Authentication Transport](#authentication-transport-protocol) for the `declaredDomain` parameter, which must match the domain referenced in the `off-chain manifest`.

The `chain-manifests.json` file has the following fields:
-`account` - The chain account name. This is the account that published this `on-chain manifest`.
-`domain` - The uri or bundle identifier.
-`appmeta` - The DWEB or HTTP address of the application's metadata JSON file and its hash. Must be an absolute path.
-`whitelist` - An array containing the `contract` and `action` for each allowed contract action(s) that your app can propose.
--The `contract` and/or `action` fields within the `whitelist` on the manifest may contain a wildcard. Wildcards are denoted by " " (empty string).

For a more detailed description of Chain Manifests, please read the full specification [here](https://github.com/ARISENIO/manifest-spec).

###### Ricardian Specification
The Ricardian Specification gives a set of the human-readable requirements (that a smart contract should follow in order to be considered valid) and easily consumable metadata about the actions a contract contains (action title, description and a URL of an icon that describes an action; for example, a pencil icon for the `post` action described earlier in this section). Ricardian Metadata is written in HTML (in .html file(s) separate from the contract code itself) and combined with the contract code in a WASM compiled output format by ARISEN's smart contract compiler. Once deployed to an ARISEN blockchain, it can easily be viewed in an ABI (application binary interface) format (similar to JSON).

For a deeper drive into ARISEN's Ricardian Specification, please refer to the latest version of the spec [here](https://github.com/ARISENIO/ricardian-spec).

###### Authentication Transport Protocol
ARISEN Authentication Transport Protocol (AATP) provides a protocol that ARISEN-based authenticators, like [dWebID](#dwebid), can utilize to respond to requests from dWeb-based apps, with consistent handling logic in a request-response lifecycle. It aims to improve the user's overall experience and security when authenticating and signing actions that derive from dWeb-based websites and apps.

Below is an explanation of how an authenticator like [dWebID](#dwebid) uses AATP, Chain Manifests and Ricardian-compliant contracts in the process of authenticating a user.

###### `Request Transports`
A dWeb application can use either a dWebID Link, dWeb Link, Apple Universal Link or a Deep Link to invoke an authenticator application, including the transaction payload in the query string as a hex-encoded value, and the recipient public key, if the payload is encrypted.

-`dwebid://request?payload={hexPayload}&Key={publicKey}`
-`{customProtocol}://request?payload={hexPayload}&Key={publicKey}`
-`dweb://{siteUrl}/auth?payload={hexPayload}&Key={publicKey}`
-`https://{siteUrl}/auth?payload={hexPayload}&Key={publicKey}`

###### `Response Transports`
Authenticator applications will return a response to the request's `returnUrl` with the payload appended as a hex-encoded URL hash fragment identifier. If the payload is encrypted, the public key is provided at the end, preceded by `-`.

-`dweb://{siteUrl}/some-resource/resource-id#{hexPayload}-{publicKey}`
-`https://{siteUrl}/some-resource/resource-id#{hexPayload}-{publicKey}`
-`{customProtocol}://transaction-response#{hexPayload}-{publicKey}`

###### `Request Envelope`
The top-level properties of each request payload make up the `request envelope`. Envelopes may contain several keys:

-`version` (required) - The protocol version.

-`id` (required) - The unique UUIDv4 of the request, which insures that the requesting application is able to connect a response to the initial request.

-`declaredDomain` (required) - Integrating applications (both web and native) must self-report a `declaredDomain`. Authenticator applications should not blindly trust this URL.

-`returnURL` (required) - The URL to which the authenticator application will return the user after the request has been processed and the user had taken any necessary action.

-`responseKey` (optional) - An elliptic curve 65 byte public key. If provided, the response will be encrypted with this key using the agreed upon algorithm.

-`request` (required) - The request payload, consisting of one or more request types.

###### `Request/Response Types & Authenticator Behavior`
There are four different types of request, each of which have different payloads. Those requests, the behavior of an authenticator app and each response type are explained below:

-`Transport Authorization Response` - This request must include the preferred response transport (e.g., dWeb Link, Custom Protocol, etc.) as well as an array of contracts and their associated actions involved in the request.

This request type carries out two functions:
--1. It negotiates and establishes communication with an authenticator application over one or more transports.
--2. It requests user authorization for the transaction actions that may be requested through each transport. The idea here is that integrating applications or users may restrict which actions are authorized over less secure transports.

**This is an example Request/Response lifecycle for a `Transport Authorization Request`:**
-1. The request must include a prioritized list of app-supported response transports and a list of requested action permissions for each response transport, which must be white-listed in the `on-chain manifest`. The request may be sent with one or more `Selective Disclosure` or `Authentication` request types.
-2. Upon the authenticator app receiving the request, it will prompt a user for approval if this is the first time encountering this `Transport Authorization Request` for the given `chain manifest`. The authenticator may respond automatically if the user has previously approved an identical `Transport Authorization Request` for the given `chain manifest`.
-3. A `Transport Authorization Response` sent from the authenticator app back to an application must include a prioritized list of vault-supported request transports and vault-supported response transports, and MAY be sent through one of the app-supported response transports.

-`Authentication Request` - This request type allows an integrated dWeb-based application to request proof of a user's possession of one or more private keys corresponding to any public keys that they have disclosed. This enabled passwordless authentication flows so that integrating applications can display private data to the authenticated user.

-`Selective Disclosure Request` - Allows an app to request private user data (e.g., availableKeys, authorizers).

**This is an example Request/Response lifecycle for a `Selective Disclosure Request`:**
-1. The request must include one or more requested attributes (e.g., availableKeys).
-2. The authenticator app must prompt the user to approve any disclosures they have not previously approved for an identical `Selective Disclosure Request`. It may respond automatically if the user has previously approved an identical `Selective Disclosure Request` for the `chainmanifest` `scope`.

-`Transport Request` - Allows a dWeb-based application to request a user signature for a transaction. In this case, the authenticator application must:
-1. REJECT the transaction request automatically if the transaction contains any actions not whitelisted in the app's `chainmanifest` for a given ARISEN chain.
-2. REJECT the transaction request automatically if the transaction contains any actions that have not been allowed by a previous `Transport Authorization Request` for the given transport.
-3. PROMPT the user for permission to sign if the transaction contains any actions that have not been allowed by a previous Action Permission Request, without autosign privileges. This prompt may be ignored and a `Transaction Request` may be approved automatically if the transaction contains only actions that have been allowed by a previous `Action Permission Request` with autosign privileges.

##### The ARISEN Authentication Process
Below is a description of the simplified authentication process for dWeb-based apps that utilize an AATP-ready authenticator:

-1. Bob opens the post app again at `dweb://postit.dcom` in his mobile Safari browser.
-2. Bob downloads dWebID, an AATP-ready authenticator for iOS.
-3. The PostIt app asks Bob to create an account. He chooses a username and his `owner` and `active` keys are automatically imported into [dWebID](#dwebid) using its builtin import API, and both keys are securely stored on the device's `Secure Enclave` chip.
-4. Bob sees a "Login" button and clicks it. Upon clicking the login button, a `Transport Request`, along with a `Selective Disclosure Request` is sent to the dWebID mobile application using the `dwebid://` protocol.
-5. dWebID opens and performs the following checks immediately in the background:
--assert that the `referrerUrl` and `reuturnUrl` are all paths of the `declaredDomain`.
--fetches the `chain-manifests.json` file from the root of the `declaredDomain`.
--asserts that the values for `domain` declared therein all match one another and the `declaredDomain`.
--fetches the `app-metadata.json` from the `appMeta` URL in the `chain-manifests.json` file and asserts that the file's hash matches the hash declared in both manifests.
--asserts that the file's hash matches the hash declared in the `on-chain manifest`.
-6.  If all checks pass, dWebID shows a screen that takes on the following format:

```
Allow <appname> to log in
using dWebID?

<app-icon>

Domain Requesting:
<app-url> (request URL)

<Deny Button> <Allow Button>
```
The above data is retrieved from the `chain-manifests.json` and `app-metadata.json` chain manifest files in the root of the app's dDrive.

-7. dWebID asks Bob which account he would like to disclose with PostIt. Bob selects the @bob account and dWebID sends a `Selective Disclosure Request` with the public key for @bob back to PostIt.
-8. Bob is returned back to the PostIt app in Safari, where he now sees a "Post" button.
-9. Bob clicks "Post," which brings up a popup where he can type a message.
-10. Upon clicking "send," the `post` action related to PostIt app's smart contract on ARISEN is packaged in a `Transaction Request` and sent to dWebID.
-11. The dWebID is opened automatically and a `Transaction Approval Request` screen is shown that takes on the following format:
```
<app icon> <app domain>
                 <app url>
--
<action icon> <action name>
<action description>
<action clause>

Signing as <username> on <chain name>
--
<Cancel Button> <Approve Button>
```
The above app icon, app domain and app url derive from the website's `chain-manifests.json` and the `app-manifests.json` file within the app's dDrive, while the action icon, action name, action description and action contract clause derive from the Ricardian metadata stored alongside the app's smart contract on a specified ARISEN chain.

-12. Bob clicks "Allow" and is prompted for biometric confirmation (face or fingerprint).
-13. Once Bob is biometrically authenticated, the transaction is signed with the keys from the Secure Enclave.
-14. The transaction and signatures will be returned to the requesting app, which may, in turn, broadcast the transaction to the chain (NOTE: dWebID broadcasts by default).
-15. Bob is returned to the PostIt app, which can now retrieve Bob's post remotely from the `postit` database on ARISEN and displays the posted message to Bob and other users.

In the future, any time Bob accesses the PostIt app and initiates the `post` action, Bob is only asked to verify himself biometrically. Bob's entire experience with PostIt is now passwordless and extremely secure.

Keep in mind, Bob probably has no idea he's using a blockchain, nor does he ever see his cryptographic keys. All he ever sees are user-friendly, human-readable prompts and is only prompted twice. Once when he first logs into the app and second, the first time he initiates an action. He is only prompted again when an action is initiated and a `Transaction Request` is sent and he needs to verify his biometrics. ARISEN's Universal Authentication Layer allows dWeb-based apps to simplify their authentication process with ARISEN and allows everyday users of the Internet to experience the power of decentralized apps without any complexities.

##### dWebID
At PeepsLabs, we're developing the dWeb's first authenticator using AATP which can be used as a means for decentralized and universal authentication on the dWeb.

dWebID has the following features:
-Enables seamless, multi-network support. In fact, the app itself does not even communicate with chains or nodes directly.
-Securely stores private keys and employs the use of biometrics to sign transactions.
-Displays richly formatted Ricardian Contracts, which provide users with a human-readable explanation of the actions the app is proposing and allows users to approve or reject the terms of the contract(s).
-By following the `Manifest Specification`, it displays metadata about the requesting application to end users any time they are prompted to trust an app or sign a transaction from one. This provides users with an improved sense of trust in the requesting application and the signing ceremony itself. It also runs pre-flight security checks, comparing the contents of a transaction request with what integrating apps have declared about themselves.

#### Smart Contracts & RSN VM
In previous sections, I described out how Smart Contracts power the entire ARISEN computer, but it is the computer itself I have yet to explain. Blockchain-based programs must be compiled, validated and computed; and are entirely dependent upon single-threaded performance, fast compilation and validation of assembly code, as well as the low-overhead calls to native bytecode. ARISEN contracts are for the most part, written in C++, a low-level programming language also known as a systems programming language, whose most pervasive uses are deep in the infrastructure [STRO13]. The language's focus on static types and compile-time type checking help give way to the secure execution of programs (contracts) and help to eliminate the threat of stack overflow attacks, discussed subsequently. ARISEN ships with its own compilers, like [ARISEN CDT](https://github.com/arisenio/arisen.cdt), which compile C++-based contracts into the WebAssembly (WASM) assembly language, a programming language that is one step away from machine language (bytecode), allowing each instruction to be translated into one machine instruction by an assembler [STALL16].

RSN VM, a fork of EOS VM, is a high performance WASM engine with predictable compile times, where contracts do no have to be compiled every time the process restarts. Unlike more popular WASM engines, RSN VM is designed from the ground up for the rigorous demands of blockchain applications, which require far more from a WASM engine than those that were designed for web browsers or standards development.

When it comes to smart contracts, it's a blockchain's lifeline to insure that any non-deterministic behavior, unbounded computations or unbounded use of RAM be prevented, as it can bring down an entire blockchain in seconds. As discussed in [Turing Completeness](#turing-completeness) and [Distributed Computing Resources](#distributed-computing-resources), RSN VM uses a builtin metering mechanism to avoid some of these issues, but at even lower-levels, other issues remain.

The RSN VM has no physical existence. It is a distributed and virtual computation engine, and is not hugely dissimilar to the virtual machines of Microsoft's .NET framework, or interpreters of other bytecode-compiled programming languages such as Java. RSN VM, at a basic level, is in charge of both smart contract deployment and smart contract execution. At a high-level, it is essentially a global, decentralized computer, containing millions of executable objects, each of which utilizes its own data store. Furthermore, RSN VM, in one way or another, is a Turing-complete state machine because every single execution process is limited to a certain amount of computations and completely dependent on the CPU, NET and RAM that's available to the user who is initiating the execution.

RSN VM was designed with the goal of creating a highly deterministic and secure environment for the parallel execution of contracts. Given what derives from the execution of a contract must be deterministic - and the non-deterministic nature of denormals, NaNs and rounding modes as it relates to floating-point arithmetic, in addition to the underlying physical computer's ALU - RSN VM relies on the `softfloat` implementation of IEEE-754 float-point arithmetic, which is even further constrained to insure determinism. To add to that, secondary limits and constraints such as stack size and call depth can cause consensus failures if they differ from a previous backend, which is solved through RSN VM's user-definable constraints at either compile-time or run-time. User-definable constraints are defined based on use-case and the data-type involved.

While deterministic execution is crucial, time-bounded execution is just as important when it comes to a blockchain-based computer, in order to insure that the deterministic execution of a contract doesn't "over run" the CPU time that is allotted for a given contract. Since blockchains are limited in resources, an `instruction counter`, at a very minimum, is needed to insure the time-bounded execution of a contract. RSN VM allows users to use a simple instruction counter for counter-based time-bounding in a single-threaded environment, but can be avoided by using a `watchdog timer` that doesn't introduce any performance overhead like the latter option.

Even more important is the secure execution of contracts. RSN VM was designed to avoid unbounded memory allocation, extremely long load times, and stack overflows deriving from a syntax analysis (like recursive descent parsing or execution), thanks to a type system that was prebuilt from the onset to insure RSN VM's foundational data types were invariant (exact type matching, where `T = T`). This insures developers don't have to worry about explicit type checks and validations since RSN VM's underlying type system insures that each data type maintains these invariants and kills the execution of a contract that violates this integrated invariance. Given the problems that can occur in C++ with unsafe arrays and pointer references, there have been a number of proposals to augment compilers to automatically insert range checks on such references [STALL18].

RSN VM has special purpose allocators that utilize the security of the physical CPU and the underlying operating system that RSN VM exists upon, to insure that a contract is not able to store data beyond the limits of a fixed-size buffer or attempt to overwrite adjacent memory locations that may hold other variables, parameters or control flow data from the contract itself, which could contain return addresses and pointers to previous stack frames. Buffer overflow attacks are one of the most dangerous and popular forms of security attacks and a guard paging mechanism, via the core OS, is used so that memory is properly sandboxed.

There is never a point where, during either the parsing or evaluation phases, RSN VM uses unbounded recursion or loops. RSN VM is constrained to limit or eliminate the ability for a bad or corrupt contract to cause a crash or infinitely hang the machine. It's custom allocators and memory management facilities that allow for different access patterns and allocation requirements. RSN VM's allocators are used to back the core data types (fast vector, WASM stack, fast variant and WASM module) and, as such, do not "own" the memory that they use for operations. This gives way to maximizing the performance of the interpreter implementation.

These non-owning data structures allow for the ability to use the memory cleanly, while not having to concern the data type with destructing when going out of scope, which creates a performance increase for portions of RSN VM, without loss of generality for the developer. Since the data is held by these allocators and has lifetimes that match that of a WASM module, no copies of these heavy weight data types are ever needed. Once an element in an RSN VM is constructed, that is its home and final resting place for the lifetime of the WASM module.

##### Contract Storage & On-Chain Databases
As you may recall, a smart contract itself (`arisen.system`) and its `set` action are used to deploy other contracts to the network and subsequently store the WASM-derived bytecode in an on-chain database associated with the uploading user. The contract itself has its own database associated with it, where the data that derives from the execution of its actions is stored. Although, each account on ARISEN has its own private on-chain database associated with it, for which contracts can optionally choose to store action-derived data via a contract-specific scope.

On-chain databases associated with accounts can only be accessed by its own action handlers. Action handlers are scripts that send actions from one account to another. ARISEN is able to define smart contracts through the combination of action handlers and automated action handlers. Each account can ultimately send structured actions to other accounts and may define scripts to handle actions when they're received. To support parallel execution, each ARISEN account can also define any number of scopes within their database. The block producer will schedule transactions in such a way that there is no conflict over memory access to scope and therefore can be executed in parallel.

As an example, dWeb's [dDNS](#ddns) contract stores domain records within a scope named `ddnsrecords` within each domain's on-chain private database (considering domains in the context of ARISEN are actually accounts), so that records serve as a unique, searchable index for each domain.

##### Deterministic Parallel Execution of Appliances [BLOC18]
RSN VM has no scheduling capabilities, because execution ordering is handled externally by ARISEN clients. ARISEN has to execute transactions (transactions derive from the execution of an action), considering its consensus algorithm is dependent upon deterministic (reproducible) behavior, which means all parallel execution must remain without mutexes or locking primitives. When transactions are executed in parallel, it's important that these transactions don't create non-deterministic results, considering the absence of locks.

When ARISEN's mainnet begins producing in parallel, block producers will organize action delivery into individual `shards` in order to evaluate transactions in parallel. The scheduling of transactions will be deterministically executed according to the output of a block producer, although the protocol for the generation of transaction scheduling will not be deterministic. Because of this, block producers can take advantage of parallel algorithms to schedule transactions.

With parallel execution, it's important to note that when a new action is generated by a "script" or "contract," it does not get delivered instantly; rather, it's scheduled to be delivered in the next cycle because the receiver may be actively modifying its own state within a completely different shard.

##### Minimizing Communication Latency [BLOC18]
Latency is the time it takes for one account to send an action to another account, and then receive a response. The goal is to enable two accounts to exchange actions back and forth within a single block, without having to wait 0.5 second between each action (ARISEN's block production turnaround time). To enable this, ARISEN divides each block into cycles. Each cycle is divided into shards and each shard contains a list of transactions. Each transaction contains a set of actions to be delivered.

Below is a pseudo-representation of a block's layers and how each layer is processed:
```
Block
    Region
        Cycles (sequential)
            Shards (parallel)
                Transactions (sequential)
                    Receiver and Notified Accounts (parallel)
```

Transactions generated in one cycle can be divided in any subsequent cycle or block. Block producers will keep adding cycles to a block until the maximum wall clock time has passed, or there are no new generated transactions to deliver.

It is possible to use static analysis of a block to verify that within a given cycle, no two shards contain transactions that modify the same account. So long as that invariant is maintained, a block can be processed by running all shards in parallel.

##### Read-Only Actions Handlers [BLOC18]
Some accounts may be able to process an action on a pass/fail basis without modifying their internal state. If this is the case, then these handlers can be executed in parallel, so long as the read-only action handlers for a particular ARISEN account are included in one or more shards within a particular cycle.

##### Atomic Transactions with Multiple Accounts [BLOC18]
Sometimes it is desirable that actions are delivered to and accepted by multiple accounts atomically. In this case, both actions are placed in one transaction and both accounts will be assigned the same shard and the actions applied sequentially.

##### Partial Evaluation of Blockchain State [BLOC18]
Scaling blockchain technology necessitates that components are modular. Everyone should not have to run everything, especially if they only need a subnet of the contracts. A social networking application developer runs full nodes for the purpose of displaying the entire state of its application to users. This social networking application has no need for the state associated with, for instance, a ride-sharing application's contract(s). ARISEN's software allows any full node to pick any subset of applications to run. Actions delivered to other applications are safely ignored if an application never depends upon the state related to another contract.

##### Subjective Best Effort Scheduling [BLOC18]
ARISEN cannot obligate or force a block producer to deliver any action to any other ARISEN account. Each block producer makes their own subjective measurement of the computational complexity and time required to process a transaction. This applies whether a transaction is generated by a user or automatically by a smart contract.

At the network level, all transactions are billed a computational bandwidth cost based on the number of WASM instructions executed. However, each block producer may calculate resource usage using their own algorithm and measurements by adjusting RSN VM's compile-time and run-time constraints. When a block producer concludes that a transaction or account has consumed a disproportionate amount of computation capacity, they simply reject the transaction when producing their own block; however, they will still process the transaction if other block producers consider it valid.

In general, so long as even one block producer considers a transaction as valid and under the resource usage limits, then all other block producers will also accept it, but it may take up to one minute for the transaction to find that producer. In some cases, a producer may create a block that includes transactions that are an order of magnitude outside of acceptable ranges. In this case, the next block producer may opt to reject the block and the tie will be broken by the third producer. This is no different than what would happen if a large block caused network propagation delays. The community would notice a pattern of abuse and eventually remove votes from the rogue producer.

This subjective evaluation of computation cost frees the blockchain from having to precisely and deterministically measure how long something takes to run. With this design, there is no need to count instructions at the VM-level, which drastically increases opportunities for optimization without breaking consensus.

##### Deferred Transactions [BLOC18]
ARISEN supports deferred transactions that are scheduled to execute in the future. This enables computation to move to different shards and/or the creation of long running processes that continuously schedule a continuance transaction.

##### Context Free Actions [BLOC18]
A Context Free Action involves computations that depend only on transaction data, but not upon the blockchain state. Signature Verification, for instance, is a computation that requires only the transaction data and a signature to determine the public key that signed the transaction. This is one of the most expensive individual computations a blockchain must perform, but because this computation is context free, it can be performed in parallel.

Context Free Actions are like other user actions, except they lack access to the blockchain state to perform validation. Not only does this enable ARISEN to process all Context Free Actions, such as signature verification, in parallel, but more importantly, this enables generated signature verification.

With support for Context Free Actions, scalability techniques such as Sharding, Raiden, Plasma, State Channels and others become much more parallelizable and practical. This development enables efficient inter-blockchain communication, as well as unlimited scalability for on-chain activity.

##### Schema-Derived Actions [BLOC18]
All actions sent between ARISEN accounts are defined by a schema that is part of the blockchain consensus state. This schema allows seamless conversion between binary and JSON representation of the actions held within a smart contract.

##### Schema-Derived On-Chain Database [BLOC18]
Database state is also defined using a similar schema. This insures that all data stored by all contracts/accounts, is in a format that can be interpreted as human-readable JSON, but stored and manipulated with the efficiency of binary.

##### Separating Authentication From Application [BLOC18]
ARISEN segregates validation logic into three separate segments to maximize parallelization opportunities and minimize the computation debt associated with reengineering application state from the transaction log:
-Validating that an action is internally consistent;
-Validating that all preconditions are valid; and
-Modifying the application state.

Validating the internal consistency of an action is read-only and requires no access to blockchain state. This means that it can be performed with maximum parallelism. Validating preconditions within a smart contract, such as required balance, is read-only and will certainly benefit from parallelism. Write access is only required when the modification of an application's state is taking place and therefore would be processed sequentially for each application in question.

Authentication is simply a read-only process, executed from within a smart contract in order to verify that a specific action can ultimately be applied. Under this model, websites and web applications are doing the work, not the contracts, or ARISEN for that matter. In real-time, the calculation of computation debt and the regeneration of application state from the transaction log are both required to be performed; although, once a transaction has been included in the blockchain, it is no longer necessary to perform the authentication operation(s).

##### VM & Language Agnostic
From a computer science perspective, ARISEN is responsible for coordinating the delivery of authenticated messages (called "actions") between ARISEN accounts. Truly, any programming language or virtual machine can be implemented to work with ARISEN's software, as these implementation specific details, for the most part, are independent from ARISEN's core design philosophy. Although, languages and virtual machines must be deterministic and properly sandboxed with sufficient performance if they are to be integrated with ARISEN's APIs.

#### Governance
ARISEN is ultimately designed to be a decentralized democracy, where the people are able to reach consensus concerning issues that involve the community at-large, as well as the safety and welfare of the community itself. The users of the dWeb are governed through a "governance" process concerning subjective matters that require collaborative action, the power to proceed forth with the decisions that are agreed upon by the governance themselves, and the vested power to create amendments to a network-wide Constitution that was ratified in order to protect the rights of the network's users.

Elected block producers that are instituted through the DPOS algorithm are also known and considered as elected Governance members. Essentially, Governance members must approve all changes to dWeb-based software that has been requested by the community itself. This model works because if Governance members go against the wishes of RIX holders, users of the network will most likely remove their votes from those specific Governance members who ultimately went against their wishes. As a safety valve, non-producing full node validators (e.g., dApps that run their own nodes) have the power to reject changes that are made without the permission of RIX holders.

##### Elections
ARISEN's election system is very unique and coincides with ARISEN's DPOS algorithm.

**A few facts about ARISEN's election system:**
-Each ARISEN account can vote for up to 30 different block producers.
-The number of votes an account has directly correlates to the number of staked RIX in the account.
-A staked vote remains valid for an entire year.
-After one year, a staked vote decays to half a vote and so on.
-This is to maintain a need to validate the performance of block producers.
-If the RIX used for voting are unstaked, those votes are removed from the continual counting process since the RIX becomes transferrable liquidity.
-The counting process happens every 126 seconds so, in theory, block producers can be regularly interchanged with new candidates.
-Candidates who didn't quite make the block producer list act as backup block producers.
-Voting can be carried out via wallets like [dWallet](https://peepsx.com/dwallet).
-Voting relies on users creating a digital signature via a wallet or voting application that broadcasts their vote/signature to the ARISEN mainnet, providing cryptographic evidence of the authenticity of the vote, as well as the RIX ownership, as it is an interaction/transaction in the user's ARISEN account.

##### Freezing Accounts
The freezing of accounts on the EOS network was a heated debate amongst blockchain enthusiasts. In truth, every single blockchain is designed to allow block producers to pick and choose if specific transactions are included within a specific block. Therefore, block producers or miners on any blockchain have the ability to freeze accounts and reverse transactions simply through consensus. ARISEN formalizes this authority by making sure the process of freezing accounts has to be approved by a 15/21 vote amongst active governance members. ARISEN's blockchain expands upon EOS's vision, enabling people of the network to police for many illegal activities, that of which are within the [dWeb Constitution](https://github.com/arisenio/constitution).

You can read more about how the [dWeb Protocol](#DWEB) and its [Reporting System](#reporting-system) utilize this feature later in this paper.

##### Updating Contract Code
Contracts on ARISEN that act maliciously can shutdown the network entirely. ARISEN allows its governance to replace malicious code within contracts through a 15/21 vote of elected members. This enables ARISEN to proceed forth without a hard fork, which would otherwise be needed to remove the malicious contract.

##### dWeb Constitution
The rights of users on the dWeb are ratified in the [dWeb Constitution](https://github.com/arisenio/constitution) and are immutably available within ARISEN's state. While the Constitution is immutable, it can be amended with a 15/21 vote.

##### Process for Constitutional Amendments & Software Upgrades
The dWeb and ARISEN are designed around the idea that "the code is the law." For this reason, the protocol itself, as defined in the canonical source surrounding dWeb's on-chain and off-chain protocols and dWeb's Constitution, can only be updated through the following process:
-1. A change to the dWeb Constitution is proposed by governance members and approved by a 15/21 vote.
-2. The governance is able to maintain this approval count for 30 consecutive days.
-3. All accounts on ARISEN, when processing a transaction, would have to accept this new Constitution as a condition for future transactions.
-4. Governance members must adopt changes to the overall ARISEN software, as well as `off-chain` implementations, to reflect the change in the dWeb Constitution and must propose it to the network using a hash of the dWeb Constitution.
-5. Governance members maintain 15/21 approval of the new code for 30 consecutive days.
-6. Since the approval for the new code has maintained approval for 30 days, the code will take effect 7 days later, giving all non-producing full nodes exactly one week to upgrade after the new changes to various canonical implementations.
-7. All ARISEN nodes on the network who do not upgrade to the new ARISEN release will shutdown automatically.

The process for software upgrades (updating the blockchain) will take anywhere from 2 to 3 months, while updates to fix non-critical bugs that do not require changes to the constitution can take 1 to 2 months.

##### Emergency Changes
Governance members may accelerate the process of a software upgrade if it involves a harmful bug or security exploit that is actively harming users. Although this does go against the dWeb Constitution. it is generally up to the elected governance to make these emergency decisions.

##### Governance Rewards
Being that governance members are also block producers, they're awarded new RIX coins every time they produce a block on ARISEN. The number of RIX that are minted is determined by the median of the desired pay published by all governance members. ARISEN may be configured to enforce a cap on governance rewards to where the total annual increase in RIX's coin supply does not exceed 5%.

##### dWeb Improvement Proposal (DWIP)
While RIX holders can elect governance members, they can also craft dWeb Improvement Proposals (DWIP) that can be voted on by community members, whom can elect a number of DWIPs in order to advance the ideals of the community. Winning DWIPs will receive a certain amount of RIX via ARISEN's `savings account`, which is completely funded via inflation. DWIPs will only receive RIX proportional to the amount of votes each DWIP has received from RIX holders.

#### Distributed Computing Resources
Running contracts requires server capacity and there need to be safeguards against spam generated by these contracts. The resources needed are defined as RAM, Bandwidth (NET) and CPU. Each are explained below:

##### RAM
RAM is required to write data to the blockchain database, which takes up system capacity (change of state). Every account must have RAM to be a useable account (a minimum of 5 KB). The price of RAM fluctuates on an open market. The price of RAM fluctuates automatically depending on supply and demand. Extra RAM can be purchased for accounts, and this RAM can be sold at whatever the current market price is, when it is no longer needed.

Developers who deploy contracts will require more RAM than the standard account because RAM comes under the scrutiny of the account carrying out the function (change of state). This means the RAM requirements of a contract are paid for by the developer of the account that deployed it, not the user interacting with it. RAM is not traditional silicon RAM; rather, it refers to storage in ARISEN's distributed memory database, which is all the data currently being processed by the blockchain's collective CPU.

##### CPU
Refers to computation (processing power). This is accessed by staking a minimum of 3.0 RIX (depending on network load). This can be defined as how long transactions/actions run for. CPU is measured by average consumption in microseconds over a 3 day period, decreasing to 0 over time. This is the amount of time a transaction runs for with network bandwidth; in other words, it is the size of the transaction.

##### NET
The average consumption in bytes over a 3 day period, decreasing to 0 over time. This can be referred to as bandwidth and log storage required when sending a transaction (the number of transactions/actions). This is accessed by staking a minimum of 0.1 RIX (depending on network load).

#### Cryptocurrencies & Decentralized Payments
Like other blockchains, at the very foundation of ARISEN is the ability for developers to create their own digital currencies, also known as "tokens." For this reason, ARISEN is considered a multi-asset network. P2P currencies give way to decentralized payments, which enable developers to add economic features within their decentralized applications. For example, a decentralized social network built on ARISEN could launch its own currency. This currency could be used to pay users for their posts, thereby providing them incentive to join the network.

##### Cross-Chain Transfer Protocol (CTTP)
RIX and other ARISEN currencies can be transferred to/from wholly unrelated blockchains like Ethereum, EOS and TRON, using the Cross-Chain Transfer Protocol (CTTP). You can read the full specification [here](https://github.com/arisenio/cttp-whitepaper).

#### Blockchain Interoperability
ARISEN was designed to coordinate and facilitate blockchain interoperability through the generation of both `action existence` and `action sequence`. This combo, teamed with ARISEN's contract architecture designed around `action passing`, enables high-level abstractions that are ultimately presented to developers by concealing all blockchain communications and proof validations.

#### LCV
EOS first presented the concept of Merkle Proofs for Light Client Validation (LCV) - with the idea that all clients don't need to process all transactions - in order to make the integration with other blockchains much easier. For example, a decentralized social network that operates on an ARISEN-based blockchain would only be concerned with the transactions that are taking place within the social network itself. This is supported by the idea that a blockchain's block producers would want the smallest possible overhead when syncing with another blockchain.

ARISEN uses LCV to prove the existence of any transaction with a proof of less than 1024 bytes in size (a valid proof on the Bitcoin network is about 512 bytes). By using LCV, ARISEN can prove that a block is included in another blockchain by simply utilizing a specific `blockID`, as well as the corresponding headers of a block, as long as the block is trusted and irreversible. This sort of proof takes `ceil(log 2(N))` digests for its path, where `N` is the number of blocks in a blockchain that contains 100 million blocks, in 864 bytes.

Therefore, tracking all block headers is cheap at 420 MB/year and will ultimately keep proof sizes small. Although, over time it makes more sense to have one blockchain that contains the entire histories of other blockchains to completely eliminate the need for proofs. By minimizing the frequency of inter-chain proofs, we can further boost the network's performance.

##### Latency
Thanks to ARISEN's consensus algorithm, ARISEN-based blockchains are able to provide rapid irreversibility. This means there is only 0.5 second latency between ARISEN blockchains that use the same consensus model. This is because when one blockchain communicates with another, block producers have to wait until a transaction's irreversibility has been confirmed by the blockchain.

##### Proof of Completeness (POC)
ARISEN uses Proof of Completeness to prove there are no gaps in the transaction history when verifying transactions from a remote blockchain rather than trying to attempt to prove that all transactions on the other blockchain are valid, since it's impossible to prove that all of the most recent transactions are known. By identifying each action sent to an account by sequencing these actions, an ARISEN user is able to prove that each action intended for a particular ARISEN account has ultimately been processed in order.

##### SegWit
ARISEN utilizes the concept of Segregated Witness (SegWit) to eliminate the need for storing the SHA256 hashes used by proofs to derive blockchain state. Once a Merkle Proof is accepted and deemed irreversible, the 2KB of hashes used for derivation are no longer stored. As it applies to blockchain interoperability, savings are 32x greater than using typical signatures.