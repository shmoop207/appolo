"use strict";
var appolo = require('appolo'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    i18n = require("i18n"),
    mongoose ,
    options,
    app,
    environment;

var launcher = function (config) {

    options = config || {};

    options.root = options.root || process.cwd();

    options.environment = options.environment || (process.env.NODE_ENV || 'development');

    createServer();

    loadEnvironments();

    appolo.loader.loadFiles({
        root: options.root,
        paths: ['config', 'server']
    });

    loadFiles();



    loadConfigurations();

    loadRoutes();

    loadLocales();

    loadInjector();

    connectDB();

    statServer();
};

function createServer() {
    // Create express;
    app = express();

// Create an http server
    app.server = http.createServer(app);
}

function loadFiles() {

    if (appolo.environment.paths) {
        appolo.loader.loadFiles({
            root: options.root,
            paths: appolo.environment.paths
        });
    }
}

function loadInjector() {
    var definitions = {};

    fs.readdirSync(path.join(options.root, 'config/inject')).forEach(function (file) {
        _.extend(definitions, require(path.join(options.root, 'config', 'inject', file)));
    });

    appolo.spring.addObject('app', app);

    //load spring
    appolo.spring.initialize({
        definitions: definitions,
        root: options.root
    });
}

//function loadAssetManager() {
//
//    var assets = {};
//
//    fs.readdirSync(path.join(options.root, 'config/assets')).forEach(function (file) {
//        appolo.Object.extend(assets, require(path.join(options.root, 'config', 'assets', file)));
//    });
//
//    assetsManager.compile({
//        assets: assets,
//        compress: appolo.environment.compress,
//        app: app,
//        publicDir: path.join(options.root, appolo.environment.clientDir),
//        generatedDir: path.join(options.root, appolo.environment.generatedDir)
//    });
//}

function loadLocales() {
    i18n.configure({
        locales: ['en', 'he'],
        defaultLocale: 'en',
        cookie: 'appolo-lang',
        directory: path.join(options.root, 'config/locales')
    });
}

function loadEnvironments() {
    var all = require(path.join(options.root, 'config/environments/all')),
        environmentPath = path.join(options.root, 'config/environments/', options.environment + '.js');

    _.extend(appolo.environment, all);


    _.extend(appolo.environment, require(environmentPath)  || {});

    appolo.environment.type = options.environment;

    appolo.environment.rootDir = options.root;

    appolo.spring.addObject('environment', appolo.environment);
    appolo.spring.addObject('env', appolo.environment);
}

function loadRoutes() {
    var routes = [];

    fs.readdirSync(path.join(options.root, 'config/routes')).forEach(function (file) {
        routes.push.apply(routes,require(path.join(options.root, 'config', 'routes', file)));
    });

    //load routes
    appolo.router.initialize({
        app: app,
        routes: routes
    });
}

function connectDB() {

    if(appolo.environment.db){
        mongoose = require('mongoose')
    // Connect to db
    app.mongoose = mongoose;

    app.mongoose.connect(appolo.environment.db);
    app.mongoose.connection.on('error', function(e){
        console.error('connection error:' + e);
    });
    app.mongoose.connection.once('open', function () {
        console.log('mongodb connection open');
    });
    }
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

function statServer() {
    app.server.listen(app.get('port'), function () {
        console.log("Express server listening on port: " + app.get('port') +' version: '+ appolo.environment.version);
    });
}

module.exports = launcher;