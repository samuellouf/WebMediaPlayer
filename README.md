# Web Media Player v.2.0

My own little HTML/CSS/JS media player.

[![@samuellouf](https://img.shields.io/badge/author-SamuelLouf-lightgray.svg)](https://github.com/samuellouf/WebMediaPlayer)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Source repo on [GitHub](https://github.com/samuellouf/WebMediaPlayer), and run it [online](https://samuellouf.github.io/WebMediaPlayer/player)

## Versions
- 1.0 : The initial version
- 2.0 : Made some huge changes (Added a NodeJS server, fixed the app for Firefox/Edge...)

## Changelog
See [CHANGELOG.md](CHANGELOG.md).

## Introduction

Web Media Player is a [VLC](https://www.videolan.org/)-like multimedia player.
It supports several basic features (Play/Pause, Fullscreen...) but it also supports more features like color themes, Picture in Picture, video/audio tracks.

## Usage

### Online

To use WebMediaPlayer online, just open "[https://samuellouf.github.io/WebMediaPlayer/player](https://samuellouf.github.io/WebMediaPlayer/player)".

### Offline

To use WebMediaPlayer offline, download "[https://github.com/samuellouf/WebMediaPlayer/archive/refs/heads/2.0.zip](https://github.com/samuellouf/WebMediaPlayer/archive/refs/heads/2.0.zip)".
Then open/extract the zip/git file.

#### With NodeJS

Open the extracted folder and run :
either

- npm run start
  or
- npm run player

#### Without NodeJS

Open `player/index.html` in your browser.

> [!IMPORTANT]
> You will not be able to update WebMediaPlayer automatically without running it using the nodejs server.

## Update/Reinstall

### With NodeJS

Run 
```sh
npm run update
```
or
```sh
npm run reinstall
```

### Without NodeJS
Go on [https://github.com/samuellouf/WebMediaPlayer/releases/](https://github.com/samuellouf/WebMediaPlayer/releases/) and download your release.
