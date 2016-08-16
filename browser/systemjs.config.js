SystemJS.config({
  transpiler: false,
  paths: {
    "npm-interface/": "out/"
  },
  browserConfig: {
    "baseURL": "."
  },
  typescriptOptions: {
    module: "system",
    noImplicitAny: true,
    typeCheck: true,                // also accepts "strict"
    tsconfig: true                  // also accepts a path
  },
  packages: {
    "npm-interface": {
      "main": "main.js",
      "defaultExtension": 'js'
    }
  }
});
