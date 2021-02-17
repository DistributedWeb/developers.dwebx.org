---
title : Universal Authentication Libraries
---

There are a slew of libraries and concepts surrounding ARISEN-based user authentication, which are each explained below.

### Authentication Protocols and Specification
- [ARISEN Authentication Transport Protocol](https://github.com/arisenio/arisen-authentication-transport-protocol-spec) - A protocol for applications to make signing requests to authenticators. Implemented by the dWebID authenticator. Also referred to as the "AATP" protocol.
- [ARISEN Signing Request Protocol](https://github.com/arisenio/arisen-signing-request) - A protocol for applications to make signing requests to authenticators. Implemented by the [PeepsID](https://peepsx.com/peepsid) authenticator. Also referred to as the "ASR" protocol.
- [Ricardian Specification](https://github.com/arisenio/ricardian-spec) - A specification used by authenticators to display the actions a user is attempting to sign, in a human-readable format. Implemented by the dWebID authenticator.
- [Manifest Specification](https://github.com/arisenio/manifest-spec) - A specification for metadata describing integrating apps and the actions they can request from a user. This specification can be used by authenticators to provide more information about the app a user is interacting with, and to run transaction pre-flight security checks comparing the contents of a transaction request with what integrating apps have declared about themselves.

### Authenticators
- [dWebID for iOS](https://github.com/peepsx/dwebid-ios)
- [dWebID for Chrome](https://github.com/peepsx/dwebid-chrome)
- [PeepsID for Desktop](https://github.com/peepsx/peepsid-desktop)
- [PeepsID for Mobile](https://github.com/peepsx/peepsid-mobile)

### Universal Authentication Libraries
Apps can utilize the UAL to integrate with multiple authenticators from a single API. The [Core UAL Library](https://github.com/arisenio/universal-authentication-library) is used alongside renderers and UALs for specific authenticators (depending on which authenticators you would like to integrate with). Below, we lay out the specific renderers and authenticator UALs that you can build into your applications.

#### UAL Renderers

- [UAL Renderer for ReactJS](https://github.com/arisenio/ual-reactjs-renderer)
- [UAL Renderer for PlainJS](https://github.com/arisenio/ual-plainjs-renderer)

#### UAL Authenticator Plugins
- [dWebID UAL](https://github.com/peepsx/dwebid-ual)
- [PeepsID UAL](https://github.com/peepsx/peepsid-ual)

#### Build Your Own UAL Plugin
If you have built your own authenticator and would like to build your own UAL plugin for others to integrate into their app's UAL, you can read the walkthrough document [here](https://github.com/arisenio/ual-authenticator-walkthrough).

### Signature Provider Implementations
There are various signature providers that can also be used to interface with authenticators, or to build your own authenticators. Signature providers are displayed below, by language.

#### JavaScript Signature Providers
- [ArisenSDK Signature Provider Interface](https://github.com/arisenio/arisen-signature-provider-interface) - A signature provider interface for interacting with AATP-ready authenticators.
- [ArisenSDK iOS Browser Signature Provider Interface](https://github.com/arisenio/arisen-ios-browser-signature-provider-interface) - A signature provider interface for communicating with AATP-ready authenticators from iOS Safari.
- [ArisenSDK Window Message Signature Provider Interface](https://github.com/arisenio/ArisenSDK-window-message-signature-provider-interface) - A signature provider interface for communicating with an AATP-ready authenticator over the Window Messaging API.
- [ArisenSDK Ledger Signature Provider](https://github.com/arisenio/ArisenSDK-ledger-signature-provider) - When plugged into `ArisenSDK`, this signature provider enables applications to route signing requests to a ledger device.

#### Java Signature Providers
- [ARISEN Java Softkey Signature Provider](https://github.com/arisenio/arisen-java-softkey-signature-provider) - A signature provider that is a pluggable signature provider for the [ARISEN Java SDK](https://github.com/arisenio/arisen-java) that allows for signing transactions using in-memory SECP256K1 and SECP256R1 keys.
- [ARISEN Android Keystore Signature Provider](https://github.com/arisenio/arisen-android-keystore-signature-provider) - A signature provider that is pluggable for ARISEN's Java SDK, and allows for signing transactions using Android keystore keys. Written in Kotlin.

#### Swift Signature Providers
- [ARISEN Swift Softkey Signature Provider](https://github.com/arisenio/arisen-swift-softkey-signature-provider) - A signature provider for signing transactions using in-memory K1 keys. Is pluggable into [ARISEN's Swift SDK](https://github.com/arisenio/arisen-swfit).
- [ARISEN Swift Vault](https://github.com/arisenio/arisen-swift-vault) - Vault is a utility library for working with public/private keys and signing with Apple's Keychain and Secure Enclave.
- [ARISEN Swift Vault Signature Provider](https://github.com/arisenio/arisen-swift-vault-signature-provider) - A signature provider that is pluggable into ARISEN's Swift SDK and allows for the signing of transactions using keys stored in Apple's Keychain and the device's Secure Enclave.

:::note
There are several SDKs as well as other tools that can be used to interact with ARISEN, discussed [here](/toolbox/interacting-with-arisen).
:::
---
:::
caution
#### What's next?
Learn about dDrive and the various tools for creating, managing and distributing dDrives [here](/toolbox/distributed-file-system-frameworks).
:::