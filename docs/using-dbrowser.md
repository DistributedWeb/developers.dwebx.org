---
title: Using dBrowser
---

When using dBrowser from a developer's perspective, it's important to understand how the dWeb works. On the traditional web, servers host websites or web applications and manage the data associated with them. On the dWeb, the users themselves host websites and web applications and manage their own user data. The dWeb is natively compatible with the [ARISEN blockchain](https://arisen.network) as well, which allows user data to also be stored via ARISEN's peer-to-peer network and cryptographically verified. The dWeb also utilizes many off-chain distributed database frameworks like dAppDB, dWebTrie and dWebTrie Multigraph. You can learn more about ARISEN, developing smart contracts for the dWeb and distributed database frameworks, via ARISEN's official documentation [here](https://docs.arisen.network).

## Goodbye Backend
The dWeb connects users via a peer-to-peer mesh network. Applications themselves are [client-side SPAs](https://en.wikipedia.org/wiki/Single-page_application) and store their data in networked folders and across other peer-to-peer networks (like blockchains) that application developers choose to integrate with.

For many applications, this means that no server or backend will ever be needed. One of the greatest features dBrowser provides, is the ability for app developers to develop their entire app via dBrowser, using the built-in  code editor and terminal environment and quickly publish the app to the dWeb. This easy development process, will allow for the dWeb to expand quickly over time. The lack of a backend on the dWeb, also means that apps and websites on the dWeb are truly decentralized amongst peers, regardless of how many peer-to-peer networks are involved in the development process.

## The Code Is With You
dWeb-based applications run on the client, which means the entire source of the website or application is available locally on your computer or within the browser itself. dBrowser includes a [built-in code editor](developers/using-the-editor.md) so you can access this source immediately.

dDrive is a complete distributed filesystem and so dBrowser's editor cna edit the files with no issue. You can build an entire dApp without using an other tool - ever. It's a beautiful thing.

## What Costs?
When you don't need a server, you don't have to _pay_ for a server. In reality, the users of an application that choose to seed it, contribute their own bandwidth, compute and storage to run the application. This means that developers are no longer alone in paying for the costs associated with hosting their websites or applications.

## The Distributed Web Is A Globally Distributed File System
A dDrive is a filesystem where every folder and file has a URL. Everything is linkable, and everything is accessible over the Internet. Applications use this linkability to join data across users and apps. There are no data siloes on the dWeb.

## Versioned Data
A dDrive is also a versioned filesystem. You can access old revisions of files and link to pinned versions. This is helpful for referencing specific copies, viewing changes over time and recovering from bad writes or deletes.
