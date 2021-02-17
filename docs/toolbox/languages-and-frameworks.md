---
title : Languages And Frameworks
---

As far as programming languages are concerned, your language choices depend upon the platform you're developing for and whether or not you're developing your application's frontend or backend.

## Backend
- Smart contracts must be written in C++ and compiled/deployed using [ARISEN CDT](https://github.com/arisenio/arisen.cdt).
- Smart contracts could be written in other languages, but would require a special compiler capable of generating Web Assembly (WASM) and ABI from your contract, so that your code can be deployed on ARISEN and due to the fact that ARISEN's virtual machine can only execute WASM code.

## Web Frontend
Building a web frontend on the dWeb means that your app will be distributed in a dDrive. It's important to note that all web apps distributed within a dDrive must be static and browser-ready, meaning they should function entirely in the browser. This can be achieved quite easily using JavaScript frameworks like React.JS, and Node.JS modules like WebKit, where your entire application can be bounced to a static format within a matter of minutes. To add to that, your frontend can interface with ARISEN and dWeb's off-chain components using various JavaScript modules that will be discussed throughout this section.

## Mobile Frontend
If you're building an iOS or Android application, you will find that using React Native is your easiest pathway forward because you can still use many of dWeb's Node.JS modules, but we are working on the development of many native SDKs. Just recently, we released a Swift and Java SDK for interacting with ARISEN, and we plan to do the same for dWeb's off-chain components like dDatabase and dDrive.

## Desktop Frontend
Frameworks like Electron can be used to develop cross-platform desktop applications using the exact same code that was used to deploy your web-based frontend. This means you're able to use the same Node.JS modules used on your web-based and mobile frontends within a desktop frontend. Even if you don't use a single codebase to deploy across all platforms, and instead utilize a separate codebase for your web, mobile and desktop experiences, you'll still be able to reuse much of the same code across each codebase.

:::caution
### What's next?
Learn about the various DHT frameworks you can integrate into your application, in order to interface with dWeb's DHT, [here](/toolbox/dht-frameworks).
:::