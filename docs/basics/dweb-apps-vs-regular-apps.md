---
title : dWeb Apps Vs. Regular Apps
---

A dWeb application is an application that is decentralized from end-to-end. The following aspects of any applications can be decentralized:

- Backend Software
- Frontend Software
- Data Storage
- Message Communications
- Name Resolution
- Payments
- User Authentication

Building a dWeb-powered application involves designing it to utilize various protocols within the [DWEB](/protocols/the-suite) Protocol Suite, which allow you to decentralize the above portions of your application. With a typical application on the regular web, the application's logic and data storage are typically controlled by a backend that is powered by a centralized server, while the data itself is typically stored via a database management system on another centralized server. User authentication is also handled by the backend, where users are authenticated via a centralized server, or via some sort of backend, since their passwords and other authentication details are stored via the app's database management system. 

Developers like yourself have also utilized cloud-based storage networks or content delivery networks for the distribution of large data sets, centralized payment processors for accepting in-app payments and centralized domain name systems for name resolution. When developing dWeb-powered apps, there is no longer a need for servers, centralized data storage, payments or domains. All portions of a dWeb application are decentralized. Below, takes you through the design of a typical application:

### Backend Software
dWeb applications use smart contracts, in order to replace the need for backend software. Smart contracts are used to handle an application's logic, data storage and user authentication. Smart contracts are deployed on the ARISEN blockchain and can be interacted with via various SDKs. Data that derives from the execution of smart contracts is stored on the blockchain and can also be retrieved at any time.

### Frontend Software
The frontend for dWeb-based applications is just like the frontends you're used to building with regular apps on the traditional web. Frameworks like React.JS, React-Native and others can be used to build out your frontend. Frameworks like Electron can even be used to build out dWeb-powered desktop applications. The important difference in regards to web-based applications, is that apps must be SPAs (Single-Page Apps), where a framework like Browserify or Grunt is needed to create a static, browser-ready version of the app itself, so that it can be distributed within a [dDrive](/protocols/ddrive). This way it can be accessed via a dWeb-ready web browser like [dBrowser](http://dbrowser.com). 

### Data Storage
Data can be stored via a blockchain like ARISEN, or it can be stored off-chain via a [dDatabase](/protocols/ddatabase) or even a distributed key-value store like [dWebTrie](/protocols/dwebtrie). Even entire file systems can be stored in a [dDrive](/protocols/ddrive) (like the files for your web application).

### Message Communications
While data is distributed between peers using the [dDatabase Protocol](/protocols/the-suite/) messaging protocol, it can also be used by applications and even groups of peers to exchange messages between each other, entirely off-chain.

### Name Resolution
The dWeb utilizes a decentralized domain name system (dDNS). dTLDs (Decentralized top-level domains) are powered by an ARISEN smart contract and records for domains are distributed within dDrives using RRML (Resource Record Markup Language).

### Payments
The dWeb does not work with centralized payment processors, since all software is open and API keys for these services would be out in the open as well. On the other hand, the dWeb is made to work with decentralized payment processing platforms, and decentralized currencies like Bitcoin, Ethereum, RISE and others.

### User Authentication
dWeb-based apps can utilize many ARISEN-based authentication and authenticator SDKs, that simplify user authentication with blockchains, to a point where a user has no idea they're using private keys, much less a blockchain. They're simply verifying their biometrics or scanning a QR code, in order to sign blockchain-based requests (when users interact with an app's ARISEN-based backend).

:::note
Apps that utilize all of these mechanisms can withstand any attack, even from ISPs or big tech companies. It's impossible to halt the operations of an application that boasts end-to-end decentralization.
:::