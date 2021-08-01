# JestShowcase

This project is an [Angular](https://angular.io) monorepo created with [Nx](https://nx.dev) to showcase some [Jest](https://jestjs.io) capabilities.

## Monorepo description & limitations

This monorepo includes an app **Jest Showcase App** and a lib **Jest Showcase Lib**. Both do not follow any business requirements and merely include a loose collection of methods and functions that represent typical caveats during unit testing. Neither architecture nor implementation represent best practices in their area, so please consider the code accordingly. It merely serves as basis for tests. The examples do not give 100% overview over **all** capabilities of Jest but concentrate on some typical use cases such as:
- manipulating window.location.href
- testing async nested methods
- testing components with input properties
- testing clicks
- testing http requests
- mocking pure functions
- mocking overloaded methods

It also covers some practical aspects:
- how to skip some tests
- what is the difference between 'test' and 'it'
- how to test private methods (only if you **reeeeally** need to)
- differences between toBe() and toEqual(), toBeTrue() and toBeTruthy()

The main value of this repo lies in the comments. 

## Mocking & testing libs (in addition to Jest)

- [ngMocks](https://ng-mocks.sudo.eu)
- [Testing Library](https://github.com/testing-library/angular-testing-library)
- [Jest Runner - VS Code extention](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)

## Running unit tests

Run `ng test jest-showcase-app` to execute the unit tests of the app.

Run `ng test jest-showcase-lib` to execute the unit tests of the lib.

Run `npm test -- SomeTestFileToRun` to execute the unit tests of a particular file.

Run `nx test --watch` to watch files for changes and rerun tests related to changed files.

  Watch Usage:

    - Press a to run all tests.
    - Press f to run only failed tests.
    - Press p to filter by a filename regex pattern.
    - Press t to filter by a test name regex pattern.
    - Press q to quit watch mode.
    - Press Enter to trigger a test run.

Run `npx jest --coverage` to so execute the unit tests and to see the respective coverage.

Run `nx affected:test` to execute the unit tests affected by a change.

## Further reading
- [Angular Testing Best Practices](https://angular.io/guide/testing)
- [Debuging Jest Tests in VS Code](https://juristr.com/blog/2020/05/vscode-debug-jest/)
