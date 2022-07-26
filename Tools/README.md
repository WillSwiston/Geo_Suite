# GeoSuite Tooling
Tooling-specific information is found within each folder.

## Code Styling
To enforce code-style, the `format` script has been created.

This script:
 - Runs `autopep8` with the `-a` parameter
 - Runs `pylint` with the `-l` parameter

For example:
`./format -a -l` will run both `autopep8` and `pylint`.

### Prerequisites
`autopep8` and `pylint` must be installed on your system.
