---
title: dbrowser.contacts
description: This API gives read access to the user's address book
---

### dbrowser.contacts.requestProfile()

Creates a dialog for selecting one of the user's profile drives.

* Returns **Promise&lt;Object&gt;**
  * **url** String. The profile dDrive's URL.
  * **title** String. The profile dDrive's display name.
  * **description** String. The profile dDrive's bio.

```javascript
var profile = await dbrowser.contacts.requestProfile()
```

### dbrowser.contacts.requestContact()

Creates a dialog for selecting one of the user's contacts in their address book.

* Returns **Promise&lt;Object&gt;**
  * **url** String. The profile dDrive's URL.
  * **title** String. The profile dDrive's display name.
  * **description** String. The profile dDrive's bio.

```javascript
var contact = await dbrowser.contacts.requestContact()
```

### dbrowser.contacts.requestContacts()

Creates a dialog for selecting multiple of the user's contacts in their address book.

* Returns **Promise&lt;Array&lt;Object&gt;&gt;**
  * **url** String. The profile dDrive's URL.
  * **title** String. The profile dDrive's display name.
  * **description** String. The profile dDrive's bio.

```javascript
var contacts = await dbrowser.contacts.requestContacts()
```

### dbrowser.contacts.list()

Returns the full list of contacts in the address book. Requires user permission.

* Returns **Promise&lt;Array&lt;Object&gt;&gt;**
  * **url** String. The profile dDrive's URL.
  * **title** String. The profile dDrive's display name.
  * **description** String. The profile dDrive's bio.

```javascript
var contacts = await dbrowser.contacts.list()
```
