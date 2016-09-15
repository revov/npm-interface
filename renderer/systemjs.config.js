System.config({
    transpiler: false,
    browserConfig: {
        "baseURL": "."
    },
    paths: {
        'npm:': '../node_modules/'
    },
    meta: {
        '*.css': { loader: 'css' }
    },
    map: {
        'npm-interface': 'out',
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
        'rxjs': 'npm:rxjs',
        '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
        'css': 'npm:systemjs-plugin-css/css.js',
        'bootstrap': 'npm:bootstrap',
        'marked': 'npm:marked',
        'xterm': 'npm:xterm',
    },
    packages: {
        "npm-interface": {
            "main": "main.js",
            "defaultExtension": 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'marked': {
            main: 'lib/marked.js',
            defaultExtension: 'js',
        },
        'xterm': {
            main: 'src/xterm.js',
            meta: {
                '*': {
                    deps: [
                        'xterm/src/xterm.css',
                    ]
                }
            }
        },
    }
});