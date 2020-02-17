# DfE Curriculum Materials End 2 End tests

Front End automation collection using Cypress.io. This will be used for live journey checks and a regression pack for when deploying to staging.

## Running locally

### Install System dependencies

System dependencies required to run the tests locally

- [Node.js](https://nodejs.org/en/download/package-manager/#windows) - JavaScript runtime environment.

#### macOS via Homebrew

For macOS users with Homebrew installed.

```bash
brew install node
```

#### Windows via scoop

For Windows users with Scoop installed. 

```bash
scoop install node
```

### Install project dependencies

Once you've aquired the system dependencies, you can now install the project depnendencies.

```bash
npm install
```

### Run the tests via CLI

```bash
npm test
```

### Run the tests using a GUI

```bash
npm run cy:open
```

### Reporting

These tests will be ran on a scheduled job and log out the results to the cypress dashboard here: https://dashboard.cypress.io

This dashboard requires login credentials from your github account, but to view the DfE Organisation inside the dashboard you would need to be given access.


## Contributing

Tests are written using the [Cypress](https://www.cypress.io/) framework. They are JavaScript-based (and run directly in the browser).


The relevant folders are:

```plain
cypress
├── fixtures
│   ├── example.json
│   ├── ...
├── integration
│   ├── examples
│   │   ├── actions.spec.ts
│   │   ├── ...
│   └── find-teacher-training
│       └── basic.spec.ts
├── plugins
│   └── index.ts
└── support
    ├── commands.ts
    └── index.ts
```

All tests should live under `cypress/integration/find-teacher-training`. 
The `examples` folder comes with Cypress and is left in for documentation purposes. 
90% of common commands and assertions can be found there and played around with / copy pasted straight into new specs.

## License

[MIT](LICENCE).