"use strict";
var appolo = require('appolo'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    i18n = require("i18n"),
    options,
    app;

var launcher = function (config) {

    options = config || {};

    options.root = options.root || process.cwd();

    options.environment = options.environment || (process.env.NODE_ENV || 'development');

    createServer();

    loadEnvironments();

    //load files
    appolo.loader.loadFiles(['config', 'server'], options.root);

    //load env files
    appolo.loader.loadFiles(appolo.environment.paths, options.root);

    //load server configurations
    loadConfigurations();

    //load routes
    loadRoutes();

    loadLocales();

    loadInjector();

    statServer();
};

function createServer() {
    // Create express;
    app = express();

    // Create an http server
    app.server = http.createServer(app);
}

function loadEnvironments() {
    var all = require(path.join(options.root, 'config/environments/all')),
        environment = require(path.join(options.root, 'config/environments/', options.environment + '.js'));

    //add current env config to appolo env
    _.extend(appolo.environment, all ,environment || {});

    //save evn name
    appolo.environment.type = options.environment;

    //add root
    appolo.environment.rootDir = options.root;

    appolo.inject.addObject('environment', appolo.environment);
    appolo.inject.addObject('env', appolo.environment);
}

function loadConfigurations() {

    app.configure("all", function () {

        app.set('port', (process.env.PORT || appolo.environment.port) || 8080);
        app.set('views', options.root + '/server/views');
        app.set('view engine', 'jade');
        app.use(express.limit('1mb'));
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(i18n.init);
        app.use(express.methodOverride());
        app.use(express.compress());

        app.enable("jsonp callback");

        app.use(express.static(path.join(options.root, 'public')));
    });


    fs.readdirSync(path.join(options.root, 'config/express')).forEach(function (file) {
        require(path.join(options.root, 'config', 'express', file))(app);
    });
}

function loadRoutes() {
    var routes = [],
        routesPath = path.join(options.root, 'config/routes');

    if (!fs.existsSync(routesPath)) {
        return;
    }

    fs.readdirSync(routesPath).forEach(function (file) {
        routes.push.apply(routes, require(path.join(options.root, 'config', 'routes', file)));
    });

    //load routes
    appolo.router.initialize(app,routes);
}

function loadLocales() {
    i18n.configure({
        locales: ['en', 'he'],
        defaultLocale: 'en',
        cookie: 'appolo-lang',
        directory: path.join(options.root, 'config/locales')
    });
}

function loadInjector() {
    var definitions = {};

    fs.readdirSync(path.join(options.root, 'config/inject')).forEach(function (file) {
        _.extend(definitions, require(path.join(options.root, 'config', 'inject', file)));
    });

    appolo.inject.addObject('app', app);

    //load inject
    appolo.inject.initialize({
        definitions: definitions,
        root: options.root
    });
}


function statServer() {
    app.server.listen(app.get('port'), function () {
        console.log("Express server listening on port: " + app.get('port') + ' version: ' + appolo.environment.version);
    });
}

module.exports = launcher;
