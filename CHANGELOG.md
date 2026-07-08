# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

* Added API health check endpoint
* Added accounting summary endpoint
* Added API 404 handling for unknown API routes
* Added MongoDB ObjectId validation for update and delete routes
* Added clearer backend error responses for validation and duplicate-field errors
* Added model validation for products, sales, and expenses
* Added security headers with Helmet
* Added API rate limiting
* Added JSON request size limit
* Added frontend loading and error states for products, sales, and expenses
* Added improved frontend error handling for fetch, save, edit, and delete actions
* Added project screenshots to the README

### Changed

* Cleaned root package dependencies
* Moved development-only dependencies to devDependencies
* Updated README with project status, API routes, setup instructions, and planned improvements
* Optimized accounting summary calculation using MongoDB aggregation
* Sorted API records by newest first
* Cleaned API response fields by excluding `__v`

### Fixed

* Fixed product fetch response
* Fixed frontend product fetch error logging
* Fixed sales price selection logic for with-bottle and without-bottle sales
* Removed tracked `node_modules` from the repository
