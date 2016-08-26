/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'npm-interface': 'out',
    '@angular': 'node_modules/@angular',
    'rxjs': 'node_modules/rxjs',
    '@ng-bootstrap': 'node_modules/@ng-bootstrap',
    'css': 'node_modules/systemjs-plugin-css/css.js',
    'bootstrap': 'node_modules/bootstrap',
    'marked': 'node_modules/marked',
    'xterm': 'node_modules/xterm',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    "npm-interface": {
      "main": "main.js",
      "defaultExtension": 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    '@ng-bootstrap/ng-bootstrap': {
      main: 'index.js',
      defaultExtension: 'js',
      map: {
        './accordion': './accordion/index',
        './alert': './alert/index',
        './buttons': './buttons/index',
        './carousel': './carousel/index',
        './collapse': './collapse/index',
        './dropdown': './dropdown/index',
        './pagination': './pagination/index',
        './popover': './popover/index',
        './progressbar': './progressbar/index',
        './rating': './rating/index',
        './tabset': './tabset/index',
        './timepicker': './timepicker/index',
        './tooltip': './tooltip/index',
        './typeahead': './typeahead/index',
      }
    },
    'marked': {
      main: 'lib/marked.js',
      defaultExtension: 'js',
    },
    'xterm': {
      main: 'src/xterm.js',
      meta: {
        // 'src/xterm.js': {
        //   format: 'global', // load this module as a global
        //   exports: 'Terminal', // the global property to take as the module value
        // }
        '*': {
          deps: [
            'xterm/src/xterm.css',
          ]
        }
      }
    },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  // var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  var setPackageConfig = packIndex;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    transpiler: false,
    browserConfig: {
      "baseURL": "."
    },
    paths: {
      'node_modules/*': '../node_modules/*'
    },
    meta: {
      '*.css': { loader: 'css' }
    },
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
