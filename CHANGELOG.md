# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [2.4.0] - 2024-01-11

### Added
- support for ReactBootstrap UI kit (app)



## [2.3.3] - 2024-01-11

### Fixed
- fix command in package.json
- fix namespace issue


## [2.3.2] - 2024-01-11

### Fixed
- vitest: test import path (app)
- remove node `fs` from code, since it is browser only
- expose API for vitest

### Added
- vitest: [fixture] missing add util



## [2.3.1] - 2024-01-11

### Added
- support for Vitest testing framework (app)



## [2.2.1] - 2024-01-06

### Added
- support for Turbopack (app)



## [2.2.0] - 2024-01-06

### Added
- support for Windi CSS (app)



## [2.1.1] - 2024-01-06

### Added
- support for mdx configuration (app)

### Fixed
- `*.json` stringification pretty issue



## [2.0.1] - 2023-12-31

### Fixed
- data type passed in downloadZip method to file-saver

### Added
- introduction of CHANGELOG



## [2.0.0] - 2023-12-31

### Added
- `husky` for pre-commit checks
- moved and added utils for supporting tests
- scripts for publish in `package.json`
- methods to convert `JSZip` to `Map` in browser

### Changed
- eslint to remove "prefer-default-export"
- `MetaStrap` class directly expects `JSZip` instead of `TROAstMap`

### Removed
- all node.js based API usage like `fs`, `path`
- removes `fixtures` and replaced `walk` with `fast-glob` method
