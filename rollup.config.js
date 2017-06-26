export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ng-github-card.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.githubcard',
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        "zone.js": 'zone',
        'rxjs/Observable': 'Rx',
        'rxjs/ReplaySubject': 'Rx',
        'rxjs/add/operator/map': 'Rx.Observable.prototype',
        'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
        'rxjs/add/observable/fromEvent': 'Rx.Observable',
        'rxjs/add/observable/of': 'Rx.Observable'
    }
}