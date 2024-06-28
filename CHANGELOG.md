# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2024-06-28

### Added

-   Added .ruff_cache folder to .gitignore

### Changed

-   Refactored displaying of Storage component
-   Updated dependencies in package.json
-   Updated Foris JS library to v6.0.2

### Removed

-   Removed redundant .gitkeep file

## [1.0.0] - 2024-03-07

### Added

-   Added & updated Weblate translations
-   Added data-testid attributes to buttons

### Changed

-   Updated Makefile
-   Updated dependencies in package.json
-   Updated Node.js to v21.x in Makefile
-   Updated ESLint and Prettier configurations
-   Updated .gitignore to exclude minified JS files and license files
-   Updated webpack.config.js with process/browser alias
-   Updated CI to use shared scripts, build and publish python package
-   Replaced Pylint & Pycodestyle for Ruff
-   NPM audit fix

### Removed

-   Removed MANIFEST.in

## [0.2.2] - 2021-04-26

-   Add & update translations
-   Improve descriptions of actions in the UUID table
-   Improve headings and help texts
-   Hide DrivesOperations during operations on a drive
-   Fix pendingMigrationAlert behavior
-   NPM audit fix

## [0.2.1] - 2021-01-20

-   Fix pendingMigrationAlert when no drives connected
-   Refactor storageState variables
-   Update Foris JS library to v5.1.8
-   NPM audit fix

## [0.2.0] - 2020-12-07

-   Add fluid layout support (redesign)
-   Add semantic & accessibility structure for headings
-   Add storage settings endpoint
-   Fix UUID buttons disability
-   Fix selected and active drive's checkbox
-   Improve Pending Migration alert
-   NPM audit fix
-   Use Foris JS v5.1.7
-   Integrate ESLint + Prettier + reForis styleguide

[unreleased]: https://gitlab.nic.cz/turris/reforis/reforis-storage/-/compare/v1.1.0...master
[1.1.0]: https://gitlab.nic.cz/turris/reforis/reforis-storage/-/compare/v1.0.0...v1.1.0
[1.0.0]: https://gitlab.nic.cz/turris/reforis/reforis-storage/-/compare/v0.2.2...v1.0.0
[0.2.2]: https://gitlab.nic.cz/turris/reforis/reforis-storage/-/compare/v0.2.1...v0.2.2
[0.2.1]: https://gitlab.nic.cz/turris/reforis/reforis-storage/-/compare/v0.2.0...v0.2.1
[0.2.0]: https://gitlab.nic.cz/turris/reforis/reforis-storage/-/tags/v0.2.0
