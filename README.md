ConsoleMe
=========================

A Meteor package that grabs all server calls to `console.log` and displays them
on all the client consoles as well. Useful for debugging test apps running on a
remote server. Don't enable this on a production app.

## Installation

Add the `console-me` package to your app. Not in Atmosphere, so point to the
master branch of the GitHub repository.

## Basic Usage

In your server code, set `ConsoleMe.enabled` to `true` whenever you want all
clients to begin logging all server console messages. Conversely, set to `false`
to stop sending server console messages to clients.

## Notice

This works but could be better. It should just be used for testing, so there
won't be much work going into this package, but feel free to submit improvements.