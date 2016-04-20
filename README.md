# IBB Server

Solution of [Task No. 1](http://www.ibillboard.com/cs/uloha-c-1).

## Prerequisites

* Install [redis](http://redis.io/) store.

## JSHint

JSHint is installed as dev dependency.

```
node_modules/.bin/jshint app.js lib/
```

## JSDoc

To generate documentation run:

```
node_modules/.bin/jsdoc app.js lib/ -r
```

## Running

To run __IBB Server__ call `npm start` or `node app.js`.

### Environments

By default, __IBB Server__ is running with default configuration.

To run it with configuration for different environment set `NODE_ENV` variable:

```
NODE_ENV=environment node app.js
```

Below is list of currently supported environments.

#### Default

This is the default configuration for development environment.

See [default.json](./config/default.json).

#### Production

Production environment. See [production.json](./config/production.json) for production configuration.

## Tests

Run `npm test` for unit tests.
