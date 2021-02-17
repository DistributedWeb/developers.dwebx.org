---
title : Distributed File System Frameworks
---

As discussed [previously](/protocols/ddrive), a dDrive is a distributed file system built on top of [dDatabase](/protocols/ddatabase). There are several tools for creating, managing and distributing dDrives, as well as a Node.JS implementation of dDrive, so that you can do the same within your applications.

### dDrive Daemon
[dDrive Daemon](https://github.com/distributedweb/ddrive-daemon) is a command-line interface for creating, managing and distributing dDrives.

To install dDrive Daemon, simply run the following command:
```
npm install ddrive-daemon -g
```

:::note
In order to install dDrive Daemon, you will need to have Node.JS and NPM installed on your device.
:::

There are also further setup instructions that can be found [here](https://github.com/distributedweb/ddrive-daemon#setup) as well as dDrive Daemon's full usage instructions, which can be found [here](/ddrives/using-ddrives).

### dDrive Daemon Clients & gRPC Schema
We have launched a Node.JS client for interacting with dDrive Daemon programmatically, along with a gRPC protobuf schema for creating clients in other languages.

- [dDrive Daemon Node.JS Client](https://github.com/distributedweb/ddrive-daemon-client)
- [dDrive Daemon Schema](https://github.com/distributedweb/ddrive-schemas)

### dDrive Node.JS API
You can easily integrate dDrives into your applications using dDrive's Node.JS API, described [here](/ddrives/ddrives-node-api).

:::caution
#### What's next?
Learn about the tools you'll need to write and compile smart contracts [here](/toolbox/writing-and-compiling-smart-contracts).
:::