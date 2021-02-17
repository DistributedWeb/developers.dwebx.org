---
title : Distributing Files
---

A web app's files (frontend) must be distributed via a [dDrive](/protocols/ddrive), which is identified by a dWeb network address. Once the dDrive's address is announced on dWeb's DHT, it can be discovered by other peers who can easily download its contents from you. This process is abstracted away by dWeb-enabled web browsers like [dBrowser](http://dbrowser.com), which allows users to enter the dWeb address of a dDrive and view its contents, just like a regular web browser would allow users to enter the IP address of a web server and view its contents.

The main difference between hosting your app's files within a dDrive versus hosting them on a server, is that with a server on the regular web, as your app grows in popularity, the number of servers your app is hosted across grows in number as well. With a dDrive on the dWeb, as your app grows in popularity, the number of peers who "seed" your dDrive grows in number as well. This is a major difference, considering the fact that there is no cost to hosting your application on the dWeb, it can elastically scale because it grows with those who use it, and there is no longer a central point of failure since the application is hosted across hundreds or even thousands of computers around the world. Even better, when you update the contents of a dDrive, it is automatically replicated to all of its seeds instantly. In other words, if you change your application's logo within your app's dDrive, that update will be sent to all of the dDrive's seeders and those who are actively using the app within dBrowser will see those changes instantly (without refresh).

:::caution
#### What's next?
Learn the basics surrounding dWeb's decentralized domain name system, [here](/basics/decentralized-domains-and-ddns).
:::