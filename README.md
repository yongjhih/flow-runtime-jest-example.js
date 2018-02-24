# flow type example: flower

## Stack

* ES6
* Promise and Rx

* Type-safety
* Null-safety
* Generic
* Unit testable / coverage report

* Configurable for flower cli

* package manager: yarn (~~npm~~)
* http client: axios (~~request~~, ~~node-fetch~~)
* axios wrapped rx
* static type checking: facebook/flow (~~Microsoft/TypeScript~~, ~~Google/Dart~~, ~~kotlin2javascript~~)
* runtime type checking: codemix/flow-runtime (~~tcomb~~)
* testing frameworks: jest (~~mocha~~, ~~karma~~, ~~jasmine~~)
* mock web: nock

## Usage

```sh
flower login-crediential CLIENT_SECRET
```

or

```sh
flower login USER PASSWORD
```

## Installation

Install from source (requires node, yarn):

```sh
export FLOWER_CLIENT_ID="CLIENT_ID"
export FLOWER_CLIENT_SECRET="CLIENT_SECRET"
yarn install && yarn run flow-typed install && yarn build && yarn test
```

## Testing and coverage

```
yarn build && yarn test && yarn coverage
```

You can open flow-coverage/ and coverage/lcov-report to see

## Development

### Structure

```
src
├── config.js   // configuration such like baseUrl, client_id
├── flower.js      // flower restful client
├── flower.spec.js // tests
├── index.js    // flower-cli: flower command line tool
└── types.js // type validation
```

### Requirements

* node
* yarn

```
brew install node yarn
```

### Build

p.s. We used babel as default compiler before, you can also use flow-remove-types

```sh
yarn install && yarn run flow-typed install
yarn build && yarn test
```

### Type checking with flow

```sh
yarn run flow
```

You should install a flow plugin on your IDE instead.

### API Documentation

```sh
yarn docs
```

You can open docs/ to see
