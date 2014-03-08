"use strict";
var appolo = require('appolo'),
    Class = require('appolo-class'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash');
    //i18n = require("i18n");

var Launcher = appolo.EventDispatcher.define({

    constructor: function () {
        this.cachedRequire = [];

    },

    launch: function (config) {

        var defaults = {
            listenToServer: true,
            paths:['config', 'server'],
            viewsFolder:"/server/views",
            viewsEngine:"jade",
            publicFolder:"public",
            loadDefaultExpressSettings:true
        }

        this._options = _.extend(defaults ,config || {});

        this._options.root = this._options.root || process.cwd();

        this._options.environment = this._options.environment || (process.env.NODE_ENV || 'development');

        this._createServer();

        this._loadEnvironments();

        var loadPaths = _.union(this._options.paths, appolo.environment.paths);

        //load env files
        appolo.loader.loadFiles(loadPaths, this._options.root,this.cachedRequire);

        //load server configurations
        this._loadConfigurations();

        //load routes
        this._loadRoutes();

        //this._loadLocales();

        this._loadInjector();

        this._statServer();



        this.fireEvent('appolo-launched');
    },
    _createServer: function () {

        // Create express;
        this._app = express();

        // Create an http server
        this._app.server = http.createServer(this._app);

        appolo.app = this._app;
    },
    _loadEnvironments: function () {
        var allPath = path.join(this._options.root, 'config/environments/all'),
            environmentPath = path.join(this._options.root, 'config/environments/', this._options.environment + '.js'),
            all = require(allPath),
            environment = require(environmentPath);

        this.cachedRequire.push(allPath);
        this.cachedRequire.push(environmentPath);

        //add current env config to appolo env
        _.extend(appolo.environment, all, environment || {});

        //save evn name
        appolo.environment.type = this._options.environment;

        //add root
        appolo.environment.rootDir = this._options.root;

        appolo.inject.addObject('environment', appolo.environment);
        appolo.inject.addObject('env', appolo.environment);
    },
    _loadConfigurations: function () {

        if(this._options.loadDefaultExpressSettings){
            this._app.configure("all", function () {

                this._app.set('port',  process.env.PORT || this._options.port || appolo.environment.port || 8080);
                this._app.set('views', path.join(this._options.root,this._options.viewsFolder));
                this._app.set('view engine', this._options.viewsEngine);
                this._app.use(express.limit('1mb'));
                this._app.use(express.favicon());

                this._app.use(express.bodyParser());
                this._app.use(express.cookieParser());
                this._app.use(express.methodOverride());
                this._app.use(express.compress());
                this._app.enable("jsonp callback");
                this._app.use(express.static(path.join(this._options.root, this._options.publicFolder)));
                //this._app.use(express.logger('dev'));
            }.bind(this));
        }

        fs.readdirSync(path.join(this._options.root, 'config/express')).forEach(function (file) {

            var configPath = path.join(this._options.root, 'config', 'express', file);
            this.cachedRequire.push(configPath);

            require(configPath)(this._app);
        }.bind(this));

        this._app.configure("all", function () {
            this._app.use(this._app.router);
        }.bind(this));
    },

    _loadRoutes: function () {
        var routes = [],
            routesPath = path.join(this._options.root, 'config/routes'),
            self= this;

        if (!fs.existsSync(routesPath)) {
            return;
        }

        var loadRoutes = function (routesPath){
            fs.readdirSync(routesPath).forEach(function (file) {

                var routePath = path.join(routesPath, file);

                if(fs.statSync(routePath).isDirectory()){
                    return loadRoutes(routePath);
                }
                self.cachedRequire.push(routePath);
                routes.push.apply(routes, require(routePath));
            });
        };

        loadRoutes(routesPath);

        //load routes
        appolo.router.initialize(this._app, routes);
    },
//    _loadLocales: function () {
//        i18n.configure({
//            locales: ['en', 'he'],
//            defaultLocale: 'en',
//            cookie: 'appolo-lang',
//            directory: path.join(this._options.root, 'config/locales')
//        });
//    },
    _loadInjector: function () {
        var definitions = {};

        fs.readdirSync(path.join(this._options.root, 'config/inject')).forEach(function (file) {
            var injectPath = path.join(this._options.root, 'config', 'inject', file);
            this.cachedRequire.push(injectPath);
            _.extend(definitions, require(injectPath));
        }.bind(this));

        appolo.inject.addObject('app', this._app);

        //load inject
        appolo.inject.initialize({
            definitions: definitions,
            root: this._options.root
        });
    },
    _statServer: function () {
        if (this._options.listenToServer) {
            this._app.server.listen(this._app.get('port'), function () {
                console.log("Express server listening on port: " + this._app.get('port') + ' version: ' + appolo.environment.version);
            }.bind(this));
        }


    },
    reset:function(){
        _.forEach(this.cachedRequire,function(filePath){
            delete require.cache[filePath];
        });
        this.cachedRequire.length = 0;
        this._options = null;
        try{this._app.server.close();} catch(e){}

        _.forEach(appolo.environment,function(value,key){
            delete appolo.environment[key];
        });

        appolo.inject.reset();

        appolo.app = null;

        process.removeAllListeners();
    }



});


module.exports = new Launcher();