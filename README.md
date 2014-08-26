ConsoleMe
=========================

A Meteor package that grabs all server calls to `console.log` and displays them
on all subscribed client consoles as well. Useful for debugging test apps running on a
remote server. This could be insecure, so don't enable this on a production app.

## Installation

When in a Meteor app directory, enter:

```
$ meteor add aldeed:console-me
```

## Installation (Prior to Meteor 0.9.0)

Install using Meteorite. When in a Meteor app directory, enter:

```
$ mrt add console-me
```

## Basic Usage

In your server code, set `ConsoleMe.enabled` to `true` whenever you want all
clients to begin logging all server console messages. Conversely, set to `false`
to stop sending server console messages to clients.

In a browser console, call `ConsoleMe.subscribe()` while connected to an app that
has ConsoleMe enabled on the server. You will begin seeing any server logging
appear in the browser console in real time. When you no longer want to see
server logging in the browser console, call `ConsoleMe.unsubscribe()`.

## Notice

This works but could be better. It should just be used for testing, so there
won't be much work going into this package, but feel free to submit improvements.

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.2.0/dist/gittip.png)](https://www.gittip.com/aldeed/)
