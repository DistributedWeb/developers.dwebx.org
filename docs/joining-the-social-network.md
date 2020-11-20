---
title: Joining the Social Network
---

In this guide, we're going to personalize your profile drive, find some other users to add to your address book, get you listed in dBrowser's User Directory, and say hello on your social media feed.

---

## Customizing your profile drive

During dBrowser's setup, you filled out a name, picture, and bio for your profile. You can visit your profile drive by clicking your picture at the top right of the browser.

<img className="centered" src="/img/profile-button.png" />

You will find your profile drive is very plain. That's because we want you to build it! (Frankly it was a cost-cutting measure but don't tell anyone.)

<img className="centered" src="/img/social-network-profile-1.png" />

[Open the editor](developers/using-the-editor.md) to see the source code:

```markup {}
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" sizes="32x32" href="/thumb">
  </head>
  <body>
    <main>
      <header>
        <img src="/thumb">
        <h1>Your Name</h1>
      </header>
      <p>Your Bio</p>
    </main>
  </body>
  <style>/* ... */</style>
</html>
```
Now your visitors have a quick way to follow your site! ([Read more about the dBrowser.contacts API](apis/dbrowser.contacts.md).)

Your profile name, bio, and picture [can be changed using the "Drive Properties" dialog](developers/changing-a-ddrive-title-or-thumbnail.md). The profile page won't update automatically, but we can add that!

<img className="centered" src="/img/social-network-profile-2.png" />

```markup {21-26}
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" sizes="32x32" href="/thumb">
  </head>
  <body>
    <main>
      <header>
        <img src="/thumb">
        <h1 id="title"></h1>
      </header>
      <p id="description"></p>
      <button id="addContact">Add to Address Book</button>
    </main>
  </body>
  <script>
    addContact.onclick = function () {
      dBrowser.contacts.requestAddContact(location.toString())
    }
    async function setup () {
      var info = await dBrowser.ddrive.getInfo()
      title.textContent = info.title
      description.textContent = info.description
    }
    setup()
  </script>
  <style>/* ... */</style>
</html>
```

Now your profile drive will read your name and bio on load and display it on the page. ([Read more about the dBrowser.ddrive API.](apis/dbrowser.ddrive.md))

---

<img className="centered" src="/img/user-directory.png" />

You can visit the profiles by clicking on their names. If you find somebody you want to follow, click on the "Add to Address Book" button next to their name.

<img className="centered" src="/img/user-directory-entry.png" />

---

## Adding yourself to the user directory

<img className="centered" src="/img/user-directory-add.png" />

To add yourself to the directory, click "+ Add Your Profile." You'll be prompted to select your profile drive. Do that and your profile will be added!

---

You'll see the following screen:

<img className="centered" src="/img/my-feed-not-signed-in.png" />

After you select your profile, you'll see posts from people in your address book. Any posts you create will be written to your profile drive under the `/microblog` folder. Posts are Markdown by default (.md) but you can post .txt, HTML, images, video, and audio. (The HTML goes in an `<iframe>` just to be safe.)

<img className="centered" src="/img/my-feed.png" />
---

## What next?

From here, if you want to start hacking on some websites, read up on [creating new ddrives](developers/creating-new-ddrives.md) and [using the editor](developers/using-the-editor.md). 

The [dBrowser Developer Portal](https://dBrowser.dev/) has a directory of useful resources for getting into code:

* [Templates](https://dBrowser.dev/docs/templates/). Pre-made ddrives you can copy.
* [Tutorials](https://dBrowser.dev/docs/tutorials/). More developer-focused guides to teach you about building on dBrowser.

You can also [find dBrowser's new Web APIs here](/#apis).
