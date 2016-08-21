#NPM Interface (Work In Progress)
## Graphical User Interface for the Node Package Manager, built with Electron ##

In development mode the ES5 angular dist files are used along with JIT (Just in Time) template compilation. To start the Electron app in development mode run:
```
npm run start
```

In production mode the AOT (Ahead of Time) template compilation is used. Unfortunately ng-bootstrap **does not yet support offline compilation** so production builds do not work at the moment. To compile AOT and bundle the whole app run:
```
npm run build
```
To start the Electron app in production mode run:
```
npm run start:prod
```