# [SellPoint](../README.md) > Frontend

This folder contains the SellPoint frontend. Implemented using [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/).

## Getting Started

Requires [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/).

To install all dependencies run
```bash
$ yarn
```

Start the development server using
```bash
$ yarn start
```

This will start the application at [http://localhost:3000](http://localhost:3000).

## Code Style

The source code is formatted with [Prettier](https://github.com/prettier/prettier), and uses [ESLint](https://github.com/eslint/eslint) for basic linting.

To check formatting run
```bash
$ yarn lint
```

Alternatively you can also run `yarn lint:prettier` to run just Prettier, and `yarn lint:eslint` to run just ESLint.

## Testing

To run tests run
```bash
$ yarn test
```

## Documentation

Generate documentation page by running
```bash
$ yarn typedoc --out docs src
```
This will generate HTML files in [/docs](./docs).

## Further Reading

 - [React](https://reactjs.org/)
 - [React Cheatsheet](https://github.com/typescript-cheatsheets/react)
 - [React Boostrap](https://react-bootstrap.github.io/)