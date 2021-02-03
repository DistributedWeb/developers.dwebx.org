---
title : Using dDrives
---

Distributing your website or web app within a dDrive can be accomplished quite easily using dDrive Daemon or dBrowser. 

:::note
In the below example we will be using dDrive Daemon, although you can head on over to the [official dBrowser documentation](https://docs.dbrowser.com) for dBrowser-based examples.
:::

### Installing dDrive Daemon
First you will need to install dDrive Daemon. Since dDrive Daemon is FUSE-based, the installation process differs  depending on the operating system you're using. Below is the installation process for MacOS, Linux and Windows users:

:::note
You will need to have Node.JS and NPM installed on your machine, before installing dDrive Daemon.
:::

#### MacOS and Linux Installation
- 1. Installing the CLI
Run the following command to install the CLI
```shell {}
npm install ddrive-daemon@latest -g
```

- 2. Setup FUSE 
Run the following command to setup FUSE, which lets you mount dDrives as normal file system directories on both MacOS and Linux. You will need `sudo` access on the machine you're using.

```shell {}
sudo ddrive fuse-setup
```

- 3. Confirm FUSE Setup
You will need to confirm that FUSE was setup properly, by running the `status` command, as follows:

```shell {}
ddrive status
```

This should return a a block of status information that should include the following:

```shell {}
Fuse Available: true
Fuse Configured: true
```

- 4. Startup The Daemon
Next, you need to startup the daemon using the following command:

```shell {}
ddrive start
```

This should startup the daemon on port `3101` and dDrive at this point should be running on your machine.

#### Windows Installation
:::note
Windows machines are not FUSE-capable and so the installation instructions are a bit different. 
:::

- 1. Installing the CLI
```shell {}
npm install ddrive-daemon@latest -g
```

- 2. Startup The Daemon
```shell{}
ddrive start
```

This should startup the daemon on port `3101` and dDrive at this point should be running on your machine.

:::note
dDrive Daemon uses PM2, which should allow the daemon to run as a background process, which means there is no need to run the `start` command in a `screen`.
:::

### Creating & Distributing A dDrive
Like the installation process, the process for creating and distributing a dDrive differs depending on the operating system you're using. Below are instructions are creating and distributing a dDrive.

:::note
It's important to note, that on MacOS and Linux devices, all dDrives are mounted and stored in the `/root/DDrive` directory. This directory is created when the daemon is first started using the `start` command. On Windows machines, they're stored wherever you are exporting files to using the `export` command (only used on Windows machines).
:::

#### On MacOS and Linux
There is two ways to create a shareable dDrive inside your root dDrive (`/root/DDrive`) on a MacOS or Linux device. You can either create and distribute your own dDrive or you can mount, download and seed a remote dDrive that belongs to someone else. 

- 1. `ddrive create [path]` - This will create a new shareable dDrive at `path` (where `path` must be a subdirectory of `/root/DDrive`). This dDrive will look like a normal directory but if you run `ddrive info [path]`, it will tell you that it's shareable.

- 2. `ddrive mount [path] [key]` - This will mount an existing dDrive already being distributed on the dWeb at `path`. It's useful if someone is sharing one of their dDrives with you and you want to save it into your root dDrive.


##### Creating & Distributing A dDrive
The easiest way to create and distribute a dDrive is to use the command below:

```shell {}
ddrive create ~/DDrive/my-app
```

This will output the following:

``` shell {}
> ddrive create ~/DDrive/my-app
Mounted a drive with the following info:

    Path: /root/DDrive/my-app
    Key: b432...
    Seeding: true
```

Any user on the dWeb can now access your dDrive via the `Key`. In other words, if you have the files of a website in this dDrive, it can be pulled up in dBrowser by simply typing in the key or the domain associated with the key.


##### Downloading & Seeding Remote dDrives
You can mount the dDrives of others by using the `mount` command. This will download their dDrive, seed it and live replicate it on your machine. All you need is the dWeb key related to their dDrive. To mount a remote dDrive, run the following:

```shell {}
ddrive mount ~/DDrive/location-for-mount b432f90b34a718...
```

:::note
All mounted dDrives are seeded by default, although, you can use the ```--no-seed``` flag to make sure that the dDrive you're mounting is not seeded.
:::

#### On Windows
##### Creating & Distributing A dDrive
In order to create a dDrive on a Windows machine, you will need to `import` your app's files into a dDrive, using the `import` command:

```shell {}
ddrive import ./path/to/your/app-files
```

and it should output something like this:

```shell {}
> ddrive import ./path/to/your/app-files
Importing path/to/your/app-files
aae4f36bd0b1a7a8bf68...

Importing | =================================== | 100% | 3/3 Files
```

The command will remain running and will watch the directory for any new changes, so it is important that you run this command in a `screen`, so that it remains active. 


##### Downloading & Seeding Remote dDrives
Once files have been exported to a dDrive using the `import` command, the dDrive is automatically shared on dWeb's DHT and can be downloaded and seeded by other users who are using dDrive Daemon or dBrowser, by running the `export` command, as follows:

```shell {}
ddrive export aae4f36bd0b1a7a8bf68...
```

:::note
The documentation for dDrive Daemon is extensive and goes far beyond the scope of this guide. For a full description of dDrive Daemon's many commands and features, head on over to its official repository [here](https://github.com/distributedweb/ddrive-daemon).
:::

:::caution
#### What's next?
Aside from using a dDrive to distribute your website or application's files, you may want to programmatically implement dDrive's file system APIs into your application. In this case, there is an official Node.JS implementation of dDrive that will allow you to do just that. Next, we explore dDrive's Node.JS API [here](/ddrives/ddrives-node-api).
:::