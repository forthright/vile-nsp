# vile-nsp

A [vile](http://vile.io) plugin for checking aginst the [node security project](https://nodesecurity.io).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i vile-nsp

## Config

You can specify a custom directory, else `cwd` is used.

```yml
nsp:
  config:
    directory: some_place/
```

## Architecture

- `src` is es6+ syntax compiled with [babel](https://babeljs.io)
- `lib` generated js library

## Hacking

    cd vile-nsp
    npm install
    npm run dev
    npm test
