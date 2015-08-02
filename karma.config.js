var _ = require('lodash'),
    webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        captureTimeout : 120000,
        browserNoActivityTimeout : 120000,
        singleRun: true,

        files: ['test/index.js'],

        preprocessors: {
            'test/index.js': ['webpack']
        },

        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec', 'coverage', 'threshold'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-sinon-chai',
            'karma-spec-reporter',
            'karma-coverage',
            'karma-threshold-reporter',
            'karma-webpack'
        ],

        webpack: _.omit(webpackConfig, 'entry', 'output'),

        webpackMiddleware: {
            noInfo: true,
        },

        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                { type: 'lcov', subdir: 'lcov' },
            ]
        },

        thresholdReporter: {
            statements: 0,
            branches: 0,
            functions: 0,
            lines: 0
        }
    });
};
