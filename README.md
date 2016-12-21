# vile-nsp [![Circle CI](https://circleci.com/gh/forthright/vile-nsp.svg?style=svg&circle-token=8b1bfab08e46fdf239dbb4a57d2b317d38516fe5)](https://circleci.com/gh/forthright/vile-nsp)

[![score-badge](https://vile.io/api/v0/projects/vile-nsp/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-nsp) [![security-badge](https://vile.io/api/v0/projects/vile-nsp/badges/security?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-nsp) [![coverage-badge](https://vile.io/api/v0/projects/vile-nsp/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-nsp) [![dependency-badge](https://vile.io/api/v0/projects/vile-nsp/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-nsp)

A [vile](https://vile.io) plugin for checking aginst the [node security project](https://nodesecurity.io).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i vile-nsp

## Config

You can specify a few things the `nsp check` method accepts.

### Package

By default, `package.json` in the `cwd` is used.

You can also specify a custom path:

```yml
nsp:
  config:
    package: some/other/package.json
```

### Shrinkwrap

Additionally, you can set the `shrinkwrap` path:

```yml
nsp:
  config:
    shrinkwrap: shrinkwrap.json
```

### Offline Mode

```yml
nsp:
  config:
    offline: true
    advisories: "optional/path/to/advisories.json"
```

## Architecture

- `src` is es6+ syntax compiled with [babel](https://babeljs.io)
- `lib` generated js library

## Hacking

    cd vile-nsp
    npm install
    npm run dev
    npm test
