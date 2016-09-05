#NPM Interface (Early Alpha)
## Graphical User Interface for the Node Package Manager, built with Electron and Angular 2 ##

### Implemented Features ###
- Displaying Package (and dependencies) information including markdown rendered README
- Browsing Package dependencies.
  - Installing new dependencies with `--save` or `--save-dev` option
  - Getting visual information on outdated dependencies. Updating them with a single click.
- Getting visual feedback from `npm install/update` commands using [xterm.js](https://github.com/sourcelair/xterm.js)
- Getting a summary for the licenses of all installed dependencies (grouped by license)
- Simultaneously running and interrupting `npm` scripts with live console output.


### Running ###
In development mode the ES5 angular dist files are used along with JIT (Just in Time) template compilation. To start the Electron app in development mode run:
```
npm run start
```

In production mode the AOT (Ahead of Time) template compilation is used. Unfortunately ng-bootstrap **does not yet support offline compilation** so production builds may not work at the moment. To compile AOT and bundle the whole app run:
```
npm run build
```
To start the Electron app in production mode run:
```
npm run start:prod
```