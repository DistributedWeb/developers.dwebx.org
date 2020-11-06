---
title: dbrowser.capabilities
description: This API creates temporary URLs for safely sharing dDrive access between applications
---

"Capabilities" are opaque URLs which map to hyperdrives while hiding the URL. The name comes from the [capabilities security model](https://en.wikipedia.org/wiki/Capability-based_security).

The purpose of capability URLs is to provide security primitives for constrained access to a dDrive. The default security model of a dDrive is that the pubkey URL provides read access locally and over the network. Because the pubkey is unchangeable, it's impossible to revoke access to a pubkey once it's acquired. The "capability URLs" are local mappings from random IDs to the dDrive pubkeys, and therefore can provide read access without giving away the pubkey.

Applications can share capability URLs with other applications (e.g. in an `<iframe>`) to provide temporary and constrained access.

A dDrive capability URL uses a special `.cap` pseudo-TLD. They are formed as `dweb://{random-base32-id}.cap/`.

Capability URLs are local and stored in-memory. They will be "destroyed" when the browser restarts. They are not networked and therefore cannot be shared with other users. They are able to map to a key and a dDrive-version, but cannot map to subfolders or files.

## API

### dbrowser.capabilities.create(targetUrl)

Create a new capability mapping to the target URL.

* **targetUrl** String. The URL which the capability will represent.
* Returns **Promise&lt;String&gt;**. The capability URL.

```javascript
var capUrl = await dbrowser.capabilities.create('dweb://12345..af')
await dbrowser.dDrive.dDrive(capUrl).readdir('/')
```

### dbrowser.capabilities.modify(capUrl, targetUrl)

Modify an existing capability's mapping.

* **capUrl** String. The URL of the capability to modify.
* **targetUrl** String. The URL which the capability will represent.
* Returns **Promise&lt;Void&gt;**.

```javascript
await dbrowser.capabilities.modify(capUrl, 'dweb://fedcb..21')
await dbrowser.dDrive.dDrive(capUrl).readdir('/')
```

### dbrowser.capabilities.delete(capUrl)

Delete a capability. Future operations against the URL will fail.

* **capUrl** String. The URL of the capability to modify.
* Returns **Promise&lt;Void&gt;**.

```javascript
await dbrowser.capabilities.delete(capUrl)
```
