# vile-nsp [![Circle CI](https://circleci.com/gh/forthright/vile-nsp.svg?style=shield&circle-token=8b1bfab08e46fdf239dbb4a57d2b317d38516fe5)](https://circleci.com/gh/forthright/vile-nsp) [![score-badge](https://vile.io/api/v0/projects/vile-nsp/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-nsp) [![coverage-badge](https://vile.io/api/v0/projects/vile-nsp/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-nsp) [![dependency-badge](https://vile.io/api/v0/projects/vile-nsp/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-nsp)

A [Vile](https://vile.io) plugin for tracking Node security alerts (via NSP's [CLI](https://github.com/nodesecurity/nsp)).

## Requirements

- [Node.js](http://nodejs.org)

## Installation

    npm i -D vile vile-nsp

## Config

You can specify a few things the `nsp check` method accepts.

### Package

By default, `package.json` in the `cwd` is used.

You can also specify a custom path:

```yaml
nsp:
  config:
    package: some/other/package.json
```

### Shrinkwrap

Additionally, you can set the `shrinkwrap` path:

```yaml
nsp:
  config:
    shrinkwrap: shrinkwrap.json
```

### Offline Mode

```yaml
nsp:
  config:
    offline: true
    advisories: "optional/path/to/advisories.json"
```

## Versioning

This project uses [Semver](http://semver.org).

## Licensing

This project is licensed under the [MPL-2.0](LICENSE) license.

Any contributions made to this project are made under the current license.

## Contributions

Current list of [Contributors](https://github.com/forthright/vile-nsp/graphs/contributors).

Any contributions are welcome and appreciated!

All you need to do is submit a [Pull Request](https://github.com/forthright/vile-nsp/pulls).

1. Please consider tests and code quality before submitting.
2. Please try to keep commits clean, atomic and well explained (for others).

### Issues

Current issue tracker is on [GitHub](https://github.com/forthright/vile-nsp/issues).

Even if you are uncomfortable with code, an issue or question is welcome.

### Code Of Conduct

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

- Brent Lintner - [@brentlintner](http://github.com/brentlintner)

## Architecture

- `src` is es6+ syntax compiled with [Babel](https://babeljs.io)
- `lib` generated js library

## Developing

    cd vile-nsp
    npm install
    npm run dev
    npm test
